import psycopg2
import psycopg2.extras
from psycopg2.extensions import AsIs
import json
import itertools
import random
import os

DATABASE_URL = os.environ['DATABASE_URL']
conn = psycopg2.connect(DATABASE_URL, sslmode='require')
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
    query = """SELECT DISTINCT semester FROM nonprofits"""
    params = None
    return get_dict_resultset(query, params)

def get_semester_info(semester):
    query = """SELECT * FROM nonprofits WHERE semester = %s"""
    params = (semester,)
    return get_dict_resultset(query, params)

def get_nonprofit_info(nonprofit):
    query = """SELECT * FROM nonprofits WHERE name = %s"""
    params = (nonprofit,)
    return get_dict_resultset(query, params)

def add_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester):
    query = """INSERT INTO nonprofits VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning *;"""
    params = (name, media, first, last, email, linkedin, fname, position, last_updated, status, comments, semester)
    return get_dict_resultset(query, params)

def new_sem(new_sem, prev_sem):
    query = """INSERT INTO nonprofits (semester, name, media, first, last, email, linkedin, fname, position, last_updated, status, comments) SELECT %s, name, media, first, last, email, linkedin, fname, position, last_updated, status, comments FROM nonprofits WHERE semester = %s returning *"""
    params = (new_sem, prev_sem)
    return get_dict_resultset(query, params)

def edit_nonprofit(name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, semester, prev_name):
    query = """UPDATE nonprofits SET name=%s, media=%s, first=%s, last=%s, email=%s, linkedin=%s, fname=%s, position=%s, 
                        last_updated=%s, status=%s, comments=%s WHERE name=%s and semester=%s returning *"""
    params = (name, media, first, last, email, linkedin, fname, position, last_updated,
                 status, comments, prev_name, semester)
    return get_dict_resultset(query, params)

def delete_nonprofit(name, semester):
    query = """DELETE FROM nonprofits where name = %s and semester = %s returning *"""
    params = (name, semester)
    return get_dict_resultset(query, params)

