from flask import Flask, jsonify, request
from flask_cors import CORS
import dbconnect
from slots import freeslots,getsubs
import json
import os

app = Flask(__name__)
cors = CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    uid = request.form['uid']

    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    filename = f'{uid}.jpg'  # Set the filename using the uid # Set the desired file path

    # Save the file to the specified location
    file.save(filename)
    return 'Image uploaded successfully', 200

@app.route('/uploadnew', methods=['POST'])
def uploadnew():
    uid = dbconnect.imgUID()

    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    filename = f'{uid}.jpg'  # Set the filename using the uid  # Set the desired file path

    # Save the file to the specified location
    file.save(filename)
    return 'Image uploaded successfully', 200

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
    'userPassword':data['userPassword'],
    'userTimeTable':data['timetable']})
    return jsonify({'message': 'User Created'}), 201

@app.route('/profile', methods=['PUT'])
def update_user():
    data = request.json
    slots = freeslots(data['timetable'])
    subs = getsubs(data['timetable'])
    dbconnect.updateRecord({'userID':data['uid'],
    'firstName':data['firstName'],
    'lastName':data['lastName'],
    'clgYear':data['clgYear'],
    'clgBranch':data['clgBranch']
    ,'freeSlots':json.dumps(slots),
    'subCode':json.dumps(subs),
    'userTimeTable':data['timetable']
    })
    return jsonify({'message': 'User Created'}), 201

@app.route('/profile', methods=['DELETE'])
def delete_user():
    data = request.json
    dbconnect.deleteRecord(data['uid'])
    return jsonify({'message': 'User Deleted'}), 201

@app.route('/getuser', methods=['POST'])
def get_user():
    uid = request.json['uid']
    print(uid)
    info = dbconnect.getUserInfo(uid)
    return jsonify(info), 201

@app.route('/login', methods=['PUT'])
def check_email_existing():
    email = request.json['email']
    validity = dbconnect.checkEmail(email)
    if validity == True:
        return jsonify({'exists': 1}), 201
    else:
        return jsonify({'exists': 0})
    
@app.route('/allprofiles', methods = ['GET'])
def get_data():
    try:
        data = dbconnect.getAllForProfile()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error retrieving data from the database'})
    
@app.route('/filterprofiles', methods = ['GET'])
def get_filtered_data():
    try:
        data = dbconnect.getAllForFilter()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error retrieving data from the database'})

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