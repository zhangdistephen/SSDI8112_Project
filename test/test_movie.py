import app as project
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from init_db import init_db
class MovieTestCase(unittest.TestCase):

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

    def test_get_movies(self):
        json_data = self.app.get("/api/get_movies").get_json()
        self.assertEqual(json_data["code"], 0)

    def test_upload(self):
        json_data = self.app.post("/api/upload_movie", json={
            "name":"1",
            "desc":"1",
            "img":"1",
            "price":1
        }).get_json()
        self.assertEqual(json_data["code"], 0)

    def test_rent(self):
        self.create_user()
        json_data = self.app.post("/api/rent", json={
            "user":"example",
            "movie":1
        }).get_json()
        self.assertEqual(json_data["code"], 0)




if __name__ == '__main__':
    unittest.main()