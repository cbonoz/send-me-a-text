const library = (function () {
    const axios = require('axios');

    const SERVER_PORT = 9002;
    // TODO: update to SSL (domain-based) endpoint.
    const SERVER_URL = `localhost:${SERVER_PORT}`;


    function postRegister(deviceId, phone) {
        // TODO: implement
    }

    function postScheduledText(deviceId, phone, message, when) {
        // TODO: implement.
    }

    return {
        SERVER_URL: SERVER_URL,
        postRegister: postRegister,
        postScheduledText: postScheduledText,
    }

})();
module.exports = library;