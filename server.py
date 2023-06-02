from flask import Flask, jsonify, request
from user import User
import dbconnect
from slots import freeslots,getsubs
import json

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def create_user():

    data = request.json
    tt = data['timetable']
    freeSlots = freeslots(tt)
    subs = getsubs(tt)
    dbconnect.createRecord({'firstName':data['firstName'],
    'lastName':data['lastName'],
    'clgYear':data['clgYear'],
    'clgBranch':data['clgBranch'],
    'subCode':json.dumps(subs),
    'userGender':data['userGender'],
    'freeSlots':json.dumps(subs),
    'lookingForBuddy':data['lookingForBuddy'],
    'lookingToTutor':data['lookingToTutor'],
    'canTutor':json.dumps(data['canTutor']),
    'userEmail':data['userEmail'],
    'userPassword':data['userPassword']})
    return jsonify({'message': 'User Created'}), 201

@app.route('/api', methods=['GET'])
def get_user():
    #query db and get user object as variable 'user'
    user = {2:4}
    return jsonify(user), 201

@app.route('/api', methods=['PUT'])
def send_buddy_request(sender,receiver):
    #add sender id to receiver's buddy requests section in db

    return jsonify({'message': 'Buddy Request Sent'}), 201

@app.route('/api', methods=['GET'])
def check_for_buddy_requests(uid):
    #return a list of all buddy requests for the user with uid from db

    users = []
    return jsonify({'users':users}), 201

@app.route('/api', methods=['PUT'])
def send_tutor_request(sender,receiver):
    #add sender id to receiver's tutor requests section in db

    return jsonify({'message': 'Tutor Request Sent'}), 201

def check_for_tutor_requests(uid):
    #return a list of all tutor requests for the user with uid from db

    users = []
    return jsonify({'users':users}), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)