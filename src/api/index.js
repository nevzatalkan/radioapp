import axios from 'axios';

import uuidv4 from "uuid/v4";

var SERVER_URL = "http://localhost:8082"

export default class Api {

  static async getAll(parameters, resourceName) {
    const requestUrl = `${SERVER_URL}/${resourceName}/${parameters}`;
    return await axios.get(requestUrl).then(res => res.data);
  }
}
