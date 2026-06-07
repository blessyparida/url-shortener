const { nanoid } = require("nanoid");

function generateCode() {
    return nanoid(6);
}

module.exports = generateCode;