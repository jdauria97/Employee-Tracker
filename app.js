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

function selectRole() {
    console.log("select role")
};

function selectManager() {
    console.log("select manager")
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