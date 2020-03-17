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

### Spike 3
#### Mock
If you use python3, just
```python
import unittest.mock as mock
```
you can use mock now.

See `test_sample.py` for more details.

#### Frontend React
If you use mac

1. Use `brew` to install `node`
```shell script
brew install node
``` 

Otherwise, Google "Install node" then follow that instructions.

2. Check whether you successfully install node
```shell script
npm -v
```

3. Change directory to `frontend/movie_renting`
```shell script
cd frontend/movie_renting
```

4. Use `npm` to install all the dependencies.
```shell script
npm install
```
5. Make sure you have run the backend. If you can visit http://localhost:5000, then yes. 
If not, follow these commands to run.
```shell script
cd ../..
python app.py &
cd frontend/movie_renting
```

6. Run your frontend.
```shell script
npm start
```

* Note, I have changed some codes in app.py, so first run `git pull` then do above all steps.

Test2
Test spike 4
## Sprint 1

**Backend:**

We need to initialize a user table, which should have USERNAME and PASSWORD at least.

```mysql
Drop table sample.user;
create table sample.user
(user_id bigint null auto_increment, username varchar(45) null, password varchar(45) null, primary key (user_id));
```

And restful api, which accepts json format data which has "username" and "password", 
then execute a line of sql to check whether the database already has this username, if not, insert this user to our database.
```python
@app.route("/api/create_user", methods=['POST'])
def create_user():
    cursor = g.db.cursor()
    data = request.json
    username, password = data["username"], data["password"]
    cursor.execute("select username from user where username='{}'".format(username))
    exist = cursor.fetchall()
    if exist:
        return jsonify({"code":1, "msg":"username {} already exists".format(username)})
    else:
        cursor.execute("insert into user (username, password) values (%s, %s)", [username, password])
        g.db.commit()
        return jsonify({"code":0, "msg":"success"})
```

Then run the backend.

```shell script
python app.py
```

**Frontend:**

Install 2 packages, react-router-dom and @material-ui/core.
```shell script
cd frontend/movie_renting
npm install
```

Run it

```shell script
npm start
```

For now, I just wrote `App.js index.js User.js`, you can modify these 3 files to learn how it works.