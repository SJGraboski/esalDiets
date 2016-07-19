// bring in axios
var axios = require('axios');

// set up an authentication object
var auth = {

  isAuthenticated () {
    const token = localStorage.getItem('token');
    if(token) {
      return axios.get("/api/session", {headers: {"Authorization": token}});
    } else {
      return new Promise(function(resolve, reject){ reject(); });
    }
  },

  login (email, password, cb) {
    const promise = axios.post("/api/session", {email: email,
                                                password: password});
    this.handleAuth(promise, cb);
  },

  register (email, password, passwordConfirmation, cb) {
    const promise = axios.post("/api/users", {email: email,
                                              password: password,
                                              passwordConfirmation: passwordConfirmation});
    this.handleAuth(promise, cb);
  },

  logout () {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    axios.delete("/api/session", {headers: {"Authorization": token}});
    return true;
  },

  handleAuth (promise, cb) {
    promise.then((resp) => {
      if (resp.data.token) {
        localStorage.setItem('token', resp.data.token);
        cb(true);
      }
    }).catch((error) => cb(false));
  }

}

module.exports = auth;