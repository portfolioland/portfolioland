/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {

    image: async ({ request }) => {
        const formData = await request.formData()
        console.log(formData, "🦁🦁🦁🦁🦁🦁");
    }
}