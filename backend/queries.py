import psycopg2
import psycopg2.extras
from psycopg2.extensions import AsIs
from bson.json_util import dumps
import json
import itertools
import random

conn = psycopg2.connect(dbname='postgres', user='postgres', password='alawini411', host='cs411-project.cm2xo0osnz3p.us-east-1.rds.amazonaws.com', port='5432')
conn.autocommit = True
cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

def get_dict_resultset(sql, params):
    if params:
        cur.execute (sql, params)
    else:
        cur.execute(sql)
    ans =cur.fetchall()
    if not ans:
        return None
    dict_result = []
    for row in ans:
        dict_result.append(dict(row))
    return {'result': dict_result}

def get_semester_list():
    query = """SELECT DISTINCT <What rebecca calls semesters> FROM <what rebecca calls our table>"""
    params = None
    return get_dict_resultset(query, params)

def get_semester_info(semester):
    query = """SELECT * FROM <what rebecca calls our table> WHERE <What rebecca calls semesters> = %s"""
    params = semester
    return get_dict_resultset(query, params)

def get_nonprofit_info(nonprofit):
    query = """SELECT * FROM <what rebecca calls our table> WHERE <nonprofit name> = %s"""
    params = nonprofit
    return get_dict_resultset(query, params)