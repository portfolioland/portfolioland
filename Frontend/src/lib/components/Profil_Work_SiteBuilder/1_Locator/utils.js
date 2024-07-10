import gridHelp from 'svelte-grid/build/helper';

import ImageUploadPlaceholder from '../2_image/pictures.svelte';
import Headline from '../3_text/headline.svelte';
import Paragraph from '../3_text/paragraph.svelte';
import { sharedRowHeight } from './config';


export const id = () => crypto.randomUUID()

/**
 * Maps a value from one range to another.
 *
 * @param {number} value - The value to be mapped
 * @param {number} sourceMin - The minimum value of the source range
 * @param {number} sourceMax - The maximum value of the source range
 * @param {number} targetMin - The minimum value of the target range
 * @param {number} targetMax - The maximum value of the target range
 * @return {number} The mapped value within the target range
 */
function mapValue(value, sourceMin, sourceMax, targetMin, targetMax) {
    // Ensure the value is within the source range
    value = Math.min(Math.max(value, sourceMin), sourceMax);

    // Calculate the percentage of the value in the source range
    const percentage = (value - sourceMin) / (sourceMax - sourceMin);

    // Map the percentage to the target range
    const targetValue = percentage * (targetMax - targetMin) + targetMin;

    return targetValue;
}
/**
 * Creates a new generic item.
 *
 * @param {number} COLS - the number of columns
 * @param {number} x - the x coordinate
 * @param {number} y - the y coordinate
 * @param {number} w - the width
 * @param {number} h - the height
 * @param {string} componentType - the type of component
 * @param {string} type - the type of the item
 * @return {object} a new generic item
 */
export function createGenericNewItem(COLS, x, y, w, h, componentType, type) {
    return {
        [COLS]: gridHelp.item({
            w: w,
            h: h,
            x: x,
            y: y,
            customDragger: true,
        }),
        id: "newItem",
        component: componentType,
        type: type,  // Assuming the type is the component name in lowercase + 's'
        newItem: true,
    };
}



/**
 * Add a new item to the items array.
 *
 * @param {number} COLS - The number of columns.
 * @param {array} items - The array of items.
 * @param {string} componentType - The type of component.
 * @param {string} type - The type of the new item.
 * @param {number} w - The width of the new item.
 * @param {number} h - The height of the new item.
 * @param {number} x - The x-coordinate of the new item.
 * @param {number} y - The y-coordinate of the new item.
 * @return {array} The updated items array.
 *  
 * Example usage:
 *  addNewItem(COLS, items, ImageUploadPlaceholder);
 *  addNewItem(COLS, items, Headline);
 *  addNewItem(COLS, items, Paragraph);
 */
export function addNewItem(COLS, items, componentType, type, w = 20, h = 2, x = 50, y = 2) {

    // Create a generic newItem object
    let newItem = createGenericNewItem(COLS, x, y, w, h, componentType, type,)

    // Map x and y values to grid coordinates
    // const xV = mapValue(x, 0, innerWidth, 0, COLS);
    // const yRows = innerHeight / sharedRowHeight;
    // const yV = mapValue(y, 240, innerHeight, 0, yRows);

    // Calculate the position based on mapped values
   // const findOutPosition = { x: Math.round(xV - (w / 2)), y: Math.round(yV) };
const findOutPosition = gridHelp.findSpace(newItem, items, COLS);
    // Update newItem with the calculated position
    newItem = {
        ...newItem,
        [COLS]: {
            ...newItem[COLS],
            ...findOutPosition
        }
    };

    items = [...items, ...[newItem]];
    return items
}


export const addAt = ""

export const remover = (item, COLS, items, adjustAfterRemove) => {
    items = items.filter((value) => value.id !== item.id);

    if (adjustAfterRemove) {
        items = gridHelp.adjust(items, COLS);
    }
    return items
};


/**
 * Pushes a new item object into the items array based on the element type.
 *
 * @param {type} COLS - the number of columns for the grid
 * @param {type} items - array of items
 * @param {type} element - element of an parent array
 * @param {type} upload - if true 
 * @return {type} undefined if element type is unknown, otherwise description of return value
 * 
 * 
 *  let items = [];
     * Add Elements for the Locator viewer
    data.locator.forEach((element) => {
        itemsPusher(COLS, items, element, false);
    });
 */
export const itemsPusher = (COLS, items, element, upload) => {
    // Create a new item object based on the element type
    let newItem = {};

    switch (element.type) {
        case 'pictures':
            newItem = dataConstructor(COLS, element, ImageUploadPlaceholder, upload);
            break;
        case 'paragraphs':
            newItem = dataConstructor(COLS, element, Paragraph, upload);
            break;
        case 'headlines':
            newItem = dataConstructor(COLS, element, Headline, upload);
            break;
        default:
            console.warn(`Unknown element type: ${element.type}`);
            return; // or handle the default case accordingly
    }

    // Push the newItem object into the items array
    items.push(newItem);
};

/**
 * Constructs a data object based on the provided parameters.
 *
 * @param {number} COLS - the number of columns for the grid
 * @param {object} element - the element configuration
 * @param {string} component - the component type
 * @param {boolean} upload - flag indicating whether upload is enabled (default is true)
 * @return {object} the constructed data object
 */
let dataConstructor = (COLS, element, component, upload = true) => {
    const result = {
        [COLS]: gridHelp.item({
            x: element.x,
            y: element.y,
            w: element.w,
            h: element.h,
            resizable: upload ? true : false,
            draggable: upload ? true : false,
            fixed: upload ? false : true,
            customDragger: true,
            customResizer: false,
        }),
        id: element.id,
        component: component,
        content: element.content || "",
        collectionID: element.collectionID || "",
        type: element.type,
        newItem: false
    };

    // Check if altText exists in the element before adding it to the result
    if (element.altText !== undefined) {
        result.altTxt = element.altText;
    }

    // Check if credits exists in the element before adding it to the result
    if (element.credits !== undefined) {
        result.credits = element.credits;
    }

    return result;
};

/**
 * Updates the content of the items with the specified id.
 *
 * @param {Array} items - The array of items to be updated
 * @param {number} id - The id of the item to be updated
 * @param {string} newContent - The new content to be assigned to the item
 * @return {Array} - The updated array of items
 */
export function updateContent(items, id, newContent) {
    return items = items.map(item => (item.id === id ? { ...item, content: newContent } : item));
}

/**
 * Constructs viewr data based on the given item array and locator data.
 *
 * @param {array} itemArray - The array of items to construct the viewr data from.
 * @param {string} type - The type of the viewr data.
 * @param {array} locatorData - The array to store the constructed locator data.
 */
export function viewrDataConstuctor(itemArray, type = "", locatorData) {
    itemArray.forEach(element => {
        locatorData.push({
            "x": element.x,
            "y": element.y,
            "w": element.w,
            "h": element.h,
            "customDragger": false,
            "customResizer": false,
            "id": element.id,
            "content": element.content,
            "collectionID": element.collectionId,
            "type": type,
            "altTxt": element.altTxt,
            "credits": element.credits
        })
    })

}


