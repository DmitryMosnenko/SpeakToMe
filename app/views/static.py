__author__ = 'AMID'

from flask import Blueprint
from app import app


mod = Blueprint('static', __name__, url_prefix='/')


@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('html/dashboard.html')
    # return app.send_static_file('html/index.html')


@app.route('/dashboard')
def dashboard():
    return app.send_static_file('html/dashboard.html')