
(function($){
    $.fn.faceDetection = function(settings){
		var options = {
			confidence:null,
			start:function(img) {
			},
			complete:function(img, coords) {
			},
			error:function(img, code, message) {
			}
		}
		$.extend(options, settings);

		var $$ = $(this);
		options.start($$);	
		
		if (!$$.is('img')) {
			options.error($$, 1, 'Dies ist kein Bild.');
			options.complete($$, []);
			return [];
		}

		function resizeCanvas(image, canvas) {
			canvas.width = image.offsetWidth;
			canvas.height = image.offsetHeight;
		}
		
		// Grayscale function 
		function grayscale(image) {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			
			canvas.width  = image.offsetWidth;
			canvas.height = image.offsetHeight;
			
			ctx.drawImage(image, 0, 0);
			var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			var data = imageData.data;
			var pix1, pix2, pix = canvas.width * canvas.height * 4;
			while (pix > 0) {
				data[pix -= 4] = data[pix1 = pix + 1] = data[pix2 = pix + 2] = (data[pix] * 0.3 + data[pix1] * 0.59 + data[pix2] * 0.11);
			}
			ctx.putImageData(imageData, 0, 0);
			return canvas;
		}

		function detect() {		
			try {
				var coords = lib.detect_objects(grayscale( $$.get(0)), cascade, 5, 1);
			} catch(e) {
				options.error($$, 2, 'Bild wird nicht akzeptiert.');
				return [];
			}
			
			var positionX 	= $$.position().left;
			var positionY 	= $$.position().top;	
			var offsetX 	= $$.offset().left;
			var offsetY 	= $$.offset().top;
			var newCoords 	= [];

			for (var i = 0; i < coords.length; i++) {
				if (options.confidence == null || coords[i].confidence >= options.confidence) {
					newCoords.push({
						x:			Math.round(coords[i].x),
						y:			Math.round(coords[i].y),
						width:		Math.round(coords[i].width),
						height:		Math.round(coords[i].height+7),
						positionX:	positionX + coords[i].x,
						positionY:	positionY + coords[i].y,
						offsetX:	offsetX + coords[i].x,
						offsetY:	offsetY + coords[i].y,
						confidence:	coords[i].confidence,
						neighbour:	coords[i].neighbour
					});
				}
			}
			return newCoords;
		}
		
		
		var coords = detect();
		options.complete($$, coords);
	
		return coords;
    };
})(jQuery);