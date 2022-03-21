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
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
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

const remove = async (url, onSuccess, onFailure) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
				"Content-Type": "application/json",
				Authorization: document.cookie.replace("=", " "),
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