USE employee_db;

INSERT INTO department
  (dept_name)
VALUES
  ("Executive"),
  ("Engineering"),
  ("Legal"),
  ("Sales"),
  ("Marketing");

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ("Chief Executive Officer", 200000, 1),
  ("Chief Coffee Taster", 1000000, 1),
  ("Coffee Bean Roaster", 120000, 2),
  ("Assistant Barista", 60000, 2),
  ("Custodial", 50000, 3),
  ("Barista", 60000, 3),
  ("Keyholder", 80000, 4),
  ("Sales", 30000, 4),
  ("Marketing", 1000, 5);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ("John", "Smith", 1, NULL),
  ("Jimmy", "Brown", 2, 1 ),
  ("Sponge", "Bobson", 3, 2),
  ("Kelly", "Clarkson", 4, 3),
  ("Led", "Zepplin",  5, 1),
  ("Tom", "Atoman", 6, 5),
  ("Jenny", "Ondablock", 7, 1),
  ("Brett", "Ilikebeer", 8, 7),
  ("Elon", "X-Ae-12", 1, 9);