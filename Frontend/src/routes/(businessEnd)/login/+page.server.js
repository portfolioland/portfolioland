import { error, fail, redirect } from '@sveltejs/kit';

/**
 * The actions object contains a default action for the login page.
 *
 * @property {Object} actions - The actions object.
 * @property {Object} actions.default - The default action.
 * @property {Function} actions.default.async - The async function that handles the request.
 * @param {Object} context - The context object.
 * @param {Request} context.request - The request object.
 * @param {Object} context.locals - The locals object.
 * @throws {Error} If an error occurs during the action.
 * @returns {Promise} A promise that resolves to a redirect or failure response.
 */
export const actions = {
    /**
     * The default action for the login page.
     *
     * @async
     * @param {Object} context - The context object.
     * @param {Request} context.request - The request object.
     * @param {Object} context.locals - The locals object.
     * @throws {Error} If an error occurs during the action.
     * @returns {Promise} A promise that resolves to a redirect or failure response.
     */
    default: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());
        let email = body.email;

        try {
            await locals.pb.collection('users').authWithPassword(body.email, body.password);

        } catch (err) {
            if (!body.email) {
                return fail(400, { email, missing: true });
            }

            if (!body.password) {
                return fail(400, { email, incorrect: true });
            }

            if (!locals.pb?.authStore?.model?.verified) {
                return fail(400, { email, invalid: true });
            }

            console.log('Error: ', err);
            error(500, 'Something went wrong logging in');
        }

        redirect(303, `/profil/${locals.pb.authStore.model.name}`);
    },
};

