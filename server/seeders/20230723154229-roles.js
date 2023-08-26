'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [{
            name: 'Admin',
            description: "Role For Administrator"
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};
