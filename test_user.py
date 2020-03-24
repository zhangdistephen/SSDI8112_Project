import app as project
import unittest
import json
from flaskext.mysql import MySQL

class UserTestCase(unittest.TestCase):

    def setUp(self):
        mysql = MySQL()
        app = project.app
        app.config['MYSQL_DATABASE_USER'] = 'root'
        app.config['MYSQL_DATABASE_PASSWORD'] = '123456'
        app.config['MYSQL_DATABASE_DB'] = 'test'
        app.config['MYSQL_DATABASE_HOST'] = 'localhost'
        app.debug = False
        mysql.init_app(app)
        db = mysql.connect()
        cursor = mysql.connect().cursor()
        cursor.execute("create table test.user ( user_id bigint not null auto_increment, username varchar(45) null, password varchar(45) null, primary key (user_id));")
        db.commit()
        self.db_fd = db
        project.app.config['TESTING'] = True
        self.app = project.app.test_client()

    def tearDown(self):
        cursor = self.db_fd.cursor()
        cursor.execute("drop table test.user;")
        self.db_fd.commit()

    def create_user(self):
        rv = self.app.post('/api/create_user', json={
            "username": "example",
            "password": "123456"
        })
        json_data = rv.get_json()
        return json_data

    def test_access(self):
        rv = self.app.get('/api')
        self.assertEqual(rv.status_code, 200)

    def test_get_all_users(self):
        rv = self.app.get('/api')
        self.assertIn('items', json.loads(rv.data))

    def test_create_user(self):
        json_data = self.create_user()
        self.assertEqual(json_data["code"], 0)

    def test_create_existing_user(self):
        self.create_user()
        json_data = self.create_user()
        self.assertEqual(json_data["code"], 1)


if __name__ == '__main__':
    unittest.main()