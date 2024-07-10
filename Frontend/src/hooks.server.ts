import PocketBase from 'pocketbase';
import { serializeNonPOJOS } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

import { PB_URL } from '$env/static/private';


export const handle = async ({ event, resolve }) => {

    event.locals.pb = new PocketBase(PB_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOS(event.locals.pb.authStore.model);
    } else {
        event.locals.user = undefined;
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

    //* CHECK IF COOKIE IS SET AND IF NOT REDIRECT TO STARTPAGE *

    if (!event.locals.pb.authStore.isValid) {
        if (event.url.pathname.startsWith('/profil')) {
            redirect(303, '/');

        }
        if (event.url.pathname.startsWith('/terms')) {
            redirect(303, '/');
        }
    }



    // * SECURE PROFILPAGE IF TERMS AND CONDITIONS ARE NOT ACCEPTED 

    if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model.terms === false) {
        if (event.url.pathname.startsWith('/profil')) {
            redirect(302, '/terms');
        }
    }
    else if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model.terms === true) {
        if (event.url.pathname === "/profil") {
            redirect(302, `/profil/${event.locals.pb.authStore.model.name}`);
        }
        // if (event.url.pathname.startsWith('/terms')) {
        //     redirect(303, '/profil/' + event.locals.pb.authStore.model.name);
        // }
    }

    //* CHECK IF TERMS AND CONDITIONS ARE ACCEPTED and IF THERE IS A NEW VERSION OF TERMS

    if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model.terms === true) {
        let termsDate = await event.locals.pb.collection('terms').getFullList({ fields: "updated" });
        let newTermsdate = new Date(termsDate[0].updated);
        let acceptedDate = new Date(event.locals.pb.authStore.model.termsAcepted)

        if (acceptedDate < newTermsdate) {
            try {
                await event.locals.pb.collection('users').update(event.locals.pb.authStore.model.id, {
                    "terms": false,
                })
                redirect(302, '/terms');
            } catch (err) {
                console.log('Error from update terms: ', err);
            }
        } else if (acceptedDate > newTermsdate && event.url.pathname.startsWith('/terms')) {
            redirect(302, '/profil/' + event.locals.pb.authStore.model.name);

        }
    }
    return response;
};