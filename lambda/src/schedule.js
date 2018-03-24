const library = (function () {
    const axios = require('axios');
    const api = require('./api');

    // const BASE_URL = "";
    const BASE_URL = "https://api.wolframalpha.com/v2";
    const DOCTOR_URL = "https://api.betterdoctor.com";
    const LIMIT = 3;

    const getRandom = (items) => {
        return items[Math.floor(Math.random() * items.length)];
    };

    const formatDateTimeMs = (timeMs) => {
        const date = new Date(timeMs);
        return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    };

    return {
        getRandom: getRandom,
        formatDateTimeMs: formatDateTimeMs
    }

})();
module.exports = library;