create table university (
name varchar(128)
);

COPY name(name) 
FROM './university.csv' DELIMITER ',' CSV HEADER;