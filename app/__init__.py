__author__ = 'AMID'

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from app import models

from app.views import static
from app.views import xmpp

app.register_blueprint(static.mod)
app.register_blueprint(xmpp.mod)




@app.errorhandler(404)
def internal_error(error):
    db.session.rollback()
    return "Not Found", 404

@app.errorhandler(500)
def special_exception_handler(error):
    db.session.rollback()
    return "DB connection error", 500


if not app.debug is None:
    import logging
    # logger = logging.getLogger('werkzeug')
    # print(logger.__dict__)
    # print(logger.manager.__dict__)

    # print(logging.getLogger().manager.loggerDict.keys())
    #
    #
    # from logging.handlers import RotatingFileHandler
    # werkzeug_handler = RotatingFileHandler('tmp/werkzeug.log', 'w',
    #                                    1 * 1024 * 1024, 10)
    # werkzeug_handler.setLevel(logging.DEBUG)
    # werkzeug_handler.setFormatter(logging.Formatter(
    #     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    #
    # engine_handler = RotatingFileHandler('tmp/engine.log', 'w',
    #                                    1 * 1024 * 1024, 10)
    # engine_handler.setLevel(logging.DEBUG)
    # engine_handler.setFormatter(logging.Formatter(
    #     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    #
    # dialects_handler = RotatingFileHandler('tmp/dialects.log', 'w',
    #                                    1 * 1024 * 1024, 10)
    # dialects_handler.setLevel(logging.DEBUG)
    # dialects_handler.setFormatter(logging.Formatter(
    #     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    #
    # pool_handler = RotatingFileHandler('tmp/pool.log', 'w',
    #                                    1 * 1024 * 1024, 10)
    # pool_handler.setLevel(logging.DEBUG)
    # pool_handler.setFormatter(logging.Formatter(
    #     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    #
    # orm_handler = RotatingFileHandler('tmp/orm.log', 'w',
    #                                    1 * 1024 * 1024, 10)
    # orm_handler.setLevel(logging.DEBUG)
    # orm_handler.setFormatter(logging.Formatter(
    #     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    #
    # root_handler = RotatingFileHandler('tmp/root.log', 'w',
    #                                    1 * 1024 * 1024, 10)
    # root_handler.setLevel(logging.DEBUG)
    # root_handler.setFormatter(logging.Formatter(
    #     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    #
    # # logging.basicConfig()
    # logging.getLogger().setLevel(logging.DEBUG)
    # logging.getLogger().addHandler(root_handler)
    # logging.getLogger('werkzeug').setLevel(logging.DEBUG)
    # logging.getLogger('werkzeug').addHandler(werkzeug_handler)
    # logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)
    # logging.getLogger('sqlalchemy.engine').addHandler(engine_handler)
    # logging.getLogger('sqlalchemy.dialects').setLevel(logging.DEBUG)
    # logging.getLogger('sqlalchemy.dialects').addHandler(dialects_handler)
    # logging.getLogger('sqlalchemy.pool').setLevel(logging.DEBUG)
    # logging.getLogger('sqlalchemy.pool').addHandler(pool_handler)
    # logging.getLogger('sqlalchemy.orm').setLevel(logging.DEBUG)
    # logging.getLogger('sqlalchemy.orm').addHandler(orm_handler)