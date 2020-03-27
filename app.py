#spike 4 SD
from flask import Flask
from flaskext.mysql import MySQL
from flask import render_template, g, jsonify, request
app = Flask(__name__)
app.debug = True

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '123456'
app.config['MYSQL_DATABASE_DB'] = 'sample'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.before_request
def before():
    g.db = mysql.connect()

@app.after_request
def after(response):
    g.db.close()
    return response

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

@app.route("/api/login", methods=["POST"])
def login():
    cursor = g.db.cursor()
    data = request.json
    username, password = data["username"], data["password"]
    cursor.execute("select username from user where username='{}'".format(username))
    exist = cursor.fetchall()
    if not exist:
        return jsonify({"code":1, "msg":"username {} is incorrect".format(username)})
    else:
        user = data["username"]
        return jsonify({"code":0, "msg":"success", "user":user})

@app.route('/api')
def main():
    cursor = g.db.cursor()
    cursor.execute("select * from user")
    result = cursor.fetchall()
    return jsonify({"items":result})

if __name__ == '__main__':
    app.run()
