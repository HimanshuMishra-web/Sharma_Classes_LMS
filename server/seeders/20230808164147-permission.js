'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('permissions', [
            {
                name: 'Create User',
                code: "CREATE_USER"
            }, {
                name: 'View User',
                code: "VIEW_USER"
            }, {
                name: 'Update User',
                code: "UPDATE_USER"
            }, {
                name: 'Delete User',
                code: "DELETE_USER"
            },
        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('permissions', null, {});

    }
};
