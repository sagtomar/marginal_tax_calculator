const axios = require("axios");
const { baseURL } = require("../config");

/**
 * @description Axios instance to use for connecting to remote API routes on the basis of baseURL
 */
const instance = axios.create({
  baseURL,
});

module.exports = { instance };
