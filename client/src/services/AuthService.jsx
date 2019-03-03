import ApiService from './ApiService'

class AuthService {

  constructor() {
    this.client   = null;
    this.token    = null;
    this.uid      = null;
  }

  isLoggedIn() {
    return this.client != null && this.token != null && this.uid != null;
  }

  headers(otherHeaders = {}) {
    let headers = { 'Content-Type': 'application/json' };
    return new Headers(Object.assign(headers, otherHeaders));
  }

  body(bodyObj = {}) {
    return JSON.stringify(bodyObj);
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/sign_in", {
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
      ApiService.delete("auth/sign_out")
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
      ApiService.post("auth", {
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

  validate(client, token, uid) {
    return new Promise((resolve, reject) => {
      ApiService.updateAuth({
        'client': client,
        'access-token': token,
        'uid': uid
      });
      ApiService.get("auth/validate_token")
      .then(response => {
        if (response.json.success) {
          resolve(true);
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