# SSDI8112_Project

## Requirements
Download [MySQL](https://dev.mysql.com/downloads/mysql/)

Install these Python packages
`pip install flask flask-mysql`



## Sprint 0 
### Spike 1
`hello_world.py` and `test_sample.py` are the sample files showing the environment is set up successfully. 

### Spike 2
`app.py` is the Flask backend code.

`templates` is the html templates used by Flask.

 ## Usage
 Start MySQL service and run
 ```shell script
PATH="$PATH":/usr/local/mysql/bin
mysql -u root -p 
```

Enter password and change that to "123456"

 Create Database and Table in your MySQL
 ```mysql
create database sample;

create table sample.user (
     user_id bigint null auto_increment,
     user_name varchar(45) null,
     age smallint null,
     primary key (user_id));
```

Insert some data into the table
```mysql
insert into sample.user (user_name, age) values ("Bob", 25);
```

Start the Flask server
```shell script
 python app.py
```

Go to http://localhost:5000

Test git.
 
 