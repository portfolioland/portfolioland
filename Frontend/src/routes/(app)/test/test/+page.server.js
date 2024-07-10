import { serversideViewerDataConstructor } from '$lib/components/Profil_Work_SiteBuilder/1_Locator/serversideUtils.js'


export async function load({ params, locals }) {

    // let titlearray = ["Test", "empty", "This is a Test"];
    // let locator = [];

    // for (let i = 0; i < titlearray.length; i++) {
    //     let workName = titlearray[i];


    //     let d = await serversideViewerDataConstructor(workName, locals);
    //     locator.push(d);
    // }

    // console.log(locator);

    // return {locator}
};

export const actions = {

    test: async ({ request, locals }) => {
        const formData = await request.formData()
        const terms = formData.get('test')
        console.log(terms, "🦁🦁🦁🦁🦁🦁");


    }
};