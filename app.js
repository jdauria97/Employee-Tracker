const inquirer = require("inquirer")
const connection = require("./connection")
require("console.table");

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
]).then(res => {
        let choice = res.choice;
        if(choice === "View Employees") {
            viewEmployees()
            console.log(choice)
        } else if (choice === "View Roles") {
            viewRoles()
            console.log(choice)
        } else if (choice === "View Departments") {
            viewDepartments()
            console.log(choice)
        } else if (choice === "Add Employee") {
            addEmployee()
            console.log(choice)
        } else if (choice === "Add Role") {
            addRole()
            console.log(choice)
        } else if (choice === "Add Department") {
            addDepartment()
            console.log(choice)
        } else if (choice === "Update Employee") {
            updateEmployee()
            console.log(choice)
        }
    })
};

function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
};

function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
};

function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
};

var roles = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          roles.push(res[i].title);
        }
      })
      return roles;
};

var managers = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          managers.push(res[i].first_name);
        }
      })
      return managers;
};

function addEmployee() {
    inquirer.prompt([
        {
          name: "First Name",
          type: "input",
          message: "Enter First Name"
        },
        {
          name: "Last Name",
          type: "input",
          message: "Enter Last Name"
        },
        {
          name: "Role",
          type: "list",
          message: "Select Role",
          choices: selectRole()
        },
        {
            name: "Choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
};

function addRole() {
    console.log("add role")
};

function addDepartment() {
    console.log("add department")
};

function updateEmployee() {
    console.log("update employee")
};

startPrompt();