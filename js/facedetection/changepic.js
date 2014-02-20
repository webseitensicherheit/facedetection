function tauscheBild() {
	var x, y = 0;
	var ziele = new Array("1", "2", "3", "4", "5");
	var j = Math.round(Math.random() * (ziele.length-1));
	x = ziele[j];
	var y = "img/a" + x + ".jpg";
	MM_swapImage('max', '', y, 1);
}