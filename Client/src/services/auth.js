import routes from "./routes";
import crud from "./crud";

const login = async (body, onSuccess, onFailure) => {
	await authenticate(routes.LOGIN, body, onSuccess, onFailure);
};

const register = async (body, onSuccess, onFailure) => {
	await authenticate(routes.REGISTER, body, onSuccess, onFailure);
};

const authenticate = async (url, body, onSuccess, onFailure) => {
	await crud.formInput(
		url,
		"POST",
		{
			"Content-Type": "application/json",
		},
		body,
		onSuccess,
		onFailure,
	);
};

const getIdentityDetails = async (onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");

		if (
			!cookie ||
			cookie.length < 2 ||
			cookie[0] !== "Bearer" ||
			!cookie[1]
		) {
			return;
		}

		const promise = await fetch(routes.GET_IDENTITY_DETAILS, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie[1]}`,
			},
		});

		const tokenObj = await promise.json();
		if (tokenObj) {
			onSuccess(tokenObj);
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

const authService = {
	login,
	register,
	getIdentityDetails,
};

export default authService;