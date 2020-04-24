from app import db, Movie, User
from flask.cli import with_appcontext
import click
import pandas as pd
import sys
import os

dirname = os.path.dirname(__file__)

def process_csv(filename="fake_data.csv"):
    df = pd.read_csv(filename)
    return df

def init_db():
    db.drop_all()
    db.create_all()
    df = process_csv(os.path.join(dirname, "fake_data.csv"))
    for _, row in df.iterrows():
        movie = Movie(name=row["name"], description=row["description"], img="https://source.unsplash.com/random")
        db.session.add(movie)
    db.session.commit()

@click.command("init-db")
@with_appcontext
def init_command():
    init_db()
    click.echo("Success")

if __name__ == '__main__':
    init_command()
