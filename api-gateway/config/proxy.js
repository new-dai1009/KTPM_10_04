const axios = require('axios');

class Proxy {
  static async forwardRequest(serviceUrl, method, endpoint, data = null) {
    try {
      const url = `${serviceUrl}${endpoint}`;
      const response = await axios({
        method,
        url,
        data,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }
}

module.exports = Proxy;