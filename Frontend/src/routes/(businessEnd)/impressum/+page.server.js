import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    try {
        let impressum = await locals.pb.collection("impressum").getFullList();
        return { impressum };
    } catch (err) {
        console.log('Error: ', err);
        throw error(err.status, "Something went wrong. Try again later.");
    }

};