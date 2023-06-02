import mariadb as db
import sys


#Connect to MariaDB Platform
try:
    conn = db.connect(
    user = "2010084_mvs0106",
    port = 3306,
    password = "eduConnect+",
    host = "207.246.248.19",
    database = "2010084_mvs01062023",
    autocommit = True
    )
    print("Connected to MariaDB Platform")
except db.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

#Get cursor
cur0 = conn.cursor()
cur1 = conn.cursor()

#List of columns
listColumns = []
cur0.execute("DESCRIBE userInfo")
for i in cur0:
    listColumns.append(i[0])
#print(listColumns)

    
#Returning JSON object having all data of a user from the user ID
def getUserInfo(userID):
    cur1.execute("SELECT * from userInfo WHERE userID = ?", (userID,))
    records = cur1.fetchall()
    dictAll = {}
    for i in range(0, len(records[0])):
        dictAll[listColumns[i]] = records[0][i]
    return dictAll

#Function to create a record in the database
def createRecord(jsonData):
    listData = tuple(jsonData.values())
    
    try:
        cur1.execute("INSERT INTO userInfo (userID, firstName, lastName, clgYear, clgBranch, subCode, userGender, freeSlots, lookingForBuddy, lookingToTutor, canTutor, userEmail, userPassword) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", listData)
        print("Record inserted successfully")
    except db.Error as e:
        print(f"Error: {e}")
        sys.exit(1)


#Function to update a record in the database
def updateRecord(jsonData):
    listData = list(jsonData.values())
    # print(listData)
    listData.append(listData[0])
    listData.pop(0)
    # print(listData)

    try:
        cur1.execute("UPDATE userInfo SET firstName = %s, lastName = %s, clgYear = %s, clgBranch = %s, subCode = %s, userGender = %s, freeSlots = %s, lookingForBuddy = %s, lookingToTutor = %s, canTutor = %s, userEmail = %s, userPassword = %s WHERE userID = %s", listData)
        print("Record updated successfully")
    except db.Error as e:
        print(f"Error: {e}")
        sys.exit(1)


#Function to delete a record in the database
def deleteRecord(userID):
    try:
        cur1.execute("DELETE FROM userInfo WHERE userID = ?", (userID,))
        print("Record deleted successfully")
    except db.Error as e:
        print(f"Error: {e}")
        sys.exit(1)


#Function to get all records from the database
def getAllRecords():
    cur1.execute("SELECT * FROM userInfo")
    records = cur1.fetchall()
    print(records)
    return records

def verifyUser(userEmail, userPassword):
    cur1.execute("SELECT * FROM userInfo WHERE userEmail = ?", (userEmail,))
    records = cur1.fetchall()
    if(len(records)!=0):
        if records[0][12] == userPassword:
            print("Successful Login")
            return True
        else:
            print("Incorrect password")
            return False
    else:
        print("User doesn't exist")
        return False
    
def checkEmail(userEmail):
    cur1.execute("SELECT * FROM userInfo WHERE userEmail = ?", (userEmail,))
    records = cur1.fetchall()
    if(len(records)!=0):
        print("Email already exists")
        return True
    else:
        print("Email doesn't exist")
        return False
