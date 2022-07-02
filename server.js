// --------------------- //
// ----- server.js ----- //
// --------------------- //


import express from 'express';

import inquirer from 'inquirer';

import mysql from 'mysql2';

import consoleTable from 'console.table';

// import sequelize from 'sequelize';
// import {sequelize} from '../config/connection.js';
// import connection from '../CmdLine_OrgChart_12.1/config/connection.js';

// const PORT = process.env.PORT || 3001;
const app = express();

// const db = mysql.createConnection(
//     {
//         host: "localhost",
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     },
//     console.log(`connected to the databse`)
// );
// console.log(db);


const db = mysql.createConnection({
    host: 'localhost',
    // MySQL info,
    user: 'root',
    password: 'potato22',
    database: 'user_db'
})

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


function init() {
    // Need the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    inquirer
        .prompt([
            {
                type: 'list',
                message: '\nWelcome to the Main Menu. \nPlease make a choice to continue:',
                name: 'mainMenu',
                choices: [
                    'view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                ],
            },

        ]).then(choice => {
            if (choice.mainMenu === 'view all departments') {
                console.log('success-departments!');
                viewDepartments();
            } else if (choice.mainMenu === 'view all roles') {
                console.log('success-roles!');
                viewRoles();
            } else if (choice.mainMenu === 'view all employees') {
                console.log('success-employees');
                viewEmployees();
            } else if (choice.mainMenu === 'add a department') {
                console.log('success-add Department');
            } else if (choice.mainMenu === 'add a role') {
                console.log('success-add role');
            } else if (choice.mainMenu === 'add an employee') {
                console.log('success-add an employhee');
            } else if (choice.mainMenu === 'update an employee role') {
                console.log('success-add update an employee role');
            }

        });

    // formatted table showing department names and department ids
    function viewDepartments() {
        const sqlInput = `SELECT * FROM department`;

        db.query(sqlInput, (err, data) => {
            if (err) {
                console.log(err);
            };
            console.log("All Departments:")
            console.table(data);

            wait(1000);
            init();
        });
    }
    // display the job title, role id, the department that role belongs to, and the salary for that role    
    function viewRoles() {
        console.log('viewRoles function works');
        // const sqlInput = `SELECT * FROM role`;
        const sqlInput = `
            SELECT role.id, role.title, department.name, role.salary
            FROM role, department
            WHERE role.department_id = department.id;`
            ;

        db.query(sqlInput, (err, data) => {
            if (err) {
                console.log(err);
            };
            console.log("The Roles:")
            console.table(data);

            wait(1000);
            init();
        });
    }
    // display employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to    
    function viewEmployees() {
        console.log('viewEmployees function works');
        // const sqlInput = `SELECT * FROM employee`;
        const sqlInput = `SELECT * FROM employee`;

        db.query(sqlInput, (err, data) => {
            if (err) {
                console.log(err);
            };
            console.log("View All Employees:")
            console.table(data);

            wait(1000);
            init();
        });
    }
};
// ^^ end init() function ^^ //





init();