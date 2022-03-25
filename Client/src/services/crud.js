import getCurrentCookie from "../utils/cookieHelper";

const get = async (url, headers, onSuccess, onFailure) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        if (response.ok) {
            const json = await response.json();

            onSuccess(json);
        } else {
            onFailure();
        }
    } catch (error) {
        onFailure(error);
    }
};

const formInput = async (url, method, headers, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
        });

        const response = await promise.json();

		if (promise.ok) {
			onSuccess(response);
		} else {
			onFailure(response);
		}
    } catch (error) {
        onFailure(error);
    }
};

const remove = async (url, onSuccess, onFailure) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
				"Content-Type": "application/json",
				Authorization: getCurrentCookie(),
			},
        });

		if (response.ok) {
			onSuccess();
		} else {
			onFailure();
		}
    } catch (error) {
        onFailure(error);
    }
};

const obj = {
    get,
    formInput,
    remove,
};

export default obj;