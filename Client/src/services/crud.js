const get = async (url, headers, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: "GET",
            headers: headers,
        });

        const response = await promise.json();

        if (response) {
            onSuccess(response);
        } else {
            onFailure();
        }
    } catch (error) {
        onFailure(error);
    }
};

const formPost = async (url, headers, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        });

        const response = await promise.json();

		if (response) {
			onSuccess(response);
		} else {
			onFailure();
		}
    } catch (error) {
        onFailure(error);
    }
};

const remove = async (url, onSuccess, onFailure) => {
    try {
        const cookie = document.cookie.split("=");
        
        const promise = await fetch(url, {
            method: "DELETE",
            headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie[1]}`,
			},
        });

        const response = await promise.json();

		if (response) {
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
    formPost,
    remove,
};

export default obj;