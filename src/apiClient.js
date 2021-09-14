import axios from "axios";
const url = "http://localhost:3002/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider
    this.logoutHandler = logoutHandler
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider()
      },
      data,
    }).catch((error) => {
      if(error.response.status === 403) {
        this.logoutHandler()
        return Promise.reject()
      } else {
        throw error;
      }  
    });
  }

  getEvents() {
    return this.apiCall("get", url);
  }

  addEvent(name, location, information, date, time) {
    return this.apiCall("post", url, { name, location, information, date, time });
  }

  removeEvent(id) {
    return this.apiCall("delete", `${url}${id}`);
  }

  updateEvent(id, name, location, information, date, time) {
    return this.apiCall("put", `${url}${id}`, { name, location, information, date, time });
  }

  async login(username, password) {
    return await axios({
      method: 'post',
      url: `${url}auth`,
      data: {
        username,
        password,
      }
    })
  }

}
