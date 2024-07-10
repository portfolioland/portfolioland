import { browser } from "$app/environment";

export const serializeNonPOJOS = (obj) => {
    return structuredClone(obj)
}

export function checkIfIdsExist(firstArray, secondArray) {
    // Extract ids from the second array
    const secondArrayIds = secondArray
    let item = [];

    // Check if each id from the first array is present in the second array
    for (const element of firstArray) {
        const isIdPresent = secondArrayIds.includes(element.id);
        console.log(`ID: ${element.id}, Found: ${isIdPresent}`);
        if (isIdPresent) {
            item.push(element.id)
        }
    }

    return item
}

export const getValuesFromIds = (tagData, idsToRetrieve, property) => {
    // Filter the tagData array to include only objects with matching IDs
    const matchingTags = tagData.filter(tag => idsToRetrieve.includes(tag.id));

    // Extract the specified property from the matchingTags array
    const values = matchingTags.map(tag => tag[property]);

    return values;
};

/**
 * Stores a value in the session storage under the specified field.
 *
 * @param {string} field - The name of the field to store the value under.
 * @param {string} value - The value to be stored.
 */
export function sessionStore(field, value) {
    if (browser) window.sessionStorage.setItem(field, value);
}

/**
 * Retrieves the value stored in the session storage under the specified field.
 *
 * @param {string} field - The name of the field to retrieve the value from.
 * @return {string|null} The value stored in the session storage under the specified field, or null if the browser is not available.
 */

export function sessionGet(field) {
    if (browser) return window.sessionStorage.getItem(field);
}

