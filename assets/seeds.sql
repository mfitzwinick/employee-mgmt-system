INSERT INTO department (id, name)
VALUES (1,"sales"), (2, "operations"), (3, "finance"), (4,"distribution");

INSERT INTO role (id, name, salary, department_id)
VALUES (20,"sales",70000,1),
(21,"sales_manager", 80000,1),
(22,"admin_assistant",30000,2),
(23,"ops_lead",45000,2),
(24,"CFO",65000,3),
(25,"accountant",50000,3),
(26,"lift_operator",35000,4),
(27,"truck_driver",40000,4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (100, "Harry", "Styles", 20, 75),
(101, "Selena", "Gomez", 24, 75),
(102, "Taylor", "Swift", 21, 75),
(103, "Ariana", "Grande", 27, 75),
(104, "Dua", "Lipa", 25, 75);


