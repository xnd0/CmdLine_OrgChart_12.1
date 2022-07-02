

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Al", "Bones", 2, null),
	   ("Chris", "Dee", 5, null),
       ("John", "Doe", 1, null),
       ("Mike", "Chan", 2, null),
       ("Ashley", "Rodriguez", 3, null),
       ("Kevin", "Tuppiki", 4, null),
       ("Kunnal", "Singher", 5, null),
       ("Malia", "Brown", 6, null),
       ("Sarah", "Lourd", 7, null),
       ("Tom", "Allen", 8, null),

