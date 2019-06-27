import _thread
import time
import os

def start_report_server():
	print("Starting reporting server...")
	os.system("python3 -m http.server --cgi 81")

def renew_report():
	print("Generating report...")
	os.system("python3 report.py")

try:
	_thread.start_new_thread(start_report_server, ())
	while 1:
		_thread.start_new_thread(renew_report, ())
		time.sleep(60)
except:
	print("Unable to start thread.")
