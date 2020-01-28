from flask import Flask, make_response
from flask import render_template, jsonify, request
from flask_cors import CORS
import queries as psql
from flask import request, json
import requests

app = Flask(__name__)
CORS(app)


def create_response(data, status, message):
    """Wraps response in a consistent format throughout the API.

    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself
    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary")

    response = {
        "code": status,
        "success": 200 <= status < 300,
        "message": message,
        "result": data,
    }
    return jsonify(response), status

@app.route('/')
def home():
    return "Sourcing Tool"

######################################################################################################

@app.route('/semester_list', methods=['GET'])
def get_semester_list():
    res = psql.get_semester_list()
    else:
        return create_response({}, 404, "Not Found")
    if res:
        return create_response(res, 200, "OK")
    return create_response({}, 404, "Not Found")

@app.route('/semester_data', methods=['GET'])
def get_semester_info(semester):
    res = psql.get_semester_info(semester)
    else:
        return create_response({}, 404, "Not Found")
    if res:
        return create_response(res, 200, "OK")
    return create_response({}, 404, "Not Found")

@app.route('/nonprofit_info', methods=['GET'])
def get_nonprofit_info(nonprofit_name):
    res = psql.get_nonprofit_info(nonprofit_name)
    else:
        return create_response({}, 404, "Not Found")
    if res:
        return create_response(res, 200, "OK")
    return create_response({}, 404, "Not Found")

######################################################################################################

@app.route('/add', methods=['POST'])
def add_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester):
    res = psql.add_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester)
    else:
        return create_response({}, 404, "Not Found")
    if res:
        return create_response(res, 200, "OK")
    return create_response({}, 404, "Not Found")

@app.route('/new_sem', methods=['POST'])
def new_sem(name, prev_sem):
    res = psql.new_sem(name, prev_sem)
    else:
        return create_response({}, 404, "Not Found")
    if res:
        return create_response(res, 200, "OK")
    return create_response({}, 404, "Not Found")

######################################################################################################

@app.route('/edit/<nonprofit_name>', methods=['PUT'])
def edit_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester):
    res = psql.edit_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester)
    else:
        return create_response({}, 404, "Not Found")
    if res:
        return create_response(res, 200, "OK")
    return create_response({}, 404, "Not Found")

######################################################################################################

if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=80)
