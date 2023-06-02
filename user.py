import slots

class User:

    def __init__(self,uid,email,password,firstname,lastname,clgyear,branch,gender):
        self.uid = uid
        self.fname = firstname
        self.lname = lastname
        self.email = email
        self.password = password
        self.clgyear = clgyear
        self.branch = branch
        self.gender = gender

    def set_timetable(self,timetable):
        self.timetable = timetable
    
    def set_slots(self):
        self.freeslots = slots.freeslots(self.timetable)

