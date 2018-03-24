const library = (function () {
    const axios = require('axios');

    const SERVER_PORT = 9002;
    // TODO: update to SSL (domain-based) endpoint.
    const SERVER_URL = `localhost:${SERVER_PORT}`;


    function postRegister() {
        return axios
    }

    function postScheduledText(deviceId,) {

    }


    return {
        SERVER_URL: SERVER_URL,
    }

})();
module.exports = library;