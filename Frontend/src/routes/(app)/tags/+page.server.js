/** @type {import('./$types').PageServerLoad} */
export async function load({locals}) {
    let tags = await locals.pb.collection("tags").getFullList({"fields":"title"});

    return {tags};
};