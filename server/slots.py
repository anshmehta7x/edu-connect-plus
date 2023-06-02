import re

theoryslots = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'TA1', 'TB1', 'TC1', 'TD1', 'TE1', 'TF1', 'TG1', 'TAA1', 'TCC1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'TA2', 'TB2', 'TC2', 'TD2', 'TE2', 'TF2', 'TG2', 'TAA2', 'TBB2', 'TCC2', 'TDD2']
labslots = ['L' + str(i) for i in range(1,61)]

labtheorymap = {
  'A1': ['L1', 'L14'],
  'F1': ['L2', 'L15', 'L45'],
  'D1': ['L3', 'L19'],
  'TB1': ['L4'],
  'TG1': ['L5'],
  'B1': ['L7', 'L20', 'L50'],
  'G1': ['L8', 'L21', 'L51'],
  'E1': ['L9', 'L25', 'L55'],
  'TC1': ['L10', 'L40'],
  'TAA1': ['L11', 'L41'],
  'C1': ['L13', 'L26', 'L43'],
  'V1': ['L16'],
  'V2': ['L17'],
  'TE1': ['L22'],
  'TCC1': ['L23'],
  'TA1': ['L27'],
  'TF1': ['L28', 'L58'],
  'TD1': ['L29'],
  'A2': ['L31', 'L44'],
  'F2': ['L32', 'L45'],
  'D2': ['L33', 'L49'],
  'TB2': ['L34'],
  'TG2': ['L35'],
  'B2': ['L37', 'L50'],
  'G2': ['L38', 'L51'],
  'E2': ['L39', 'L55'],
  'TC2': ['L40'],
  'TAA2': ['L41'],
  'C2': ['L43', 'L56'],
  'TD2': ['L46'],
  'TBB2': ['L47'],
  'TE2': ['L52'],
  'TCC2': ['L53'],
  'TA2': ['L57'],
  'TF2': ['L58'],
  'TDD2': ['L59']
}

slotspattern = r'[A-Z]\w+-\w+-\w+-'

def getslots(timetable):
    slots = []
    for i in re.findall(slotspattern,timetable):
        if i.split('-')[0] not in slots:
            slots.append(i.split('-')[0])
            
    return slots

def getsubs(timetable):
    subs = []
    for i in re.findall(slotspattern,timetable):
        if i.split('-')[1] not in subs:
            subs.append(i.split('-')[1])
    return subs

def freeslots(timetable):
    userslots = getslots(timetable)
    freeslotlist = labslots
    for slot in userslots:
        if slot in theoryslots:
            toremove = labtheorymap[slot]
            for i in toremove:
                try:
                    freeslotlist.remove(i)
                except:
                    pass
        elif slot in labslots:
            freeslotlist.remove(slot)
        
    return freeslotlist
    # returns all free slots in an array, AS THEY ARE IN THE LAB SECTION OF THE TIMETABLE
