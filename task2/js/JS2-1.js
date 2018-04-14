function simplegame(){
	window.location.href="JS2-1-1.htm";
}

function changelist(){//切换界面
	var kill =document.getElementById('middle2');
	var ghost = document.getElementById("middle");
	if(ghost.style.display=="block"){
		kill.style.display="block";
		ghost.style.display="none";
	}
	else{
		kill.style.display="none";
		ghost.style.display="block";
	}
}
