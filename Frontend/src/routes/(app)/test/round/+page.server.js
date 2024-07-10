
import { serversideViewerDataConstructor } from '$lib/components/Profil_Work_SiteBuilder/1_Locator/serversideUtils.js'
import { checkIfIdsExist, getValuesFromIds } from '$lib/utils.js'


export async function load({ params, locals }) {
    let workName = "empty"
    console.log(workName)

    try {
        let locDat = await serversideViewerDataConstructor(workName, locals)
        console.log(locDat.locator, "LOCATOR DATA");
        let workData = await locals.pb.collection('work').getFullList({ filter: ` title ?= "${workName}"` })
        let artistsData = await locals.pb.collection('artists').getFullList();
        let artistsNames = [];

        workData[0].artists.forEach(element => {
            artistsNames.push(getValuesFromIds(artistsData, element, "name"))
        });

        let tagData = await locals.pb.collection("tags").getFullList()
        let tagIDs = checkIfIdsExist(tagData, workData[0].tag)
        let tags = getValuesFromIds(tagData, tagIDs, "title")



        return { artist: artistsNames, work: workName, tag: tags, locator: locDat?.locator, jahr: workData[0].jahr }

    } catch (error) {
        console.log(error);
    }





};