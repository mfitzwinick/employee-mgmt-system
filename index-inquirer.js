//set up and connection//
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeetracker_db"
});
connection.connect(function (err) {
  if (err) throw err;
  start();
});
// introductory promt//
function start() {
  inquirer
    .prompt({
      name: "drm",
      type: "list",
      message: "Would like to access [DEPARTMENT], [ROLE],or [EMPLOYEE]?",
      choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"]
    })
    .then(function (answer) {
      // based on the answer,access dept, role, employee or exit//
      if (answer.drm === "DEPARTMENT") {
        accessDepartment();
      }
      else if (answer.drm === "ROLE") {
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
//Employee Functions//
function accessEmployee() {
  inquirer
    .prompt({
      name: "employee",
      type: "list",
      message: "Would you like to [ADD], [UPDATE],[VIEW] or [DELETE] an employee?",
      choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
    })
    .then(function (answer) {
      if (answer.employee === "ADD") {
        addEmployee();
      }
      else if (answer.employee === "UPDATE") {
        updateEmployee();
      }
      else if (answer.employee === "VIEW") {
        viewEmployee();
      }
      else if (answer.employee === "DELETE") {
        deleteEmployee();
      }
      else if (answer.employee === "EXIT") {
        connection.end();
      }
    });
}
//Department Functions//
function accessDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Would you like to [ADD], [UPDATE],[VIEW] or [DELETE] a department?",
      choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
    })
    .then(function (answer) {
      if (answer.department === "ADD") {
        addDepartment();
      }
      else if (answer.department === "UPDATE") {
        updateDepartment();
      }
      else if (answer.department === "VIEW") {
        viewDepartment();
      }
      else if (answer.employee === "DELETE") {
        deleteDepartment();
      }
      else if (answer.employee === "EXIT") {
        connection.end();
      }
    });
}
//Role functions//
function accessRole() {
  inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "Would you like to [ADD], [UPDATE],[VIEW] or [DELETE] a role?",
      choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"]
    })
    .then(function (answer) {
      if (answer.role === "ADD") {
        addRole();
      }
      else if (answer.role === "UPDATE") {
        updateRole();
      }
      else if (answer.role === "VIEW") {
        viewRole();
      }
      else if (answer.role === "DELETE") {
        deleteRole();
      }
      else if (answer.role === "EXIT") {
        connection.end();
      }
    });
}
//Add,Update,Delete,View Employee//
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "number",
        message: "What is the employee number?"
      },
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role_id",
        type: "number",
        message: "What is the employee role id number?"
      },
      {
        name: "manager_id",
        type: "number",
        message: "What the employee's manager id number?"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employeetracker_db.employee SET ?",
        {
          id: answer.id,
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was added successfully!");
          start();
        }
      );
    });
}
function updateEmployee() {
  connection.query("SELECT * FROM employeetracker_db.employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "employeechoice",
          type: "number",
          message: "What is the id of the employee you'd like to update?"
        },
        {
          name: "newRole",
          type: "number",
          message: "What is the new role id of the employee you'd like to update?"
        }
      ])
      .then(function (answer) {
        connection.query("UPDATE employeetracker_db.employee SET role_id=? WHERE id=?", [answer.newRole, answer.employeechoice], function (err, results) {
          if (err) throw err;
          console.table(results);
          console.log("Updating employee file...\n");
        });}
      )
    })
}
function deleteEmployee() {
  connection.query("SELECT * FROM employeetracker_db.employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "employeeremove",
          type: "number",
          message: "What is the id of the employee you'd like to delete?"
        }
      ])
      .then(function (answer) {
        connection.query("DELETE FROM employeetracker_db.employee WHERE id='?'", [answer.employeeremove], function (err, results) {
          if (err) throw err;
          console.log(res.affectedRows + " -- employee deleted!\n");
        });}
      )
    })
  }
function viewEmployee() {
  console.log("Viewing all employees...\n");
  connection.query("SELECT * FROM employeetracker_db.employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}

//Add,Update,Delete,View Department//
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "deptId",
        type: "number",
        message: "What is the department id?"
      },
      {
        name: "deptName",
        type: "input",
        message: "What is the name of the department?"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employeetracker_db.department SET ?",
        {
          id: answer.deptId,
          name: answer.deptName,
        },
        function (err) {
          if (err) throw err;
          console.log("The department was added successfully!");
          start();
        }
      );
    });

}
function updateDepartment() {
  connection.query("SELECT * FROM employeetracker_db.department", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "departmentchoice",
          type: "number",
          message: "What is the id of the department you'd like to update?"
        },
        {
          name: "newDeptName",
          type: "input",
          message: "What is the new name of the department you'd like to update?"
        }
      ])
      .then(function (answer) {
        connection.query("UPDATE employeetracker_db.department SET name=? WHERE id=?", [answer.newDeptName, answer.departmentchoice], function (err, results) {
          if (err) throw err;
          console.log("Updating department name...\n");
          console.table(results);
        });}
      )
    })
}
function deleteDepartment() {
  connection.query("SELECT * FROM employeetracker_db.department", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "departmentremove",
          type: "number",
          message: "What is the id of the department you'd like to remove?"
        }
      ])
      .then(function (answer) {
        connection.query("DELETE FROM employeetracker_db.department WHERE id=?", [answer.departmentremove], function (err, results) {
          if (err) throw err;
          console.log(res.affectedRows + " -- Department deleted!\n");
        });}
      )
    })
  }
function viewDepartment() {
  console.log("Viewing all departments...\n");
  connection.query("SELECT * FROM employeetracker_db.department", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}

//Add,Update,Delete,View Role//
function addRole() {
  inquirer
    .prompt([
      {
        name: "roleId",
        type: "number",
        message: "What is the role id?"
      },
      {
        name: "roleName",
        type: "input",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary amount (use numbers only)?"
      },
      {
        name: "department_id",
        type: "number",
        message: "What is the department id number for this role?"
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employeetracker_db.role SET ?",
        {
          id: answer.roleId,
          name: answer.roleName,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("The new role was added successfully!");
          start();
        }
      );
    });
}
function updateRole() {
  connection.query("SELECT * FROM employeetracker_db.role", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "rolechoice",
          type: "number",
          message: "What is the id of the role you would like to update?"
        },
        {
          name: "newSalary",
          type: "number",
          message: "What is the updated salary for this role?"
        }
      ])
      .then(function (answer) {
        connection.query("UPDATE employeetracker_db.role SET salary=? WHERE id=?", [answer.newSalary, answer.rolechoice], function (err, results) {
          if (err) throw err;
          console.log("Updating salary...\n");
          console.table(results);
        });}
      )
    })
}
function deleteRole() {
  connection.query("SELECT * FROM employeetracker_db.role", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "roleremove",
          type: "number",
          message: "What is the id of the role you'd like to delete?"
        }
      ])
      .then(function (answer) {
        connection.query("DELETE FROM employeetracker_db.role WHERE id=?", [answer.roleremove], function (err, results) {
          if (err) throw err;
          console.log(res.affectedRows + " -- role deleted!\n");
        });}
      )
    })
  }
function viewRole() {
  console.log("Viewing all roles...\n");
  connection.query("SELECT * FROM employeetracker_db.role", function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  })
};

