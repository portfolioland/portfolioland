/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, locals }) {
    console.log(locals);
    try {
        const res = await fetch("/api/getRandomWork");
        const data = await res.json();
        return { data };
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        })
    }
};