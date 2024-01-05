const inquirer = require("inquirer")
// const mysql = require("mysql")

function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View Employees", 
              "View Roles",
              "View Departments", 
              "Add Employee",
              "Add Role",
              "Add Department",
              "Update Employee"
            ]
    }
]).then((answers) => {
        if("View Employees") {
            viewDepartments()
        } else if ("View Roles") {
            viewRoles()
        } else if ("View Departments") {
            viewDepartments()
        } else if ("Add Employee") {
            addEmployee()
        } else if ("Add Role") {
            addRole()
        } else if ("Add Department") {
            addDepartment()
        } else if ("Update Employee") {
            updateEmployee()
        }
    })
};

function viewEmployees() {
    console.log("view employees")
}

function viewRoles() {
    console.log("view roles")
}

function viewDepartments() {
    console.log("view departments")
}

function selectRole() {
    console.log("select role")
}

function selectManager() {
    console.log("select manager")
}

function addEmployee() {
    console.log("add employee")
}

function addRole() {
    console.log("add role")
}

function addDepartment() {
    console.log("add department")
}

function updateEmployee() {
    console.log("update employee")
}

startPrompt();