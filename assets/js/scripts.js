(function(){
    window.app 			                   = {el : {}, fn : {}};
    app.el['window']                   = $(window);
    app.el['document']                 = $(document);
    app.el['twitterer']              = $('.twitterer');
    app.el['back-to-top']              = $('.back-to-top');
    app.el['html-body']                = $('html,body');	
    app.el['loader']                   = $('#loader');
    app.el['mask']                     = $('#mask');

app.fn.screenSize = function() {
    var size, width = app.el['window'].width();
    if(width < 320) size = "Not supported";
	else if(width < 480) size = "Mobile portrait";
	else if(width < 768) size = "Mobile landscape";
	else if(width < 960) size = "Tablet";
	else size = "Desktop";
    if (width < 768){$('.animated').removeClass('animated').removeClass('hiding');}
		// $('#screen').html( size + ' - ' + width );
		// console.log( size, width );
	};	

$(function() {	
    //Preloader
    app.el['loader'].delay(200).fadeOut();
    app.el['mask'].delay(700).fadeOut("slow");    
    app.el['window'].resize(function() {
		app.fn.screenSize();
	});		

$(window).scroll(function () {
      if ($(this).scrollTop() > 600) {
        app.el['back-to-top'].fadeIn();
      } else {
        app.el['back-to-top'].fadeOut();
      }
});

$(window).scroll(function () {
      if ($(this).scrollTop() > 600) {
        app.el['twitterer'].fadeIn();
      } else {
        app.el['twitterer'].fadeOut();
      }
 });

app.el['back-to-top'].click(function () {
      app.el['html-body'].animate({
        scrollTop: 0
      }, 1500);
      return false;
});

 $('#mobileheader').html($('#header').html());

function heroInit() {
        var hero        = jQuery('#hero'),
            winHeight   = jQuery(window).height(),
            heroHeight  = winHeight;
        hero.css({height: heroHeight+"px"});
};
      
jQuery(window).on("resize", heroInit);
jQuery(document).on("ready", heroInit);
    
$('.navigation-bar').onePageNav({
        currentClass: 'active',
        changeHash: true,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        easing: 'swing'
});
    
$('.animated').appear(function(){
      var element = $(this);
      var animation = element.data('animation');
      var animationDelay = element.data('delay');
      if (animationDelay) {
        setTimeout(function(){
          element.addClass( animation + " visible" );
          element.removeClass('hiding');
          if (element.hasClass('counter')) {
            element.find('.value').countTo();
          }
        }, animationDelay);
      }else {
        element.addClass( animation + " visible" );
        element.removeClass('hiding');
        if (element.hasClass('counter')) {
          element.find('.value').countTo();
        }
      }    
    },{accY: -150});
    
    $('#header').waypoint('sticky', {
        wrapper: '<div class="sticky-wrapper" />',
        stuckClass: 'sticky'
    }); 
});

$('#sidebar').affix({
     offset: {
        top: 5
      }
});

$('body').scrollspy({ target: '#sidebar' });

	
// ****** COMO MAP Gray Scaled  *******
var map;
var OSMgs

function init() {
	
if (!OpenLayers.CANVAS_SUPPORTED) {
	 var unsupported = OpenLayers.Util.getElement('unsupported');
	 unsupported.innerHTML = 'Your browser does not support canvas, nothing to see here !';
}

OSMgs = new OpenLayers.Layer.OSM('OSM Grey Scaled', null, {
 	opacity:0.3,
 	eventListeners: {
 		tileloaded: function(evt) {
 			var ctx = evt.tile.getCanvasContext();
 			if (ctx) {
 				var imgd = ctx.getImageData(0, 0, evt.tile.size.w, evt.tile.size.h);
 				var pix = imgd.data;
 				for (var i = 0, n = pix.length; i < n; i += 4) {
 					pix[i] = pix[i + 1] = pix[i + 2] = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) / 8;
 					}
 				ctx.putImageData(imgd, 0, 0);
 				evt.tile.imgDiv.removeAttribute("crossorigin");
 				evt.tile.imgDiv.src = ctx.canvas.toDataURL();
 			}
 		}
 	}
});
                                                       
map = new OpenLayers.Map('map',{
	projection: "EPSG:900913",
    controls: []
});
map.addLayers([OSMgs]);
var attr = new OpenLayers.Control.Attribution();
map.addControl(attr);
map.setCenter(new OpenLayers.LonLat(9.0961572,45.8040398).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject()), 15);
}


var mapc, OSMc, hotc,gsat;
if (!OpenLayers.CANVAS_SUPPORTED) {var unsupported = OpenLayers.Util.getElement('unsupported'); unsupported.innerHTML = 'Your browser does not support canvas, get a new one';}
OSMgsc = new OpenLayers.Layer.OSM('OSM Grey Scaled', null, {opacity:0.7,eventListeners: {tileloaded: function(evt) {var ctx = evt.tile.getCanvasContext();if (ctx) {var imgd = ctx.getImageData(0, 0, evt.tile.size.w, evt.tile.size.h);var pix = imgd.data;for (var i = 0, n = pix.length; i < n; i += 4) {pix[i] = pix[i + 1] = pix[i + 2] = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) / 8;}ctx.putImageData(imgd, 0, 0);evt.tile.imgDiv.removeAttribute("crossorigin");evt.tile.imgDiv.src = ctx.canvas.toDataURL();}}}}); 
OSMc = new OpenLayers.Layer.OSM();
hotc = new OpenLayers.Layer.OSM("Humanitarian Style", ["http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png","http://b.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png","http://c.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png"],{attribution: "© <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> contributors","tileOptions": { "crossOriginKeyword": null }});
gsat = new OpenLayers.Layer.Google("Google Satellite",{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22});
function init1() {

var mapc = new OpenLayers.Map('mapc',{
        projection: "EPSG:900913",
    controls: [new OpenLayers.Control.Navigation({'zoomWheelEnabled': false})]
});

mapc.addLayers([OSMgsc,hotc,gsat,OSMc]);

var style = new OpenLayers.Style(
    {
        strokeColor: '#000000', 
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "butt",
        fillColor: "#ffffff",
        fillOpacity: 0.3
    },
    {
        rules: [
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "foo",
                    value: "1" 
                }),
                symbolizer: { 
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    strokeLinecap: "butt",
                    pointRadius: 18,
                    fillColor: "#fc6205",
                    fillOpacity: 1,
cursor: "pointer"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "foo",
                    value: "2" 
                }),
                symbolizer: { 
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    strokeLinecap: "butt",
                    pointRadius: 10,
                    fillColor: "#fcae05",
                    fillOpacity: 1,
cursor: "pointer"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "foo",
                    value: "3" 
                }),
                symbolizer: { 
                    strokeColor: '#ffffff',
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    strokeLinecap: "butt",
                    pointRadius: 6,
                    fillColor: "#5cc8e7",
                    fillOpacity: 1,
cursor: "pointer"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "foo",
                    value: "4" 
                }),
                symbolizer: { 
                    strokeColor: '#ffffff',
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    strokeLinecap: "butt",
                    pointRadius: 10,
                    fillColor: "#5cc8e7",
                    fillOpacity: 1,
cursor: "pointer"
                }
            }),
            new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "foo",
                    value: "5" 
                }),
                symbolizer: { 
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    strokeLinecap: "butt",
                    pointRadius: 7,
                    fillColor: "blue",
                    fillOpacity: 1,
cursor: "pointer"
                }
            })

        ]
    }
);

vlayer = new OpenLayers.Layer.Vector("GeoJSON", {
	    projection: "EPSG:4326",
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: "foss4ge.json",
                format: new OpenLayers.Format.GeoJSON()
            }),
            styleMap: style,
	    eventListeners: {
               'featureselected': function(evt) {
                   var feature = evt.feature;
                   popup = new OpenLayers.Popup.CSSFramedCloud("popup",
		   OpenLayers.LonLat.fromString(feature.geometry.toShortString()),
                   null,
                   "<div style='display:block;'><span style='color:#333333;font-weight:400;display:block;font-size:16px;'> " + feature.attributes.name + "</span><span style='color:#707070;font-weight:300;display:block;font-size:14px;'>" + feature.attributes.description + "</span><span style='font-weight:200;display:block;font-size:13px;color:#707070'>" + feature.attributes.address + "</span></div>",
                                null,
                                true,
function onPopupClose(evt) {selector.unselect(feature);}
                                );
            feature.popup = popup;
            mapc.addPopup(popup);
                    },
                    'featureunselected': function(evt) {
                        var feature = evt.feature;
                        mapc.removePopup(feature.popup);
                        feature.popup.destroy();
                        feature.popup = null;

                    }
                }
            
        });


var selector = new OpenLayers.Control.SelectFeature(vlayer,{
    hover:false,
    autoActivate:true
});

mapc.addControl(selector);
mapc.addLayer(vlayer);

var attr = new OpenLayers.Control.Attribution();
mapc.addControl(attr);
mapc.setCenter(new OpenLayers.LonLat(9.09351,45.8032).transform(new OpenLayers.Projection("EPSG:4326"),mapc.getProjectionObject()), 15);

$('.osmn').click(function () {
      mapc.setBaseLayer(OSMc);
    });

$('.hum').click(function () {
      mapc.setBaseLayer(hotc);
    });

$('.gsat').click(function () {
      mapc.setBaseLayer(gsat);
    });

$('.osmw').click(function () {
      mapc.setBaseLayer(OSMgsc);
    });



$('.zoomminus').click(function () {
      mapc.zoomOut();
      event.preventDefault();
    });
$('.zoomplus').click(function () {
      mapc.zoomIn();
      event.preventDefault();
    });

}


				
window.onload = function() { init();init1(); }


$(function() {
    $(window).bind("resize", function() {
        var height = $(window).height();
        var k = 133;

        $('#mapc').height(height - k);

    }).trigger("resize");
});


})();




