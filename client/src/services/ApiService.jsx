class ApiService {

  constructor() {
    this.client = null;
    this.token  = null;
    this.uid    = null;
  }

  setLoggedInChecker(loggedInChecker) {
    this.isLoggedIn = loggedInChecker;
  }

  headers() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    if(this.client && this.token && this.uid) {
      headers.set('client', this.client);
      headers.set('access-token', this.token);
      headers.set('uid', this.uid);
    }

    return headers;
  }

  get(endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(encodeURI(endpoint), {
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
      window.fetch(encodeURI(endpoint), {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify(body)
      }).then(response => {
        return this.errorCheck(response);
      }).then(result => {
        // this.updateAuth(result.headers);
        resolve(result);
      }).catch(error => {
        reject(error)
      });
    });
  }

  delete(endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(encodeURI(endpoint), {
        method: "DELETE",
        headers: this.headers()
      }).then(response => {
        return this.errorCheck(response);
      }).then(result => {
        // this.updateAuth(result.headers);
        resolve(result);
      }).catch(error => {
        reject(error)
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

  updateAuth(header) {
    let client = header.get("client"),
        token = header.get("auth-token"),
        uid = header.get("uid");

    if(client != null && client !== "" 
      && token != null && token !== "" 
      && uid != null && uid !== "") {
      console.log("Updating auth");
      this.client = client;
      this.token = token;
      this.uid = uid;

      // this.onAuthUpdate(client, token, uid, header.get("expiry"))
    }
  }
}

export default ApiService = new ApiService();