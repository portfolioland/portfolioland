/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    test: async ({ request, locals }) => {
        const formData = await request.formData()

        console.log(formData, "🦁🦁🦁🦁🦁🦁");
    },
}