#spike 4 SD
from flask import Flask
from flask import render_template, g, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:123456@localhost/sample"

db = SQLAlchemy()
db.init_app(app)

User_Movie = db.Table("user_movie",
          db.Column("user_id", db.Integer, db.ForeignKey("user.id"), nullable=False, primary_key=True),
          db.Column("movie_id", db.Integer, db.ForeignKey("movie.id"), nullable=False, primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    balance = db.Column(db.Float, unique=False, nullable=False, default=100)
    movie = db.relationship("Movie", secondary=User_Movie)
    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id":self.id,
            "username":self.username,
            "balance": self.balance
        }

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    img = db.Column(db.String(500), unique=False, nullable=False)
    price = db.Column(db.Float, nullable=False)
    user = db.relationship("User", secondary=User_Movie)

    def __repr__(self):
        return '<Movie %r>' % self.name

    def serialize(self):
        return {
            "id":self.id,
            "name":self.name,
            "desc":self.description,
            "img":self.img,
            "price": self.price
        }

@app.route("/api/upload_movie", methods=['POST'])
def upload_movie():
    data = request.json
    name, desc, img, price = data["name"], data["desc"], data["img"], data["price"]
    movie = Movie(name=name, description=desc, img=img, price=price)
    db.session.add(movie)
    db.session.commit()
    return jsonify({"code": 0, "msg": "success"})

@app.route("/api/get_movies", methods=['GET'])
def get_movies():
    search = request.args.get("search")
    if search:
        movies = Movie.query.filter(Movie.name.like("%{}%".format(search))).all()
    else:
        movies = Movie.query.all()
    movies = list(map(lambda movie:movie.serialize(), movies))
    return jsonify({"code": 0, "msg": "success", "data": movies})

@app.route("/api/rent", methods=['POST'])
def rent():
    data = request.json
    username, movie_id = data["user"], data["movie"]
    user = User.query.filter_by(username=username).first()
    movie = Movie.query.filter_by(id=movie_id).first()
    if movie in user.movie:
        return jsonify({"code":1, "msg":"You've already rent this movie."})
    if user.balance < movie.price:
        return jsonify({"code":1, "msg":"Your balance is insufficient."})
    user.balance -= movie.price
    user.movie.append(movie)
    db.session.commit()
    return jsonify({"code":0, 'balance':user.balance})

@app.route("/api/create_user", methods=['POST'])
def create_user():
    data = request.json
    username, password = data["username"], data["password"]
    exist = User.query.filter_by(username=username).first()
    if exist:
        return jsonify({"code":1, "msg":"username {} already exists".format(username)})
    else:
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify({"code":0, "msg":"success", "user":user.serialize()})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username, password = data["username"], data["password"]
    exist = User.query.filter_by(username=username).first()
    if not exist:
        return jsonify({"code":1, "msg":"username {} is incorrect".format(username)})
    else:
        if exist.password != password:
            return jsonify({"code": 1, "msg": "password is incorrect"})
        return jsonify({"code":0, "msg":"success", "user":exist.serialize()})

@app.route('/api')
def main():
    result = User.query.all()
    return jsonify({"items":list(map(lambda x:x.serialize(), result))})

if __name__ == '__main__':
    app.run()
