CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    skill VARCHAR(255) NOT NULL
);

-- Sample data
INSERT INTO employees (name, position) VALUES 
('John Doe', 'Software Engineer'),
('Keagan Bester', 'Software Lead'),
('Kyle Oosthuizen', 'Database Administrator'),
('Wayne Scott', 'Angular Architect');

INSERT INTO skills (employee_id, skill) VALUES 
(1, 'JavaScript'),
(1, 'React'),
(2, 'Project Management'),
(2, 'Agile Methodologies'),
(3, 'SQL'),
(3, 'PostgreSQL'),
(4, 'HTML'),
(4, 'CSS');