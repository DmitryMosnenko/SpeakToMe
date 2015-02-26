__author__ = 'AMID'
# STM - SpeakToMe

import os

basedir = os.path.abspath(os.path.dirname(__file__))

if os.environ.get('STM_DATABASE_URL') is None:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
else:
    SQLALCHEMY_DATABASE_URI = os.environ['STM_DATABASE_URL']




if os.environ.get('STM_XMPP_URL') is None:
    XMPP_HOST = 'https://localhost/http-bind/'
else:
    XMPP_HOST = os.environ['STM_XMPP_URL']




if os.environ.get('STM_XMPP_DOMAIN') is None:
    XMPP_DOMAIN = 'domain'
else:
    XMPP_DOMAIN = os.environ['STM_XMPP_DOMAIN']


