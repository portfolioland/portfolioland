import { getFullListLocalsPBCollection, replaceIDwithName, replaceTagIdsWithTitles } from '$lib/pb_get_helper';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    let tag = await getFullListLocalsPBCollection(locals, "tags", "-created")
    let work = await getFullListLocalsPBCollection(locals, "work")
    let replace = await replaceTagIdsWithTitles(work, tag)
    let test = await replaceIDwithName(work, "id", "title", tag)


    return { tag: tag, work: test };
};