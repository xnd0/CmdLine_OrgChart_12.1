// --------------------- //
// ----- server.js ----- //
// --------------------- //

// const express = require('express');
import express from 'express';
// var inquirer = require('inquirer');
import inquirer from 'inquirer';
// const mysql = require('mysql2');
import mysql from 'mysql2';

const PORT = process.env.PORT || 3001;
const app = express();




function init() {
    // Need the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Welcome to the main menu.',
                name: 'mainmenu',
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

            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
            },
            {
                type: 'checkbox',
                message: 'What languages do you know?',
                name: 'stack',
                choices: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
            },

        ])
        .then((data) => {
            const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

            fs.writeFile(filename, generateHTML(data), (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        });

}
// ^^ end init() function ^^ //





init();