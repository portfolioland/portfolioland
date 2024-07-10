import { getFullListLocalsPBCollection } from "$lib/pb_get_helper.js";


import { error } from "@sveltejs/kit";
import { log } from "console";

let locatorData = [{}]


// * This function is used to build the Data that is being used by the locator. It Pushes x,y,w,h coordinats, content, collectionID, and the TYPE: Headlines, Paragaphs, pictures. These correspond to the Componets and are uased to load the right Style/Component. 
// ! Type muss ein String sein!!

function locatorDataPusher(data = locatorData, type = "paragraphs") {
    data.forEach(el => {
        locatorData.push({
            "x": el.x,
            "y": el.y,
            "w": el.w,
            "h": el.h,
            "id": el.id,
            "content": el.content,
            "collectionID": el.collectionId,
            "type": type,
            "credits": el.credits,
            "altTxt": el.altTxt
        })
    })
};

// * Diese Function checkt array 1 und array 2 ob ids noch vorhanden sind.
function checkIfIdsExistelseDelete(firstArray, secondArray, locals) {
    // Extract ids from the second array
    const secondArrayIds = secondArray.map(element => element.id);

    // Check if each id from the first array is present in the second array
    for (const element of firstArray) {
        const isIdPresent = secondArrayIds.includes(element.id);
        console.log(`ID: ${element.id}, Found: ${isIdPresent}`);
        if (!isIdPresent) {
            locals.pb.collection(element.type).delete(element.id);
        }
    }
}

async function updatePIC(formDat) {
    await pb.collection('pictures').create(formDat, { requestKey: null });
}


// * Profilseite wird durch HOOKS.SERVER.ts protected -> dementsprechend kann ich hier locals abrufen und muss keine kompliziertes Matching von SLUG und ID machen.

export async function load({ locals, params, cookies }) {
    console.log(params);
    try {
        let userData = locals.user
        let workName = params.work
        let artistName = params.slug

        //* LocatorData muss hier ein Array werden, damit bei on load immer wieder das Array neu gefüllt wird 
        // TODO Localstorage für das Array im abstand von 3sec? If active
        locatorData = []
        // * GET -> Work_DATA_Collection based on userData(locals) and title(from Params)
        let workData = await locals.pb.collection('work').getFullList({ filter: `user = "${userData.id}"&& title ?= "${workName}"` })

        // * GET -> HEADLINE_DATA based on WorkID
        let headlineData = await locals.pb.collection("headlines").getFullList({ filter: `work="${workData[0].id}"` });
        if (headlineData) {
            locatorDataPusher(headlineData, "headlines");
        }
        // * GET -> PARAGRAPH_DATA based on WorkID
        let paragraphData = await locals.pb.collection("paragraphs").getFullList({ filter: `work="${workData[0].id}"` })

        locatorDataPusher(paragraphData, "paragraphs")

        // * GET -> PICTURE_DATA based on WorkID
        let pictureData = await locals.pb.collection("pictures").getFullList({ filter: `work="${workData[0].id}"` });
        if (pictureData) {
            locatorDataPusher(pictureData, "pictures");
        }
        // console.log(locatorData, "🐽🐽🐽🐽🐽🐽🐽🐽🐽", "******************************");

        let tagList = []

        let tags = await getFullListLocalsPBCollection(locals, "tags")
        tags.forEach(element => {
            tagList.push(element.title)
        });

        return { artist: artistName, work: workName, locator: locatorData, tags: tagList }
    }
    catch (err) {
        console.error(err);
        throw (error(404, "The content, you tried to reach, is not there. Yet..."))
    };

}

export const actions = {

    locatorUpdater: async ({ request, locals, params }) => {
        try {
            //GET Identification of user and work(over params)
            const id = locals.pb.authStore.model.id
            let workData = await locals.pb.collection('work').getFullList({ filter: `user = "${id}"&& title ?= "${params.work}"` })

            //Get FORM_DATA
            const formData = await request.formData()
            const data = formData.get('data')
            console.log("....................", formData)
            let JSON_DATA = JSON.parse(data)
            const cols = formData.get("cols")
            let COLS = parseInt(cols)



            let IDCHECK = checkIfIdsExistelseDelete(locatorData, JSON_DATA, locals)

            // Hier checke ich ob der Datentyp pictures ist und lade das Bild mit den daten dann hoch.

            JSON_DATA.forEach(element => {
                const formDat = new FormData()
                if (element.type === "pictures") {
                    let fileData = formData.get(`fileData-${element.id}`);
                    let altText = formData.get(`altTxt-${element.id}`)
                    let credits = formData.get(`credits-${element.id}`)
                    // Check if fileData exists before appending to formData
                    if (fileData) {
                        formDat.append('content', fileData);

                        const data = {
                            "y": element[COLS].y,
                            "w": element[COLS].w,
                            "h": element[COLS].h,
                            "x": element[COLS].x,
                            "work": workData[0].id,
                            "altTxt": altText,
                            "credits": credits,
                            "artist": [locals.pb.authStore.model.artist]
                        };

                        for (const key in data) {
                            formDat.append(key, data[key]);
                        }
                        updatePIC(formDat)
                    }
                }
            });
            //todo: Serverside Validation of JSON_DATA Format possibly zod?

            //todo: Für jedes JSON_DATA_Element herrausfinden ob id schon vorhanden --> das entscheidet darüber ob ob nur geupdated wird oder ein neuer eintrag created wird.

            // Hier checke ich ob die neuen Daten schon vorhanden sind in den alten Daten und update sie. 
            JSON_DATA.forEach(element => {
                let IDform = element.id
                log(element, element.id, "ID of Formdata")
                const gefunden = locatorData.some(item => item.id === IDform);
                try {
                    if (gefunden) {
                        const data = {
                            "id": IDform,
                            "y": element[COLS].y,
                            "w": element[COLS].w,
                            "h": element[COLS].h,
                            "x": element[COLS].x,
                            "content": element.content,
                        };
                        const record = locals.pb.collection(`${element.type}`).update(IDform, data);

                        // } catch (error) {
                        //     console.log(error, "Error from UPDATE new DATA in Profil/WORK");
                        // }

                    }
                    //hier checke ich ob die Daten neu sind und keine bilder. 
                    else if (element.type != "pictures") {

                        const data = {

                            "y": element[COLS].y,
                            "w": element[COLS].w,
                            "h": element[COLS].h,
                            "x": element[COLS].x,
                            "work": workData[0].id,
                            "content": element.content,
                            "artist": [locals.pb.authStore.model.artist]

                        };

                        // try {
                        const record = locals.pb.collection(element.type).create(data);
                        console.log(data)
                    }
                } catch (error) {
                    console.log(error, "Error from CREATE new DATA in Profil/WORK");
                }



            });
            return { sucsess: true }
        } catch (err) {
            console.log('Error: ', err);
            return { error: err }
        }

    },
    deleteItemInLocator: async ({ request, locals }) => {
        try {
            const formData = await request.formData()
            const id = formData.get("id")
            const type = formData.get("type")
            try {
                if (id !== "newItem") {

                    log("now deleteing the data 게임", id, type)
                    const record = locals.pb.collection(`${type}`).delete(id);
                }

            } catch (error) {
                log(error, "Error from DELETE DATA in Profil/WORK")
            }



        } catch (err) { log(err) }
    }
}