import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    try {
        let terms = await locals.pb.collection("terms").getFullList();
        return { terms };
    } catch (err) {
        console.log('Error: ', err);
        throw error(err.status, "Something went wrong. Try again later.");
    }
};

export const actions = {
    terms: async ({ request, locals }) => {
        try {
            const id = locals.pb.authStore.model.id

            const date = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
            const data = {
                "terms": true,
                "termsAcepted": date,
            };

            console.log(data, "🦁🦁🦁🦁🦁🦁");

            try {
                /** !We need to get the locals instance of pb to populate the Data through */
                const record = await locals.pb.collection('users').update(id, data);

            } catch (err) {
                console.log('Error from update terms: ', err);
                error(err.status, err.message);

            }


        } catch (err) {
            console.log('Error: ', err);
            throw error(err.status, err.message);
        }
        throw redirect(302, '/profil/' + locals.pb.authStore.model.username);

    },

}