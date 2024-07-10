export const load = ({ locals, params, url }) => {
	if (locals.user) {
		return {
			user: locals.user,
			url: url.pathname,




		};
	}

	return {
		user: undefined,
		url: url.pathname
	};
};