/** @type {import('./$types').RequestHandler} */
export async function GET({ locals, url }) {
    const query = url.searchParams.get('query');
    console.log(query, "QUERY")
    const resultList = await locals.pb.collection('work').getList(1, 2000, {
        filter: `public=true && title ?~ "${query}" || artists.name ?~ "${query}" || tag.title ?~ "${query}" || jahr ?= "${query}" `, expand: "artists,tag", fields: "id,jahr,title,expand.artists.name,expand.tag.title,created",
    })
    const resultImageList = await locals.pb.collection('pictures').getFullList({
        fields: "artist ,content,work,collectionName,collectionId,id"
    })
    const resultParagraphsList = await locals.pb.collection('paragraphs').getFullList({
        fields: "artist,content,work"
    })
    //console.log(resultParagraphsList, "Paragraphs");
    const resultWithImages = resultList.items
        .map(workItem => {
            const matchingImage = resultImageList.find(image => image.work === workItem.id)
            return {
                ...workItem,
                image: matchingImage ? {
                    id: matchingImage.id,
                    collectionId: matchingImage.collectionId,
                    content: matchingImage.content
                } : undefined
            }
        })
        // sort by Jahr in descending order and then by created in ascending order
        .sort((a, b) => b.jahr - a.jahr || a.created - b.created);

        if (resultWithImages.length == 0) {
            return new Response(JSON.stringify({ results: [], query: query }), { status: 200 })
        }

    return new Response(JSON.stringify({ results: resultWithImages, query: query }), { status: 200 })






}