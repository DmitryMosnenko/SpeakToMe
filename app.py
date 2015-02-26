#!flask/bin/python3.4

__author__ = 'AMID'

from app import app
# app.run(host='0.0.0.0', debug=True, threaded=True)
app.run(debug=True, threaded=True)