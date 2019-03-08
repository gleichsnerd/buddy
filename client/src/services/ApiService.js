import AuthService from "./AuthService";
import HttpRequester from "./HttpRequester";
import CookieService from "./CookieService";

class ApiService extends HttpRequester {

    headers() {
        let headers = new Headers({
            "Content-Type": "application/json"
        });

        if (AuthService.client && AuthService.token && AuthService.uid) {
            headers.set("client", AuthService.client);
            headers.set("access-token", AuthService.token);
            headers.set("uid", AuthService.uid);
        }

        return headers;
    }

    updateAuth(header) {
        let client = header.get("client"),
            token = header.get("auth-token"),
            uid = header.get("uid"),
            expiry = header.get("expiry");

        if(client != null && client !== "" 
            && token != null && token !== "" 
            && uid != null && uid !== "") {

            AuthService.updateAuth(client, token, uid);
            CookieService.updateAuthCookies(client, token, uid, expiry);
        }
    }
}

export default ApiService = new ApiService();