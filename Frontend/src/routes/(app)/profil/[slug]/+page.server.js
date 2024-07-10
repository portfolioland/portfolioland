/** @type {import('./$types').PageServerLoad} */

import { serversideViewerDataConstructor, updatePIC } from '$lib/components/Profil_Work_SiteBuilder/1_Locator/serversideUtils';
import { getFullListLocalsPBCollection, replaceIDwithName } from '$lib/pb_get_helper';
import { error } from '@sveltejs/kit';
import { fromString } from '@tiptap/core';
import { log } from 'console';

let locatorDat = []

// * On load check if User is logged in and fetch UserData from DB else return undefined
export async function load({ locals }) {
    try {
        const id = locals.pb.authStore.model.id ? locals.pb.authStore.model.id : undefined

        if (id != undefined) {
            const resultList = await locals.pb.collection('work').getFullList({
                filter: `user.id="${id}"`, sort: "+order",
            })
            const artistsNameList = await getFullListLocalsPBCollection(locals, "artists")
            const tags = await getFullListLocalsPBCollection(locals, "tags", "-created")

            let replacedData = replaceIDwithName(resultList, "artists", "name", artistsNameList)
            replacedData = replaceIDwithName(replacedData, "tag", "title", tags)

            let locDat = []

            for (let i = 0; i < replacedData.length; i++) {
                let workName = replacedData[i].title;
                let d = await serversideViewerDataConstructor(workName, locals);
                // console.log(d, "LOCATOR DATA");
                locDat.push({
                    work: replacedData[i],
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

            //console.log(cleanedData, "CLEANED");

            locatorDat = cleanedData
            return { works: replacedData, tag: tags, locator: cleanedData }

        }

    } catch (err) {
        console.log('Error: ', err);

    }

};


// *! AB HIER FORMACTIONS ------->
export const actions = {

    terms: async ({ request, locals }) => {
        try {
            const id = locals.pb.authStore.model.id

            const formData = await request.formData()
            const terms = formData.get('terms')
            console.log(formData, "🦁🦁🦁🦁🦁🦁");
            var isTrueSet = /^true$/i.test(terms);
            // example update data
            console.log(isTrueSet);
            const data = {
                "terms": isTrueSet
            };

            /** !We need to get the locals instance of pb to populate the Data through */
            const record = await locals.pb.collection('users').update(id, data);

            return { sucsess: true }
        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }

    },
    publicState: async ({ request, locals }) => {
        try {
            const id = locals.pb.authStore.model.id

            const formData = await request.formData()
            const publicState = formData?.get('publicState') ?? false
            const workId = formData.get("workId")
            console.log(formData, "🦁🦁🦁🦁🦁🦁");

            // example update data

            const data = {
                "public": publicState
            };
            log("🦁🦁🦁🦁🦁🦁", workId, publicState, data)

            const record = await locals.pb.collection('work').update(`${workId}`, data);
            log(record, "record from public state")

            /** !We need to get the locals instance of pb to populate the Data through */
            //  const record = await locals.pb.collection('work').update(`${workId}`, data);


        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }
    },

    updateUser: async ({ request, locals }) => {
        try {
            const id = locals.pb.authStore.model.id
            const artistId = locals.pb.authStore.model.artist
            console.log(artistId, "🦁🦁🦁🦁🦁🦁");

            const formData = await request.formData()

            const username = formData.get("username")
            const pronomen = formData.get("pronomen")
            const klasse = formData.get("klasse")
            const website = formData.get("website")
            const insta = formData.get("insta")

            //* Change HTTPS:
            let modifiedWebsite = website?.startsWith("https://") ? website.replace(/^https:\/\/(.*)$/, `https://${website.replace(/^https:\/\//, '')}`) : `https://${website}`
            let modifiedInsta = insta?.startsWith("https://") ? insta.replace(/^https:\/\/(.*)$/, `https://instagram.com/${insta.replace(/^https:\/\/instagram.com\//, '')}`) : `https://instagram.com/${insta}`

            if (website === "") {
                modifiedWebsite = undefined
            }
            if (insta === "") {
                modifiedInsta = undefined
            }

            // example update data

            const dataUser = {
                "name": username,
                "pronomen": pronomen,
                "insta": "",
                "website": ""

            };
            if (modifiedWebsite) {
                dataUser.website = modifiedWebsite
            }
            if (modifiedInsta) {
                dataUser.insta = modifiedInsta
            }
            console.log(dataUser);

            const dataArtists = {
                "name": username,
                "pronomen": pronomen
            }

            /** !We need to get the locals instance of pb to populate the Data through */
            // * Hier muss geschaut werden ob daten existieren oder geupdated werden müssen.


            const recordUser = await locals.pb.collection('users').update(id, dataUser);
            let recordArtists = await locals.pb.collection("artists").update(artistId, dataArtists)

            console.log(recordUser, "🦁🦁🦁🦁🦁🦁");
            console.log(recordArtists, "🦁🦁🦁🦁🦁🦁");


            // * This returns the data to the Form-Variable. Wich can be used to show the updated Data or a Dialog
            return { success: true, name: username, pronomen: pronomen, insta: modifiedInsta, website: modifiedWebsite }

        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }

    },
    addNewWork: async ({ request, locals }) => {

        try {
            const id = locals.pb.authStore.model.id
            const artistId = locals.pb.authStore.model.artist

            const formData = await request.formData()
            console.log("😚😚😚😚😚😚😚😚😚😚😚😚", formData, "Fromdata from Modals 😚😚😚😚😚😚😚😚😚😚😚😚");

            const title = formData.get("title") || ""
            const description = formData.get("description") || ""
            console.log(description, "Description from Modals");
            const link = formData.get("link")
            const publicState = formData.get("public")
            const jahr = formData.get("jahr")
            const tags = formData.get("tags")

            const tagsId = await locals.pb.collection("tags").getFullList({
                fields: "id,title"
            });

            let findTagId = (tagTitle) => {
                for (let i = 0; i < tagsId.length; i++) {
                    if (tagsId[i].title === tagTitle) {
                        return tagsId[i].id
                    }
                }
            }

            // example update data
            const data = {
                "title": title,
                "description": description,
                "link": link,
                "public": publicState,
                "user": id,
                "artists": [artistId],
                "jahr": jahr,
                "tag": [],


            };
            console.log(data, "DATAFROMMODAL");
            try {
                if (tagsId) {
                    const newTagIds = tags?.split(",").map(tag => {
                        const trimmedTag = tag.trim();
                        const validTagId = findTagId(trimmedTag);
                        return validTagId && trimmedTag.length >= 3 && trimmedTag.length <= 30 ? validTagId : undefined;
                    }).filter(Boolean);
                    data.tag = newTagIds;

                    const newTags = tags?.split(",").filter(tag => {
                        const trimmedTag = tag.trim();
                        return !tagsId.some(t => t.title === trimmedTag) &&
                            trimmedTag.length >= 3 &&
                            trimmedTag.length <= 30;
                    });
                    for (const tag of newTags) {
                        const trimmedTag = tag.trim();
                        if (trimmedTag.length >= 3 && trimmedTag.length <= 30) {
                            const tagData = { title: trimmedTag };
                            const newTagId = await locals.pb.collection('tags').create(tagData);
                            if (newTagId) {
                                data.tag.push(newTagId.id);
                            }
                        }
                    }
                    const record = await locals.pb.collection('work').create(data);

                    if (record) {
                        const headline = {
                            positionId: "",
                            x: 0,
                            y: 0,
                            width: Math.max(5, title.length),
                            height: 3,
                            work: record.id,
                            artists: record.artists,
                            content: title
                        };
                        const paragraph = {
                            positionId: "",
                            x: 0,
                            y: 2,
                            width: Math.max(5, description.length),
                            height: 3,
                            work: record.id,
                            artists: record.artists,
                            content: description
                        };
                        if (headline.content !== "") {
                            await locals.pb.collection('headlines').create(headline);
                        }
                        if (paragraph.content !== "<p></p>") {

                            await locals.pb.collection('paragraphs').create(paragraph);
                        }
                    }
                }
            } catch (error) {
                console.log(error, "Error from Adding Work, while creating new Work")
            }


            // * This returns the data to the Form-Variable. Wich can be used to show the updated Data or a Dialog
            return { title: title, description: description, link: link, publicState: publicState }


        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }
    },
    deleteWork: async ({ request, locals }) => {
        try {
            const id = locals.pb.authStore.model.id
            const artistId = locals.pb.authStore.model.artist

            const formData = await request.formData()
            log(formData, "FORMDATA FROM DELETEWORK");
            const title = formData.get("title")

            console.log(title, "TITLE FROM DELETEWORK");

            const workData = await locals.pb.collection("work").getFullList({
                filter: `id="${title}"`, fields: "title,id"
            });
            console.log(workData, "WORK DATA FROM DELETEWORK");

            let headlineData = await locals.pb.collection("headlines").getFullList({
                filter: `work="${workData[0].id}"`, fields: "work,id"
            });
            let paragraphData = await locals.pb.collection("paragraphs").getFullList({
                filter: `work="${workData[0].id}"`, fields: "work,id"
            });
            console.log(paragraphData, "PARAGRAPH DATA FROM DELETEWORK");
            let pictureData = await locals.pb.collection("pictures").getFullList({
                filter: `work="${workData[0].id}"`, fields: "work,id"
            });

            log(headlineData.length, "HEADLINE DATA FROM DELETEWORK");

            if (headlineData.length > 0) {

                for (let i = 0; i < headlineData.length; i++) {
                    await locals.pb.collection("headlines").delete(headlineData[i].id);
                    console.log(headlineData, "HEADLINE DATA FROM DELETEWORK");
                }
            }
            if (paragraphData.length > 0) {

                for (let i = 0; i < paragraphData.length; i++) {
                    await locals.pb.collection("paragraphs").delete(paragraphData[i].id);
                    console.log(paragraphData, "PARAGRAPH DATA FROM DELETEWORK");
                }
            }
            if (pictureData.length > 0) {
                for (let i = 0; i < pictureData.length; i++) {
                    await locals.pb.collection("pictures").delete(pictureData[i].id), {
                        'documents': null,
                    };
                    console.log(pictureData, "PICTURE DATA FROM DELETEWORK");
                }
            }

            await locals.pb.collection('work').delete(workData[0].id);
        }

        catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }
    },
    updateWork: async ({ request, locals }) => {
        try {
            const id = locals.pb.authStore.model.id
            const artistId = locals.pb.authStore.model.artist

            const formData = await request.formData()
            console.log(formData, "Formdata from UpdateWork");

            const title = formData.get("title")
            const workID = formData.get("id")

            const publicState = formData.get("public")

            await locals.pb.collection('work').update(workID, {
                "title": title,
                "public": publicState

            })

        }
        catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }

    },
    /**
     * Update locator data for a specific work.
     *
     * @param {Object} context - The context object containing request, locals and params.
     * @param {Object} context.request - The request object.
     * @param {Object} context.locals - The locals object.
     * @param {Object} context.params - The params object.
     * @return {Promise<void>} A promise that resolves with no value.
     */
    locatorUpdater: async ({ request, locals, params }) => {
        console.log(params, "Params from LocatorUpdater");
        // Get the id of the user and form data.
        const id = locals.pb.authStore.model.id
        const formData = await request.formData()
        const workID = formData.get("workID")

        console.log(formData, "Formdata from LocatorUpdater");
        // Initialize an empty array to store the data.
        let data = [];

        // Iterate over the form data entries.
        for (let entry of formData.entries()) {
            // Check if the entry key starts with "ItemID".
            if (entry[0].startsWith("ItemID")) {
                // Extract the itemID from the entry key.
                let itemID = entry[0].slice(7);

                // Get the x, y, w, h, type and content values from the form data.
                let x = formData.get(`Item-x-${itemID}`);
                let y = formData.get(`Item-y-${itemID}`);
                let w = formData.get(`Item-w-${itemID}`);
                let h = formData.get(`Item-h-${itemID}`);
                let type = formData.get(`Item-type-${itemID}`);
                let content = formData.get(`Item-content-${itemID}`);
                let newDataentrie = formData.get(`Item-new-${itemID}`);

                // Push the data object into the data array.
                data.push({
                    "type": type,
                    "update": {
                        "work": workID,
                        "id": itemID,
                        "y": parseFloat(y),
                        "w": parseFloat(w),
                        "h": parseFloat(h),
                        "x": parseFloat(x),
                        "content": content,
                        "artist": [locals.pb.authStore.model.artist]
                    },
                    "new": newDataentrie ? true : false
                })
                console.log(data, "DATA FROM LOCATORUPDATER");
            }
        }

        const formDat = new FormData()
        // Check if the data array has elements.
        if (data.length > 0) {
            // Iterate over the data array.
            data.forEach(async el => {
                const itemID = el.update.id
                if (el.type === "pictures" && el.new === true) {
                    let fileData = formData.get(`fileData-${itemID}`);
                    if (fileData) {
                        let altText = formData.get(`altTxt-${itemID}`)
                        let credits = formData.get(`credits-${itemID}`)
                        formDat.append('content', fileData);

                        const data = {
                            "work": el.update.work,
                            "y": el.update.y,
                            "w": el.update.w,
                            "h": el.update.h,
                            "x": el.update.x,
                            "altTxt": altText,
                            "credits": credits,
                            "artist": [locals.pb.authStore.model.artist]
                        };

                        for (const key in data) {
                            formDat.append(key, data[key]);
                        }
                        updatePIC(formDat, locals)
                    }
                }
                else if (el.new === false) {
                    try {
                        // Define the data object.
                        const data = {
                            "work": el.update.work,
                            "y": el.update.y,
                            "w": el.update.w,
                            "h": el.update.h,
                            "x": el.update.x,
                            "content": el.update.content,
                            "artist": el.update.artist
                        }
                        // Update the data in the specified collection.
                        await locals.pb.collection(el.type).update(itemID, data);
                    } catch (err) {
                        // Log any errors.
                        console.log(`Error updating ${el.type}: update ${itemID} With ${el.update.content} and ${el.new} state`, err);
                        console.log(formData, "formData from locatorUpdater");
                    }
                }
                else {
                    try {
                        const data = {
                            "work": el.update.work,
                            "y": el.update.y,
                            "w": el.update.w,
                            "h": el.update.h,
                            "x": el.update.x,
                            "content": el.update.content,
                            "artist": el.update.artist
                        }
                        // Update the data in the specified collection.
                        let record = await locals.pb.collection(el.type).create(data);
                        log(record, "record from create")
                    } catch (err) {
                        // Log any errors.
                        console.log(`Error updating ${el.type}: in create `, err);
                    }
                }

                return {
                    status: 200
                }
            })
        };
    },


    //     let locatorData = locatorDat
    //     log(locatorData, "LOCATORDATA")
    //     try {
    //         GET Identification of user and work(over params)
    //         const id = locals.pb.authStore.model.id
    //         let workData = await locals.pb.collection('work').getFullList({ filter: `user = "${id}"&& title ?= "${params.work}"` })

    //         Get FORM_DATA
    //         const formData = await request.formData()
    //         const data = formData.get('data')
    //         console.log("....................", formData, ":::::::::::::::::::")
    //         let JSON_DATA = JSON.parse(data)

    //         let workID = formData.get("workID")




    //         log(workID, "workID,🎉🎉🎉🎉🎉")
    //         log(JSON_DATA, "JSON_DATA,🎉🎉🎉🎉🎉")
    //         log(locatorData, "locatorData,🎉🎉🎉🎉🎉")

    //         JSON_DATA.forEach(element => {
    //             log(element, "ELEMENT")
    //             const formDat = new FormData()
    //             if (element.type === "pictures") {
    //                 let fileData = formData.get(`fileData-${element.id}`);
    //                 let altText = formData.get(`altTxt-${element.id}`)
    //                 let credits = formData.get(`credits-${element.id}`)

    //                 Check if fileData exists before appending to formData
    //                 if (fileData) {
    //                     formDat.append('content', fileData);

    //                     const data = {
    //                         "y": element[COLS].y,
    //                         "w": element[COLS].w,
    //                         "h": element[COLS].h,
    //                         "x": element[COLS].x,
    //                         "work": workID,
    //                         "altTxt": altText,
    //                         "credits": credits,
    //                         "artist": [locals.pb.authStore.model.artist]
    //                     };
    //                     TODO This is a temporary fix. for the svelte-grid-extended
    //                     const data = {
    //                         "y": element.y,
    //                         "w": element.w,
    //                         "h": element.h,
    //                         "x": element.x,
    //                         "work": workID,
    //                         "altTxt": altText,
    //                         "credits": credits,
    //                         "artist": [locals.pb.authStore.model.artist]
    //                     };

    //                     for (const key in data) {
    //                         formDat.append(key, data[key]);
    //                     }
    //                     updatePIC(formDat, locals)
    //                 }
    //             }
    //         });




    //         JSON_DATA.forEach(element => {
    //             const gefunden = locatorData.some(item => item.locator.some(el => el.id === element.id));
    //             const valueExists = JSON_DATA.some(item => item.id === element.id && item.newItem === true);

    //             log(gefunden, "gefunden,🎉🎉🎉🎉🎉")
    //             log(valueExists, "newItem,🎉🎉🎉🎉🎉")

    //             if (gefunden) {
    //                 const data = {
    //                     "id": element.id,
    //                     "y": element[COLS].y,
    //                     "w": element[COLS].w,
    //                     "h": element[COLS].h,
    //                     "x": element[COLS].x,
    //                     "content": element.content,
    //                 };
    //                 const data = {
    //                     "id": element.id,
    //                     "y": element.y,
    //                     "w": element.w,
    //                     "h": element.h,
    //                     "x": element.x,
    //                     "content": element.content,
    //                 };
    //                 try {
    //                     const record = locals.pb.collection(`${element.type}`).update(element.id, data);
    //                 } catch (error) {
    //                     console.log(error, "Error from UPDATE gefundenen DATA in Profil/WORK");
    //                 }
    //             }
    //             else if (!gefunden && valueExists && element.type != "pictures") {
    //                 const data = {
    //                     "y": element[COLS].y,
    //                     "w": element[COLS].w,
    //                     "h": element[COLS].h,
    //                     "x": element[COLS].x,
    //                     "work": workID,
    //                     "content": element.content,
    //                     "artist": [locals.pb.authStore.model.artist]
    //                 };
    //                 const data = {
    //                     "y": element.y,
    //                     "w": element.w,
    //                     "h": element.h,
    //                     "x": element.x,
    //                     "work": workID,
    //                     "content": element.content,
    //                     "artist": [locals.pb.authStore.model.artist]
    //                 };
    //                 try {
    //                     const record = locals.pb.collection(element.type).create(data);
    //                 } catch (error) {
    //                     console.log(error, "Error from CREATE new DATA in Profil/WORK");
    //                 }
    //             }

    //         });
    //         return { saved: true }
    //     } catch (err) {
    //         console.log('Error: ', err);
    //         throw error(err.status, err.message);
    //     }
    // },

    /**
     * A function to delete an item in a specific locator.
     *
     * @param {Object} request - the request object
     * @param {Object} locals - the locals object
     * @return {Promise} returns a promise
     */
    deleteItemInLocator: async ({ request, locals }) => {
        try {
            const formData = await request.formData()
            const id = formData.get("id")
            const type = formData.get("type")
            log(formData, "this is from delteItemInLocator", id, type)

            try {
                if (id !== "newItem") {
                    // log("now deleteing the data 게임", id, type)
                    const record = await locals.pb.collection(`${type}`).delete(id);

                }

            } catch (error) {
                log(error, "Error from DELETE DATA in Profil/WORK")
            }



        } catch (err) { log(err) }
    },
    updateOrder: async ({ request, locals }) => {
        try {

            const formData = await request.formData()
            log(formData, "🔩🔩🔩🔩🔩🔩🔩🔩🔩🔩🔩🔩")

            const allOrders = formData.getAll('order')
            let allOrderParsed = JSON.stringify(allOrders)
            log(allOrderParsed, "🔩🔩🔩🔩🔩🔩🔩🔩🔩🔩🔩🔩 ")



            // const promises = updates.map(({ id, order }) => {
            //     const data = {
            //         "order": order
            //     };
            //     return locals.pb.collection('work').update(id, data)
            // })

            // const records = await Promise.all(promises)
            // console.log(records, "Records from UPDATE ORDER in Profil/WORK!👨🏼‍💻👨🏼‍💻🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊🦊")
        } catch (error) {
            log(error, "Error from UPDATE ORDER in Profil/WORK")

        }


    },
    //! This is not finished and not implemented. 
    addNewTag: async ({ request, locals }) => {
        try {
            const formData = await request.formData()
            const tag = formData.get('tag')
            const workID = formData.get('workID')


            const data = {
                "tag": tag,
            };



            const record = await locals.pb.collection('work').update(`${workID}`, data);




        } catch (err) {
            console.log('Error: ', err);
            error(err.status, err.message);
        }
    }
}