from flask import Flask, jsonify, request
from flask_cors import CORS
import dbconnect
from slots import freeslots,getsubs
import json

app = Flask(__name__)
cors = CORS(app)

@app.route('/login', methods=['POST'])
def check_login_details():
    
    email = request.json['email']
    password = request.json['password']
    validity = dbconnect.verifyUser(email,password)

    if validity == True:
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failed'})

@app.route('/getid',methods=['POST'])
def get_user_id():
    email = request.json['email']
    uid = dbconnect.getUserID(email)
    return jsonify({'uid':uid})

@app.route('/profile', methods=['POST'])
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
    'freeSlots':json.dumps(freeSlots),
    'lookingForBuddy':data['lookingForBuddy'],
    'lookingToTutor':data['lookingToTutor'],
    'canTutor':json.dumps(data['canTutor']),
    'userEmail':data['userEmail'],
    'userPassword':data['userPassword']})
    return jsonify({'message': 'User Created'}), 201

@app.route('/profile', methods=['PUT'])
def update_user():
    data = request.json
    tt = data['timetable']
    freeSlots = freeslots(tt)
    subs = getsubs(tt)
    dbconnect.updateRecord({'userID':data['userID'],
    'firstName':data['firstName'],
    'lastName':data['lastName'],
    'clgYear':data['clgYear'],
    'clgBranch':data['clgBranch'],
    'subCode':json.dumps(subs),
    'userGender':data['userGender'],
    'freeSlots':json.dumps(freeSlots),
    'lookingForBuddy':data['lookingForBuddy'],
    'lookingToTutor':data['lookingToTutor'],
    'canTutor':json.dumps(data['canTutor']),
    'userEmail':data['userEmail'],
    'userPassword':data['userPassword']})
    return jsonify({'message': 'User Created'}), 201

@app.route('/profile', methods=['DELETE'])
def delete_user():
    data = request.json
    dbconnect.deleteRecord(data['userID'])
    return jsonify({'message': 'User Deleted'}), 201

@app.route('/getuser', methods=['POST'])
def get_user():
    uid = request.json['uid']
    print(uid)
    info = dbconnect.getUserInfo(uid)
    return jsonify(info), 201

@app.route('/login', methods=['PUT'])
def check_email_existing():
    email = request.args.get('email')
    validity = dbconnect.checkEmail(email)
    if validity == True:
        return jsonify({'message': 'Email Exists'}), 201
    else:
        return jsonify({'message': 'Email Does Not Exist'}), 401

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