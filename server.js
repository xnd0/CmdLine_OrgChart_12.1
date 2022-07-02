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
                addDepartments();
            } else if (choice.mainMenu === 'add a role') {
                console.log('success-add role');
                addRoles();
            } else if (choice.mainMenu === 'add an employee') {
                console.log('success-add an employhee');
                addEmployee();
            } else if (choice.mainMenu === 'update an employee role') {
                console.log('success-add update an employee role');
                updateEmpRole();
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
        const sqlInput = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, department.name AS manager
            FROM employee 
            LEFT JOIN employee manager ON manager.id = employee.manager_id 
            INNER JOIN role ON (role.id = employee.role_id) 
            INNER JOIN department ON (department.id = role.department_id)`
            ;

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
    // addDepartment function - prompt to enter name of the department and it is added to the database
    function addDepartments() {
        console.log('addDepartments function works');

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: '\nPlease enter the name of the department you would like to add:\n',
                    name: 'addDept',
                }
            ]).then(userInput => {
                const sqlInput = `INSERT INTO department (name) VALUES ("${userInput.addDept}");`;

                console.log("input is: " + userInput.addDept);

                db.query(sqlInput, (err, data) => {
                    if (err) {
                        console.log(err);
                    };
                    console.log("Here is the updated department database:")
                    console.table(data);

                    wait(1000);
                    init();
                });
            });
    }
    // addRoles - prompt to enter the name, salary, and department for the role and that role is added to the database
    function addRoles() {
        console.log('addRoles function works');

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Please enter the title of the role you would like to add: ',
                    name: 'roleTitle',
                },
                {
                    type: 'input',
                    message: 'Please enter the salary of the role you would like to add: ',
                    name: 'roleSalary',
                },
                {
                    type: 'input',
                    message: 'Please enter the department_id of the role you would like to add: ',
                    name: 'roleDept',
                },
            ]).then(userInput => {
                const sqlInput = `INSERT INTO role (title, salary, department_id) VALUES ("${userInput.roleTitle}", "${userInput.roleSalary}", "${userInput.roleDept}" );`;

                console.log("inputs are: " + userInput.roleTitle + ", " + userInput.roleSalary + ", " + userInput.roleDept);

                db.query(sqlInput, (err, data) => {
                    if (err) {
                        console.log(err);
                    };
                    console.log("Here is the updated role database:")
                    console.table(data);

                    wait(1000);
                    init();
                });
            });
    }
    // addEmployee => prompts to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    function addEmployee() {
        console.log('addEmployee function works');

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Employee first name? ',
                    name: 'empFirstName',
                },
                {
                    type: 'input',
                    message: 'Employee last name? ',
                    name: 'empLastName',
                },
                {
                    type: 'input',
                    message: 'What is the their role?',
                    name: 'empRole',
                },
                {
                    type: 'input',
                    message: 'Who is their manager?',
                    name: 'empManager',
                },
            ]).then(userInput => {
                const sqlInput = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${userInput.empFirstName}", "${userInput.empLastName}", ${userInput.empRole}, ${userInput.empManager} );`;

                console.log("inputs are: " + userInput.empFirstName + ", " + userInput.empLastName + ", " + userInput.empRole + ", " + userInput.empManager);

                db.query(sqlInput, (err, data) => {
                    if (err) {
                        console.log(err);
                    };
                    console.log("Here is the updated role database:")
                    console.table(data);

                    wait(1000);
                    init();
                });
            });
    }
    // updateEmpRole => prompts to select an employee to update and their new role and this information is updated in the database 
    function updateEmpRole() {
        const sqlInput = `SELECT * FROM employee`;
        console.log("Update Employee's Role:")

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Which Employee would you like to update',
                    name: 'updateEmpName',
                },
                {
                    type: 'input',
                    message: 'What is the their new role?',
                    name: 'updateEmpRole',
                },
            ]).then(userInput => {

                console.log("inputs are: " + userInput.updateEmpName + ", " + userInput.updateEmpRole);

                db.query(sqlInput, (err, data) => {
                    if (err) {
                        console.log(err);
                    };
                    console.log("Here is the updated employee database:")
                    console.table(data);

                    wait(1000);
                    init();
                });
            });


    }





};
// ^^ end init() function ^^ //





init();