import HttpRequester from "./HttpRequester";

class AuthService extends HttpRequester {

    constructor() {
        super();
        this.client   = null;
        this.token    = null;
        this.uid      = null;
    }

    isLoggedIn() {
        return this.client != null && this.token != null && this.uid != null;
    }

    headers() {
        let headers = new Headers({ "Content-Type": "application/json" });
    
        if (this.client && this.token && this.uid) {
            headers.set("client", this.client);
            headers.set("access-token", this.token);
            headers.set("uid", this.uid);
        }

        return headers;
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            this.post("auth/sign_in", {
                email   : email,
                password: password
            }).then(response => {
                this.client   = response.headers.get("client");
                this.token    = response.headers.get("access-token");
                this.uid      = response.headers.get("uid");
                resolve(response);
            }).catch(error => {
                this.loggedIn = false;
                reject(error);
            });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.delete("auth/sign_out")
                .then(response => {
                    this.client = null;
                    this.token = null;
                    this.uid = null;
                    resolve(response);
                }).catch(error => {
                    this.loggedIn = true;
                    reject(error);
                });
        });
    }

    register(email, password, passwordConfirmation) {
        return new Promise((resolve, reject) => {
            this.post("auth", {
                "email": email,
                "password": password,
                "password_confirmation": passwordConfirmation,
                "confirm_success_url": "localhost:3000"
            }).then(response => {
                this.client = response.json.client;
                this.token = response.json["access-token"];
                this.uid = response.json.uid;
                resolve(response);
            }).catch(error => {
                this.client = null;
                this.token = null;
                this.uid = null;
                reject(error);
            });
        });
    }

    updateAuth(client, token, uid) {
        this.client = client;
        this.token = token;
        this.uid = uid;
    }

    validate(client, token, uid) {
        return new Promise((resolve, reject) => {
            this.updateAuth(client, token, uid);
            this.get("auth/validate_token")
                .then(response => {
                    if (response.json.success) {
                        resolve(response);
                    } else {
                        reject(false);
                    }
                }).catch(error => {
                    reject(error);
                });
        });
    }
}

export default AuthService = new AuthService();