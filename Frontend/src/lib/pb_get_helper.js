
/**
 * Retrieves the full list of items from a specified collection in the locals.pb database, with optional sorting, filtering, and expansion.
 *
 * @param {Array} locals - the locals object
 * @param {string} collection - the name of the collection to retrieve from (default: "")
 * @param {string} sort - the sorting criteria for the retrieved list (default: "-created")
 * @param {string} filter - the filter criteria for the retrieved list (default: "")
 * @param {string} expand - the expansion criteria for the retrieved list (default: "")
 * @return {Promise<any>} a promise that resolves with the full list of items from the specified collection
 */
export async function getFullListLocalsPBCollection(locals, collection = "", sort = "-created", filter = "", expand = "") {
  let t = await locals.pb.collection(collection).getFullList({
    sort: sort,
    filter: filter,
    expand: expand,

  });
  return t
}

/**
 * Replaces tag ids with their corresponding titles in the works array.
 *
 * @param {Array} works - The array of works to process
 * @param {Array} tags - The array of tags to map by id
 * @return {Array} The works array with tag ids replaced by titles
 */
export function replaceTagIdsWithTitles(works, tags) {
  // Map tags by id for easier access
  const tagMap = {};
  tags.forEach(tag => {
    tagMap[tag.id] = tag.title;
  });

  // Iterate through each work in the 'works' array
  works.forEach(work => {
    // Check if the work has tags
    if (work.tag.length > 0) {
      // Replace each tag id with the corresponding title
      work.tag = work.tag.map(tagId => tagMap[tagId]);
    }
  });

  return works;
}

/**
 * Replaces specified IDs with corresponding names in a given data array.
 * @param {Array} dataWithIDs - Array of objects containing IDs to replace.
 * @param {string} fieldToReplace - Field in each object containing the IDs.
 * @param {string} fieldToReplaceWith - Field to replace the IDs with.
 * @param {Array} dataWithNames - Array of objects containing ID-to-name mappings.
 * @returns {Array} - Updated data array with replaced names.
 */

export function replaceIDwithName(dataWithIDs, fieldToReplace = "tag", fieldToReplaceWith = "title", dataWithNames) {
  // Create a map of ID-to-name for efficient lookup
  const idToNameMap = dataWithNames.reduce((map, entry) => {
    map[entry.id] = entry[fieldToReplaceWith];
    return map;
  }, {});

  // Iterate through each item in the data array
  dataWithIDs.forEach(item => {
    // Extract the IDs to replace
    const idsToReplace = item[fieldToReplace];

    // Check if there are IDs to replace and replace them with corresponding names
    if (idsToReplace && Array.isArray(idsToReplace) && idsToReplace.length > 0) {
      item[fieldToReplace] = idsToReplace.map(id => idToNameMap[id]);
    }
  });

  // Return the updated data array
  return dataWithIDs;
}

