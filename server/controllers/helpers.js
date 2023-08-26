const bcrypt = require("bcryptjs");

async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function success(message = "Success", type="default", data) {
    return {message,type,data}
}

function error(message = "Something Went Wrong", type="default") {
    return {message,type}
}

module.exports = {
    comparePassword,
    error,
    success
}