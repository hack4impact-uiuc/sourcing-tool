from flask import Flask, make_response
from flask import render_template, jsonify, request
from flask_cors import CORS
import queries as psql
from flask import request, json

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
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

@app.route('/semester_data', methods=['GET'])
def get_semester_info():
    semester = request.args['semester']
    res = psql.get_semester_info(semester)
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

@app.route('/nonprofit_info', methods=['GET'])
def get_nonprofit_info():
    nonprofit_name = request.args['nonprofit_name']
    res = psql.get_nonprofit_info(nonprofit_name)
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

######################################################################################################

@app.route('/add', methods=['POST'])
def add_nonprofit():
    args = request.form
    res = psql.add_nonprofit(args.get('name'), args.get('media'), args.get('first'), args.get('last'), args.get('email'), args.get('linkedin'), args.get('fname'), args.get('position'), args.get('last_updated'),
                 args.get('status'), args.get('comments'), args.get('semester'))
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

@app.route('/new_sem', methods=['POST'])
def new_sem():
    args = request.form
    res = psql.new_sem(args.get('name'), args.get('prev_sem'))
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

######################################################################################################

@app.route('/edit', methods=['PUT'])
def edit_nonprofit():
    args = request.form
    prev_name = args.get('prev_name')
    semester = args.get('semester')
    name = args.get('name')
    media = args.get('media')
    first = args.get('first')
    last = args.get('last')
    email = args.get('email')
    linkedin = args.get('linkedin')
    fname = args.get('fname')
    position = args.get('position')
    last_updated = args.get('last_updated')
    status = args.get('status')
    comments = args.get('comments')

    res = psql.edit_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated, status, comments, semester, prev_name)
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

######################################################################################################

@app.route('/delete', methods=['DELETE'])
def delete_nonprofit():
    args = request.form
    semester = args.get('semester')
    name = args.get('name')

    res = psql.delete_nonprofit(name, semester)
    if res:
        return create_response(res, 200, "OK")
    else:
        return create_response({}, 404, "Not Found")
    return create_response({}, 404, "Not Found")

######################################################################################################

if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=5000)
