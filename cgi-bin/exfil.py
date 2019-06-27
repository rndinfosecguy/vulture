#!/usr/bin/env python3

import cgi
import os
from urllib.parse import unquote

arguments = cgi.FieldStorage()
os.system("echo " + unquote(arguments['user'].value) + "," + unquote(arguments['date'].value) + "," + unquote(arguments['starttime'].value) + "," + unquote(arguments['endtime'].value) + " >> data.csv")
