/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {

    try {
        // console.log("GET RANDOM WORK")
        const workData = await locals.pb.collection("work").getFullList({
            limit: 1,
            filter: "public = true",
            sort: "@random",
            expand: "artists,tag",
            fields: "id,jahr,title,expand.artists.name,expand.tag.title,created",
        })

        const pictureData = await locals.pb.collection("pictures").getFullList({
            filter: `work="${workData[0].id}"`,
            fields: "work,id,content"
        })

        if (pictureData[0] && pictureData[0].content) {
            workData[0].pictures = pictureData[0]
        }
        else {
            const newWorkData = await locals.pb.collection("work").getFullList({
                limit: 1,
                filter: "public = true",
                sort: "@random",
                expand: "artists,tag",
                fields: "id,jahr,title,expand.artists.name,expand.tag.title,created",
            })
            const newPictureData = await locals.pb.collection("pictures").getFullList({
                filter: `work="${newWorkData[0].id}"`,
                fields: "work,id,content"
            })
            workData[0] = newWorkData[0]
            workData[0].pictures = newPictureData[0]
        }

        return new Response(JSON.stringify(workData[0]), {
            status: 200, headers: {
                'content-type': 'application/json'
            }
        });
    }

    catch (err) {
        return new Response(JSON.stringify(err), { status: 500 });
    }
};
