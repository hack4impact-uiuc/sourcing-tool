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

def add_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester):
    query = """INSERT INTO <table> VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    params = (name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester)
    cur.execute(query, params)

def new_sem(name, prev_sem):
    query = """INSERT INTO <table> (semester, name, media, first, last, email, linkedin, fname, position, last_updated, status, comments) SELECT %s, name, media, first, last, email, linkedin, fname, position, last_updated, status, comments FROM <table> WHERE <semester> = %s"""
    params = (name, prev_sem)
    cur.execute(query, params)

def edit_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester):
    query = """UPDATE <table> SET name=%s, media=%s, first=%s, last=%s, email=%s, linkedin=%s, fname=%s, position=%s, 
                        last_updated=%s, status=%s, comments=%s, semester=%s, WHERE <name of nonprofit column>==nonprofit"""
    params = (name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester)
    cur.execute(query, params)
