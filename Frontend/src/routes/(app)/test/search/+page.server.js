
export async function load() {

    return {};
};


export const actions = {
    search: async ({ request, locals }) => {
        const formData = await request.formData();
        const query = formData.get('query');
        const response = await locals.pb.collection('work').getList(1, 10, {
            filter: `title ?~ "${query}"` // Adjust the filter based on your schema
        });
        console.log(response, "🦁🦁🦁🦁🦁🦁");
        if (!query || query == "all") {
            const response = await locals.pb.collection('work').getFullList({
            })
            console.log(response, "🦁🦁🦁🦁🦁🦁");

            return { results: response };
        }

        return { results: response.items };
    }
};


