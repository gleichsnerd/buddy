class HttpRequester {

    headers() {
        return {};
    }

    get(endpoint) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(endpoint), {
                method: "GET",
                headers: this.headers()
            }).then(response => {
                return this.errorCheck(response);
            }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    post(endpoint, body) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(endpoint), {
                method: "POST",
                headers: this.headers(),
                body: JSON.stringify(body)
            }).then(response => {
                return this.errorCheck(response);
            }).then(result => {
                this.updateAuth(result.headers);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    delete(endpoint) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(endpoint), {
                method: "DELETE",
                headers: this.headers()
            }).then(response => {
                return this.errorCheck(response);
            }).then(result => {
                this.updateAuth(result.headers);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    errorCheck(response) {
        return new Promise((resolve, reject) => {
            response.json().then(json => {
                if (json && json.errors && json.errors.length > 0) {
                    reject(json.errors);
                }
                resolve({
                    headers: response.headers,
                    json: json
                });
            }).catch(error => {
                reject(error);
            });
        });
    }

    updateAuth() { /*noop*/}
}

export default HttpRequester;