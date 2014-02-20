<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">

	<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	<script src="http://code.jquery.com/jquery-1.4.3.min.js"></script> 
	<script src="js/facedetection/lib.js"></script> 
	<script src="js/facedetection/face.js"></script>
	<script src="js/facedetection/changepic.js"></script>
	<script src="js/jquery.facedetection.js"></script>
	
	<script>
	$(function() {
		$('#gibgas').click(function() {
			var $this = $(this);
			
			var coords = $('img').faceDetection({
				complete:function() {
					$this.text('Fertig!');
				},
				error:function(img, code, message) {
					$this.text('Fehler!');
					alert('Error: '+message);
				}
			});
			
			for (var i = 0; i < coords.length; i++) {
				$('<div>', {
					'class':'face',
					'css': {
						'position':	'absolute',
						'left':		coords[i].positionX +'px',
						'top':		coords[i].positionY +'px',
						'width': 	coords[i].width		+'px',
						'height': 	coords[i].height	+'px'
					}
				})
				.appendTo('#content');
			}
		});
		return false;
	});
	</script>
	<style>
		.face {
			border:2px solid #EF0E2C;
		}
	</style>


</head>

<body>
<div id="container">
	<div id="header">
		<h1>Gesichtserkennung, Versuch 1 :-)</h2>

	</div>
	<br><br>
	<div id="content">
		<!--<pre>var coords = $('#myPicture').faceDetection();</pre>-->
		<pre>&copy by daniel kaminski</pre>
		
		
<?php
		$bilder=array("a0.jpg","a1.jpg","a2.jpg","a3.jpg","a4.jpg","a5.jpg");
		mt_srand ((double)microtime()*1000000);
		$zahl = mt_rand(0,(count($bilder) - 1));
		echo "<a href='#'><img src='img/".$bilder[$zahl]."' alt='' name='max'   border='0' id='max' onclick='tauscheBild();'></a>"; 
?>
<br>
		<a href="#" id="gibgas">Klick!</a><br><br>
		<a href="index.php" id="gibgas">Bild generieren!</a>
	</div>
	
</div>

</body>
</html>