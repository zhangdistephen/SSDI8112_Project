from flask import Flask
from flaskext.mysql import MySQL
from flask import render_template, g
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

# @app.route('/login')
# def login():
#     return render_template("login.html")
@app.route('/')
def main():
    cursor = g.db.cursor()
    cursor.execute("select * from user")
    result = cursor.fetchall()
    return render_template("index.html", result=result)

if __name__ == '__main__':
    app.run()