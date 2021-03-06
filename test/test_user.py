import app as project
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from init_db import init_db
class UserTestCase(unittest.TestCase):

    def setUp(self):
        app = project.app
        app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:123456@localhost/test"
        app.debug = False
        db = SQLAlchemy()
        db.init_app(app)
        with app.app_context():
            init_db()
        self.db_fd = db
        project.app.config['TESTING'] = True
        self.app = project.app.test_client()
        self.server = app

    def tearDown(self):
        with self.server.app_context():
            self.db_fd.drop_all()

    def create_user(self):
        rv = self.app.post('/api/create_user', json={
            "username": "example",
            "password": "123456"
        })
        json_data = rv.get_json()
        return json_data

    def login(self):
        rv = self.app.post('/api/login', json={
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

    def test_login(self):
        self.create_user()
        json_data = self.login()
        self.assertEqual(json_data["code"], 0)

    def test_create_existing_user(self):
        self.create_user()
        json_data = self.create_user()
        self.assertEqual(json_data["code"], 1)


if __name__ == '__main__':
    unittest.main()