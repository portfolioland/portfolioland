import { viewrDataConstuctor } from '$lib/components/Profil_Work_SiteBuilder/1_Locator/utils.js';

/**
 * Async function for constructing  viewer data serverside.
 *
 * @param {string} workName - The name of the work
 * @param {Object} locals - The locals object
 * @return {Promise<Object>} A promise that resolves to the constructed locator data
 */
export let serversideViewerDataConstructor = async (workName = "Test", locals) => {
    try {
        let workData = await locals.pb.collection('work').getFullList({ filter: ` title ?= "${workName}"` });
        console.log(workData, "workDATA")
        let locatorData = [{}];

        if (workData != []) {
            let headlineData = await locals.pb.collection("headlines").getFullList({ filter: `work="${workData[0].id}"` });
            let paragraphData = await locals.pb.collection("paragraphs").getFullList({ filter: `work="${workData[0].id}"` });
            let pictureData = await locals.pb.collection("pictures").getFullList({ filter: `work="${workData[0].id}"` });

            try {
                viewrDataConstuctor(headlineData, "headlines", locatorData);
                viewrDataConstuctor(paragraphData, "paragraphs", locatorData);
                viewrDataConstuctor(pictureData, "pictures", locatorData);
            } catch (error) {
                console.log(error, "error from data pusher in artist/work");
            }
        }


        return { locator: locatorData };
    } catch (error) {
        console.log(error);
    }
};

/**
 * Updates the PIC (Point of Contact) with the provided form data.
 *
 * @param {Object} formDat - The form data containing the updated PIC information.
 * @param {Object} pb - The Pocketbase instance used for accessing the database. Defaults to the `locals.pb` instance if not provided.
 * @return {Promise<void>} A promise that resolves when the PIC is successfully updated.
 */
export let updatePIC = async (formDat, locals) => {
    await locals.pb.collection('pictures').create(formDat, { requestKey: null });
}

/**
 * This function checks if the elements in the first array exist in the second array.
 * If an element's `id` is not found in the second array, it deletes that element from the first array's collection.
 *
 * @param {Array} firstArray - The array containing elements to check and potentially delete.
 * @param {Array} secondArray - The array containing elements to compare against.
 * @param {Object} locals - The locals object, which contains a reference to the PocketBase instance.
 * @return {void} This function does not return anything.
 */
export function checkIfIdsExistelseDelete(firstArray, secondArray, locals) {
    if (!firstArray || !Array.isArray(firstArray) || !secondArray || !Array.isArray(secondArray) || !locals || !locals.pb) {
        throw new Error("Invalid input parameters");
    }

    for (const secondArrayElement of secondArray) {
        const isFirstArrayPresent = firstArray.some(firstElement => firstElement.locator.id === secondArrayElement.id);

        if (!isFirstArrayPresent) {
            try {
             //   locals.pb.collection(secondArrayElement.type).delete(secondArrayElement.id);
            } catch (err) {
                console.error(err, err.message, "error from checkIfIdsExistelseDelete");
            }
        }
    }
}

export function deleteNonMatchingIdsFromSecondArray(firstArray, secondArray, locals) {
    const firstArrayIds = new Set(firstArray.map(element => element.id));

    for (const element of secondArray) {
        if (!firstArrayIds.has(element.locator)) {
            try {
                locals.pb.collection(element.type).delete(element.id);
            } catch (err) {
                console.log(err, err.message, "error from deleteNonMatchingIdsFromSecondArray");
            }
        }
    }
}