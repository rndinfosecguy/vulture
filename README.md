# vulture
WhatsApp Online Tracker

---

1. About
2. Requirements
3. Usage
4. Reports
5. Example
6. License Hints

---

## 1. About 
This small snippets allows you to track a users WhatsApp behavior exploiting the WhatsApp web implementation. It monitors the users online-offline activity. At the moment it is only possible to monitor one user at the same time. The collected material is stored in a CSV file on your tracking machine.

### IMPORTANT NOTE
Code is still under developement and needs a lot improvement. It is meant as a personal PoC, but maybe some of will find it useful. If you have any questions, sugesstions or see bugs just let me know.

## 2. Requirements
* Smartphone and phone number where WhatsApp is installed and registred
* A browser on a Windows/Linux/Mac machine which is connected to the SmartPhone using WhatsApp web (tested on Chrome)
* The Smartphone and tracking machine (WhatsApp web) needs to be online 24/7 to ensure that a full time monitoring of the user is achived
* Python 3 installed on you tracking machine
* RECOMMENDED: It is recommended to use a dedicated phone number which only uses WhatsApp for tracking purpose. If you use your private WhatsApp installation it may interfere the tracking because there are some DOM struggles I am fighting with at the moment. It does not mean that it will not work with multiple chats in WhatsApp web. It just means I tested it in an environment where only one chat is available in WhatsApp web

## 3. Usage
1. Set permissions for the CGI Python 3 server: `chmod a+x cgi-bin/exfil.py`
2. Set writeable permissions for `data.csv`
3. Start the CGI Server: `python3 server.py`
4. Open WhatsApp web and select the user to track. If you have multiple chats in WhatsApp it is recommended to pin the user you want to track. This means the user will always be at the top and guarantees that the tracking script works properly.
5. Open the web developer console
6. Insert the JavaScript code available inside the file `inject.js`
7. Wait for data added to `data.csv` as soon as the user is online
8. Analyse the data collected in `data.csv`

## 4. Reports
1. Switch to the folder `reporting`
2. Execute `python3 reportserver.py` - This script performs the following actions:
* Starting a reporting web server on port `81`
* Generating and updating a HTML file for the target every 60 seconds

Access your browser on http://localhost:81 to view the report.

## 5. Example
Output may differ from screenshots in newer versions.

Injecting JavaScript code to the developer console in WhatsApp Web.
![injecting JavaScript code](https://got-hacked.wtf/hsgwza72543s976_1.png)

Saving online times to disk via Python 3 CGI script
![saving online times to disk](https://got-hacked.wtf/hsgwza72543s976_2.png)

Report example:

* red items - User was not online during this range
* green items - User was online in this range - click on the item for details

Overview
![example report](https://got-hacked.wtf/hsgwza72543s976_3.png#1)

Red Item - User was not online
![example report](https://got-hacked.wtf/hsgwza72543s976_4.png)

Green Item - Users online times
![example report](https://got-hacked.wtf/hsgwza72543s976_5.png)

## 6. License Hints
This code is published under the MIT license. For more information view the LICENSE file.
Other licenses: The code of the reporting module makes use of the punchcard-js implementation of David Hazinski. For more information have a look at his website (http://bl.ocks.org/kaezarrex/10122633). The license file of his code is also embedded in the LICENSE file mentioned above.
