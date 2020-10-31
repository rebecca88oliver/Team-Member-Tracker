
//MySQL, inquirer and Tables
const mysql = require('mysql');
const inquirer = require("inquirer");
const cTable = require('console.table');


//Create a local connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 8080
    port: 8080,

    // Your username
    user: "root",

    // Your password
    password: "surge",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});

function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "View all employees",
            "View all departments",
            "View employee roles",
            "Add an employee",
            "Add a department",
            "Add a role/title",
            "Update an employees role",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View all employees":
                viewEmployees();
                break;

            case "View all departments":
                viewDepartments();
                break;

            case "View employee roles":
                roleView();
                break;


            case "Add an employee":
                addEmployee();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Add a role/title":
                addRole();
                break;

            case "Update an employees role":
                updateEmployeeRole();
                break;

            default:
                connection.end();
                break;
        }
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function roleView() {
    var sqlStr = "SELECT * FROM role";
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
        askQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "What is the employees first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?"
    },
    {
        type: "number",
        name: "roleId",
        message: "What is the employees role ID"
    },
    {
        type: "number",
        name: "managerId",
        message: "What is the employees manager's ID?"
    }
    ]).then(function (res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    },]).then(function (res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}