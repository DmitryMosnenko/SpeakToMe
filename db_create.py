#!flask/bin/python3.4

__author__ = 'AMID'


from config import SQLALCHEMY_DATABASE_URI
from app import db
import os.path

db.create_all()