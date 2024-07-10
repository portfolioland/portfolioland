import { REGISTERPW } from '$env/static/private';
import { redirect, error } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export async function load() {

};

export const actions = {

    register: async ({ request, locals }) => {
        const formData = await request.formData();

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');
        const name = formData.get('name');
        const pronomen = formData.get('pronomen');
        const website = formData.get('website');
        const klasse = formData.get('klasse');
        const terms = formData.get('terms');
        const insta = formData.get('insta');
        const artist = formData.get('artist');
        const registerPassword = formData.get('registerPassword');

        console.log(username, "username ")
        // example create data
        const data = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "name": username || undefined,
            "pronomen": pronomen || undefined,
            "website": website || undefined,
            // "klasse": [
            //     "RELATION_RECORD_ID"
            // ],
            "terms": false,
            "insta": insta || undefined,
            //"artist": "RELATION_RECORD_ID"
        };

        //TODO: Add terms and artist!!!

        if (password !== passwordConfirm) {
            return {
                data: data,
                error: 'passwords do not match'
            }
        }

        if (password?.length < 8) {
            return {
                data: data,
                error: `password must be at least 8 characters long`
            }
        }

        if (registerPassword !== REGISTERPW) {
            return {
                data: data,
                error: 'You entered the wrong code'
            }
        }
        // if (!terms) {
        //     return {
        //         data: data,
        //         error: 'terms not accepted'
        //     }
        // }






        try {

            let usernamePromise = locals.pb.collection("users").getFirstListItem(`username="${username}"`);
            let emailPromise = locals.pb.collection("users").getFirstListItem(`email="${email}"`);

            let [usernameRecord, emailRecord] = await Promise.allSettled([usernamePromise, emailPromise]);

            if (usernameRecord.status === "fulfilled" && usernameRecord.value || emailRecord.status === "fulfilled" && emailRecord.value) {
                return {
                    data: data,
                    error: "User already exists or email already in use"
                }
            } else {
                throw error(400, "Account needs to be created");
            }
        } catch (error) {

            if (password === passwordConfirm &&
                password?.length >= 8 &&
                registerPassword === REGISTERPW) {

                let artistsData = {
                    "name": username,
                    "username": username,
                }
                console.log(artistsData, "🦁🦁🦁🦁🦁🦁");

                const artist = await locals.pb.collection('artists').create(artistsData);
                data.artist = artist.id;
                console.log(artist, "🦁🦁🦁🦁🦁🦁");

                if (data.artist) {

                    let record = await locals.pb.collection('users').create(data);

                    let record2 = await locals.pb.collection('users').authWithPassword(data.email, data.password);
                    console.log(record, "created user");
                    console.log(record2, "authed user");

                    throw redirect(303, `/profil/${username}`);
                }

            }

        }


    }
};
