export async function load({ params, locals }) {
    try {

        let tag = params.tag;
        console.log(tag, "TAG PARAMS");

        let tagData = await locals.pb.collection("tags").getFullList({
            filter: `title="${tag}"`, fields: "id,title"
        });

        let workData = await locals.pb.collection("work").getFullList({
            expand: "artists,tag,image", fields: "title,tag,jahr,expand.artists.name,expand.tag.title,id",
        });


        workData = workData.filter(entry => entry.tag.includes(tagData[0].id));



        console.log(workData, "WORKDATA");
        return { work: workData, tag: tagData[0] };

    } catch (error) {
        // Handle any unhandled exceptions
        console.error(error);
        // You can log the stack trace here
        // For example, console.error(error.stack);
        // Or you can rethrow the error to be handled by the caller
        throw error;
    }
}
