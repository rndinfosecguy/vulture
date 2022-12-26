var online = document.getElementsByClassName("_2YPr_ i0jNr selectable-text copyable-text");
var user = document.getElementsByClassName("ggj6brxn gfz4du6o r7fjleex g0rxnol2 lhj4utae le5p0ye3 l7jjieqr i0jNr");
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
				if (online.length > 0 && (online[0].innerText == "online" || online[0].innerText == "typing..." || online[0].innerText == "en línea" || online[0].innerText == "escribiendo...")) {
					if (startTime == "DUMMY") {
						startTime = encodedTime;
					}
					endTime = encodedTime;
					console.log("User online! (" + user[0].title + ")");
				} else {
					if (startTime != "DUMMY") {
						var encodedUser = encodeURIComponent(user[0].innerText);
						var exfilImage = new Image();
						exfilImage.src = "http://127.0.0.1/cgi-bin/exfil.py?user=" + encodedUser + "&date=" + encodedDate  +  "&starttime=" + startTime + "&endtime=" + endTime;

						startTime = "DUMMY";
						endTime = "DUMMY";
					} else {
						if(online.length > 0) {
							console.log("User "+ user[0].title + " not online. Last online: " + online[0].innerText + " (Not sending)");
						} else {
							console.log("User "+ user[0].title + " not online - Privacy mode activated");
						}
					}
				}
			} catch(error) {
				console.log("User "+ user[0].title +" not online - Privacy mode activated (" + error + ")");
			}
			trackuser();
		}, 1000);
	}
}
trackuser()

