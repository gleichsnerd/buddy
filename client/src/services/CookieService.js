class CookieService {

    constructor() {
        this.cookies = null;
    }

    setCookieCollection(cookies) {
        this.cookies = cookies;
    }

    updateAuthCookies(client, token, uid, expiry) {
        let expireDate = new Date(parseInt(expiry, 10) * 1000);

        this.cookies.set("client", client, { expires: expireDate });
        this.cookies.set("token", token, { expires: expireDate });
        this.cookies.set("uid", uid, { expires: expireDate });
    }

    clearAuthCookies() {
        this.cookies.remove("client");
        this.cookies.remove("token");
        this.cookies.remove("uid");
    }

}

export default CookieService = new CookieService();