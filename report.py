f = open("data.csv", "r")
dataContent = f.readlines()
f.close()

# report template
reportContent = """
<html>
	<head>
		<title>Report for ***USERNAME***</title>
	</head>

	<body>
		<style type="text/css">
			.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;margin:auto;margin-top:10%}
			.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
			.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
			.tg .tg-0lax{text-align:left;vertical-align:top}
			#overlay {
				position: fixed;
				display: none;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0,0,0,0.5);
				z-index: 2;
				cursor: pointer;
			}
			#text{
				position: absolute;
				top: 50%;
				left: 50%;
				font-size: 40px;
				color: white;
				transform: translate(-50%,-50%);
				-ms-transform: translate(-50%,-50%);
			}
		</style>
		<table border="1" width="50%" class="tg">
			<tr>
				<th class="tg-0lax" colspan="2">REPORT FOR <b>***USERNAME***</b></th>
			</tr>
			<tr>
				<th class="tg-0lax">DATE</th>
				<th class="tg-0lax">ONLINE BEHAVIOUR</th>
			</tr>
			***TABLE CONTENT***
		</table>
	</body>
</html>
"""

username = ""
data = {}
first = 0
for line in dataContent:
	if first == 0:
		first = 1
		continue
	line = line.strip()
	line = line.split(",")
	username = line[0]
	try:
		data[line[1]].append([line[2], line[3]])
	except:
		data[line[1]] = []
		data[line[1]].append([line[2], line[3]])

reportContent = reportContent.replace("***USERNAME***", username)
tableContent = ""
for key, value in data.items():
	times = {}
	for i in range(0,24):
		times[i] = []
	tableContent += "<tr>\n"
	tableContent += "<td class=\"tg-0lax\">" + key + "</td>\n"
	tableContent += "<td class=\"tg-0lax\">"
	for item in value:
		hour = int(item[0].split(":")[0])
		times[hour].append(item[0] + " - " + item[1])
	for item in times:
		tableContent += "<div id=\"overlay\" onclick=\"off()\">"
		tableContent += "<div id=\"text\">"
		overlayContent = ""
		if len(times[item]) > 0:
			overlayContent += "<table><tr><th>ONLINE TIMES</th></tr>"
			for i in times[item]:
				overlayContent += "<tr><td>" +  i + "</td></tr>"
			overlayContent += "</table>"
		tableContent += "</div>"
		tableContent += "</div>"
		dataColor = "red"
		if overlayContent != "":
			dataColor = "green"
		if item < 10:
			tableContent += "<button style=\"background-color:" + dataColor + "; width:200px\" onclick=\"on('" + overlayContent +  "')\">Show times from 0" + str(item) + ":00 to " + str(item) + ":59</button><br>"
		else:
			tableContent += "<button style=\"background-color:" + dataColor + "; width:200px\" onclick=\"on('" + overlayContent +  "')\">Show times from " + str(item) + ":00 to " + str(item) + ":59</button><br>"
	tableContent += """
		<script>
			function on(t) {
				if (t == "") {
					t = "NO ONLINE TIME"
				}
				document.getElementById("overlay").style.display = "block";
				document.getElementById("overlay").innerHTML = "<div id=\\\"text\\\">" + t + "</div>";
			}

			function off() {
				document.getElementById("overlay").style.display = "none";
			}
		</script>
	"""
	tableContent += "</td>\n"
	tableContent += "</tr>\n"

reportContent = reportContent.replace("***TABLE CONTENT***", tableContent)

print("Writing report file " + username + ".html")
f = open(username + ".html", "w")
f.write(reportContent)
f.close()
