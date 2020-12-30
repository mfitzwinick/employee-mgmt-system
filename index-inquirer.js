var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeetracker_DB"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
// run the start function//
    start();
  });
// function which prompts the user for what action they should take//
function start() {
    inquirer
    .prompt({
      name: "drm",
      type: "list",
      message: "Would like to access [DEPARTMENT], [ROLE],or [EMPLOYEE]?",
      choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
    })
    .then(function(answer) {
 // based on their answer, either call dept, role or employee
 if (answer.drm === "DEPARTMENT") {
    accessDepartment();
  }
  else if(answer.drm === "ROLE") {
    accessRole();
  }
    else if (answer.drm === "EMPLOYEE") {
    accessEmployee();
  }
    else if (answer.drm === "EXIT") {
    connection.end();
  }
});
}

function accessEmployee() {
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Would you like to [ADD], [UPDATE],[VIEW] or [DELETE] an employee?",
        choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
      })
      .then(function(answer) {
        if (answer.employee === "ADD") {
            addEmployee();
        }
        else if(answer.employee === "UPDATE") {
            updateEmployee();
        } 
        else if(answer.employee === "VIEW") {
            viewEmployee();
        }
        else if(answer.employee === "DELETE") {
            deleteEmployee();
        }
        else if(answer.employee === "EXIT") {
            connection.end();
        }
      });
  }
  function accessDepartment() {
    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Would you like to [ADD], [UPDATE],[VIEW] or [DELETE] a department?",
        choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
      })
      .then(function(answer) {
        if (answer.department === "ADD") {
            addDepartment();
        }
        else if(answer.department === "UPDATE") {
            updateDepartment();
        } 
        else if(answer.department === "VIEW") {
            viewDepartment();
        }
        else if(answer.employee === "DELETE") {
            deleteDepartment();
        }
        else if(answer.employee === "EXIT") {
          connection.end();
        }
      });
    }
    function accessRole() {
        inquirer
          .prompt({
            name: "role",
            type: "list",
            message: "Would you like to [ADD], [UPDATE],[VIEW] or [DELETE] a role?",
            choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
          })
          .then(function(answer) {
            if (answer.role === "ADD") {
                addRole();
            }
            else if(answer.role === "UPDATE") {
                updateRole();
            } 
            else if(answer.role === "VIEW") {
                viewRole();
            }
            else if(answer.role === "DELETE") {
                deleteRole();
            }
            else if(answer.role === "EXIT") {
              connection.end();
            }
          });
        }

        function addEmployee() {
            inquirer
            .prompt ([
                {
                    name: "id",
                    type: "number",
                    message: "What the employee number?"
                },
                {
                    name:"firstname",
                    type: "input",
                    message:"What is the employee's first name?"
                },
                {
                    name:"lastname",
                    type: "input",
                    message:"What is the employee's last name?"
                },
                {
                    name: "role-id",
                    type: "number",
                    message: "What is the employee role id number?"
                },
                {
                    name: "manager-id",
                    type: "number",
                    message: "What the employee's manager id number?"
                }
            ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            id: answer.id,
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.role-id,
            manager_id: answer.manager-id
          },
          function(err) {
            if (err) throw err;
            console.log("Your employee was added successfully!");
            start();
          }
        );
      });
      function updateEmployee() {
            connection.query("SELECT * FROM employee", function(err, results) {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    name: "choice",
                    type: "rawlist",
                    choices: function() {
                      var choiceArray = [];
                      for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].lastname);
                      }
                      return choiceArray;
                    },
                    message: "What is the last name of the employee you'd like to update?"
                  },
                  {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                  }
                ])
                .then(function(answer) {
                  // get the information of the chosen item
                  var chosenEmployee;
                  for (var i = 0; i < results.length; i++) {
                    if (results[i].lastname === answer.lastname) {
                      chosenEmployee = results[i];
                    }
                  }
        console.log("Updating employee file...\n");
        var query = connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              lastname: answer.lastname
            },
          
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee updated!\n");
          }
        );
      
        // logs the actual query being run
        console.log(query.sql);
      }
      
      function deleteEmployee() {
        console.log("Deleting employee...\n");
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            lastname: answer.lastname
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee deleted!\n");
          }
        );
      }
      
      function viewEmployee() {
        console.log("Viewing all employees...\n");
        connection.query("SELECT * FROM employee", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(res);
          connection.end();
        });
  

//-------------------------------------------------------------//
        
  