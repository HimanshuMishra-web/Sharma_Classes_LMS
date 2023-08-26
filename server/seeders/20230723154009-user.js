'use strict';

const {hash} = require("bcrypt");
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [{
            name: 'Admin',
            email: "admin@gmail.com",
            mobile: "9999999999",
            password: await bcrypt.hash("admin", 10),
            roleId: 1,
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});

    }
};
