module.exports = function (status, url) {
    let sendStatus = require('./sendStatus');
        sendStatus(status, url);
}

