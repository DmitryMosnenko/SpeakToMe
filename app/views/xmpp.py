__author__ = 'AMID'

from flask import Blueprint
from flask import request

from app import app, db


mod = Blueprint('xmpp', __name__, url_prefix='/xmpp')


@mod.route('/host')
def host():
    return app.config['XMPP_HOST']

@mod.route('/domain')
def domain():
    return app.config['XMPP_DOMAIN']
