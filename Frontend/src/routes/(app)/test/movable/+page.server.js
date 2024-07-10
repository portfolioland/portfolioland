/** @type {import('./$types').PageServerLoad} */
import { serversideViewerDataConstructor } from "$lib/components/Profil_Work_SiteBuilder/1_Locator/serversideUtils";

export async function load({ params, locals }) {

    // console.log(params, "😇😇😇😇😇😇😇😇😇");
    let userId = params.slug

    let usersData = await locals.pb.collection('artists').getFullList({
        filter: `name="${userId}"`
    })
    
    // console.log(userID, "USERSDATAEND");
    let workData = await locals.pb.collection("work").getFullList({
        filter: `artists.id ?= "${userId}"`, expand: "artists,tag"

    })

    console.log(workData, "WORKDATA");

    const filteredData = workData.filter(entry => entry.public);


    let locDat = []

    for (let i = 0; i < filteredData.length; i++) {
        let workName = filteredData[i].title;
        let d = await serversideViewerDataConstructor(workName, locals);
        // console.log(d, "LOCATOR DATA");
        locDat.push({
            work: filteredData[i],
            locator: d
        });
    }

    // Function to remove empty objects from an array
    const removeEmptyObjects = (arr) => arr.filter(obj => Object.keys(obj).length > 0);

    // Remove empty objects from "locator" arrays
    const cleanedData = locDat.map(item => ({
        work: item.work,
        locator: removeEmptyObjects(item.locator.locator)
    }));

    console.log(cleanedData, "CLEANED");

    return { artistData: usersData, locator: cleanedData };
}

// artist: artistsNames, work: workName, tag: tags, locator: locDat?.locator, jahr: workData[0].jahr