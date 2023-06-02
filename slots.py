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

testtable = '''THEORY 	Start 	08:00 	09:00 	10:00 	11:00 	12:00 	- 	Lunch 	14:00 	15:00 	16:00 	17:00 	18:00 	18:51 	19:01
End 	08:50 	09:50 	10:50 	11:50 	12:50 	- 	Lunch 	14:50 	15:50 	16:50 	17:50 	18:50 	19:00 	19:50
LAB 	Start 	08:00 	08:51 	09:51 	10:41 	11:40 	12:31 	Lunch 	14:00 	14:51 	15:51 	16:41 	17:40 	18:31 	-
End 	08:50 	09:40 	10:40 	11:30 	12:30 	13:20 	Lunch 	14:50 	15:40 	16:40 	17:30 	18:30 	19:20 	-
MON 	THEORY 	A1-BCSE202L-TH-PRP204-ALL03 	F1-BSTS101P-SS-PRP107-ALL03 	D1-BCSE102L-TH-PRP112-ALL03 	TB1-BPHY101L-TH-PRP109-ALL03 	TG1 	- 	Lunch 	A2 	F2 	D2 	TB2 	TG2 	- 	V3
LAB 	L1 	L2 	L3 	L4 	L5 	L6 	Lunch 	L31 	L32 	L33 	L34 	L35 	L36 	-
TUE 	THEORY 	B1-BPHY101L-TH-PRP109-ALL03 	G1 	E1-BENG101L-TH-PRP112-ALL03 	TC1-BMAT102L-TH-PRP318-ALL03 	TAA1 	- 	Lunch 	B2 	G2 	E2 	TC2 	TAA2 	- 	V4
LAB 	L7 	L8 	L9 	L10 	L11 	L12 	Lunch 	L37 	L38 	L39-BPHY101P-LO-TT420-ALL03 	L40-BPHY101P-LO-TT420-ALL03 	L41 	L42 	-
WED 	THEORY 	C1-BMAT102L-TH-PRP318-ALL03 	A1-BCSE202L-TH-PRP204-ALL03 	F1-BSTS101P-SS-PRP107-ALL03 	V1 	V2 	- 	Lunch 	C2 	A2 	F2 	TD2 	TBB2 	- 	V5
LAB 	L13 	L14 	L15 	L16 	L17 	L18 	Lunch 	L43-BCSE102P-LO-PRP117a-ALL03 	L44-BCSE102P-LO-PRP117a-ALL03 	L45 	L46 	L47-BENG101P-LO-SJT519-ALL03 	L48-BENG101P-LO-SJT519-ALL03 	-
THU 	THEORY 	D1-BCSE102L-TH-PRP112-ALL03 	B1-BPHY101L-TH-PRP109-ALL03 	G1 	TE1 	TCC1-BMAT102L-TH-PRP318-ALL03 	- 	Lunch 	D2 	B2 	G2 	TE2 	TCC2 	- 	V6
LAB 	L19 	L20 	L21 	L22 	L23 	L24 	Lunch 	L49-BCSE202P-LO-PRP118-ALL03 	L50-BCSE202P-LO-PRP118-ALL03 	L51 	L52 	L53 	L54 	-
FRI 	THEORY 	E1-BENG101L-TH-PRP112-ALL03 	C1-BMAT102L-TH-PRP318-ALL03 	TA1-BCSE202L-TH-PRP204-ALL03 	TF1-BSTS101P-SS-PRP107-ALL03 	TD1 	- 	Lunch 	E2 	C2 	TA2 	TF2 	TDD2 	- 	V7
LAB 	L25 	L26 	L27 	L28 	L29 	L30 	Lunch 	L55 	L56 	L57-BCSE102P-LO-PRP117a-ALL03 	L58-BCSE102P-LO-PRP117a-ALL03 	L59 	L60 	-
SAT 	THEORY 	V8 	X11 	X12 	Y11 	Y12 	- 	Lunch 	X21 	Z21 	Y21 	W21 	W22 	- 	V9
LAB 	L71 	L72 	L73 	L74 	L75 	L76 	Lunch 	L77 	L78 	L79 	L80 	L81 	L82 	-
SUN 	THEORY 	V10 	Y11 	Y12 	X11 	X12 	- 	Lunch 	Y21 	Z21 	X21 	W21 	W22 	- 	V11
LAB 	L83 	L84 	L85 	L86 	L87 	L88 	Lunch 	L89 	L90 	L91 	L92 	L93 	L94 	-'''
testtable2 = '''THEORY	Start	08:00	09:00	10:00	11:00	12:00	-	Lunch	14:00	15:00	16:00	17:00	18:00	18:51	19:01
End	08:50	09:50	10:50	11:50	12:50	-	Lunch	14:50	15:50	16:50	17:50	18:50	19:00	19:50
LAB	Start	08:00	08:51	09:51	10:41	11:40	12:31	Lunch	14:00	14:51	15:51	16:41	17:40	18:31	-
End	08:50	09:40	10:40	11:30	12:30	13:20	Lunch	14:50	15:40	16:40	17:30	18:30	19:20	-
MON	THEORY	A1-BMAT102L-TH-PRP120-ALL03	F1-BSTS101P-SS-PRP123-ALL03	D1-BECE201L-TH-PRP123-ALL03	TB1-BCHY101L-TH-TT414-ALL03	TG1-BCSE103E-ETH-PRP120-ALL03	-	Lunch	A2	F2	D2	TB2	TG2	-	V3
LAB	L1	L2	L3	L4	L5	L6	Lunch	L31	L32	L33	L34	L35	L36	-
TUE	THEORY	B1-BCHY101L-TH-TT414-ALL03	G1	E1	TC1-BECE203L-TH-PRP116-ALL03	TAA1-BMAT102L-TH-PRP120-ALL03	-	Lunch	B2-BENG101L-TH-PRP125-ALL03	G2	E2	TC2	TAA2	-	V4
LAB	L7	L8	L9	L10	L11	L12	Lunch	L37	L38	L39	L40	L41	L42	-
WED	THEORY	C1-BECE203L-TH-PRP116-ALL03	A1-BMAT102L-TH-PRP120-ALL03	F1-BSTS101P-SS-PRP123-ALL03	V1	V2	-	Lunch	C2	A2	F2	TD2	TBB2	-	V5
LAB	L13	L14	L15	L16	L17	L18	Lunch	L43-BCHY101P-LO-SMVG009-ALL03	L44-BCHY101P-LO-SMVG009-ALL03	L45-BCSE103E-ELA-TT238-ALL03	L46-BCSE103E-ELA-TT238-ALL03	L47	L48	-
THU	THEORY	D1-BECE201L-TH-PRP123-ALL03	B1-BCHY101L-TH-TT414-ALL03	G1	TE1	TCC1-BECE203L-TH-PRP116-ALL03	-	Lunch	D2	B2-BENG101L-TH-PRP125-ALL03	G2	TE2	TCC2	-	V6
LAB	L19	L20	L21-BENG101P-LO-TT306-ALL03	L22-BENG101P-LO-TT306-ALL03	L23	L24	Lunch	L49	L50	L51	L52	L53	L54	-
FRI	THEORY	E1	C1-BECE203L-TH-PRP116-ALL03	TA1-BMAT102L-TH-PRP120-ALL03	TF1-BSTS101P-SS-PRP123-ALL03	TD1-BECE201L-TH-PRP123-ALL03	-	Lunch	E2	C2	TA2	TF2	TDD2	-	V7
LAB	L25	L26	L27	L28	L29	L30	Lunch	L55-BCSE103E-ELA-TT238-ALL03	L56-BCSE103E-ELA-TT238-ALL03	L57	L58	L59	L60	-
SAT	THEORY	V8	X11	X12	Y11	Y12	-	Lunch	X21	Z21	Y21	W21	W22	-	V9
LAB	L71	L72	L73	L74	L75	L76	Lunch	L77	L78	L79	L80	L81	L82	-
SUN	THEORY	V10	Y11	Y12	X11	X12	-	Lunch	Y21	Z21	X21	W21	W22	-	V11
LAB	L83	L84	L85	L86	L87	L88	Lunch	L89	L90	L91	L92	L93	L94	-'''

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
    

print(freeslots(testtable2))