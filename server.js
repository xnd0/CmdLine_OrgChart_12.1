// --------------------- //
// ----- server.js ----- //
// --------------------- //

// const express = require('express');
import express from 'express';
// var inquirer = require('inquirer');
import inquirer from 'inquirer';
// const mysql = require('mysql2');
import mysql from 'mysql2';

// import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const app = express();




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

        ]) .then(choice => {
            if (choice.mainMenu === 'view all departments') {
                console.log('success-departments!');
                viewDepartments();
            } else if (choice.mainMenu === 'view all roles') {
                console.log('success-roles!');
            } else if (choice.mainMenu === 'view all employees') {
                console.log('success-employees');
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
        
        // View Departments choice function
        function viewDepartments() {
            console.log('viewDepartments function works');
        }

};
// ^^ end init() function ^^ //





init();