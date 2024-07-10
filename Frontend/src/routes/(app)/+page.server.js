/** @type {import('./$types').PageServerLoad} */

import { error } from '@sveltejs/kit';


// *! AB HIER LOAD FUNCTION ------->
// * On load check if User is logged in and fetch UserData from DB else return undefined
export async function load({ fetch,locals }) {
    const resultList = await locals.pb.collection('work').getList(1, 10, {
        filter: "public=true", expand: "artists,tag", fields: "id,jahr,title,expand.artists.name,expand.tag.title,created",
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
    const resultImageandParagraphsList = resultWithImages.map(workItem => {
        const matchingParagraphs = resultParagraphsList.find(paragraph => paragraph.work === workItem.id)
        return {
            ...workItem,
            paragraphs: matchingParagraphs
        }
    })


    const response = await fetch('/api/getRandomImage');
    const heroDataJson = await response.json();



    // console.log(resultImageList, "RESULT IMAGE LIST FROM SERVER, ON LOAD");
    //console.log(resultList, "RESULT LIST FROM SERVER, ON LOAD");
    console.log(resultWithImages, "RESULT WITH IMAGES FROM SERVER, ON LOAD");
    console.log(resultImageandParagraphsList, "RESULT IMAGE AND PARAGRAPHS FROM SERVER, ON LOAD");

    return { work: resultImageandParagraphsList, hero: heroDataJson };
}

export const actions = {
    search: async ({ request, locals }) => {
        // const formData = await request.formData();
        // const query = formData.get('query');

        // const resultList = await locals.pb.collection('work').getList(1, 2000, {
        //     filter: `public=true && title ?~ "${query}" || artists.name ?~ "${query}" || tag.title ?~ "${query}" || jahr ?= "${query}" `, expand: "artists,tag", fields: "id,jahr,title,expand.artists.name,expand.tag.title,created",
        // })
        // const resultImageList = await locals.pb.collection('pictures').getFullList({
        //     fields: "artist ,content,work,collectionName,collectionId,id"
        // })
        // const resultParagraphsList = await locals.pb.collection('paragraphs').getFullList({
        //     fields: "artist,content,work"
        // })
        // console.log(resultParagraphsList, "Paragraphs");
        // const resultWithImages = resultList.items
        //     .map(workItem => {
        //         const matchingImage = resultImageList.find(image => image.work === workItem.id)
        //         return {
        //             ...workItem,
        //             image: matchingImage ? {
        //                 id: matchingImage.id,
        //                 collectionId: matchingImage.collectionId,
        //                 content: matchingImage.content
        //             } : undefined
        //         }
        //     })
        //     sort by Jahr in descending order and then by created in ascending order
        //     .sort((a, b) => b.jahr - a.jahr || a.created - b.created);

        // return { results: resultWithImages, query: query };

    }
};
