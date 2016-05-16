// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
  zoom: 6,
  minZoom: 3,
}).setView([14.639081,101.4121505], 5);;

// create a new tile layer
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
layer = new L.TileLayer(tileUrl,
{
    attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
    maxZoom: 18
});

// add the layer to the map
map.addLayer(layer);

/*
var parisKievLL = [[1.3010655,103.8538013 ], [1.4618116, 103.7615745],[3.1393364,101.5467663],[2.7512352,101.7089291]];
var londonParisRomeBerlinBucarest = [[51.507222, -0.1275], [48.8567, 2.3508],
[41.9, 12.5], [52.516667, 13.383333], [44.4166,26.1]];
var londonBrusselFrankfurtAmsterdamLondon = [[51.507222, -0.1275], [50.85, 4.35],
[50.116667, 8.683333], [52.366667, 4.9], [51.507222, -0.1275]];
var barcelonePerpignanPauBordeauxMarseilleMonaco = [
    [41.385064, 2.173403],
    [42.698611, 2.895556],
    [43.3017, -0.3686],
    [44.837912, -0.579541],
    [43.296346, 5.369889],
    [43.738418, 7.424616]
];


//map.fitBounds(londonParisRomeBerlinBucarest);

//========================================================================
var marker1 = L.Marker.movingMarker(parisKievLL, [10000]).addTo(map);
L.polyline(parisKievLL).addTo(map);
marker1.once('click', function () {
    marker1.start();
    marker1.closePopup();
    marker1.unbindPopup();
    marker1.on('click', function() {
        if (marker1.isRunning()) {
            marker1.pause();
        } else {
            marker1.start();
        }
    });
    setTimeout(function() {
        marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
    }, 2000);
});

marker1.bindPopup('<b>Click me to start !</b>', {closeOnClick: false});
marker1.openPopup();

//========================================================================
var FlyfromKLToKunming = [[2.7512352,101.7089291],[25.1013443,102.9327304],[25.0439788,102.7157993]];
var marker2 = L.Marker.movingMarker(FlyfromKLToKunming, [10000]).addTo(map);
L.polyline(FlyfromKLToKunming, {color: 'red'}).addTo(map);

marker2.once('click', function () {
    map.flyTo([25.0439788,102.7157993],10);
      
});
//========================================================================
var secondday = [[25.0439788,102.7157993],[ 24.7515023,103.1782069],[25.0574642,102.6838499],[25.0439788,102.7157993]];
var marker3 = L.Marker.movingMarker(secondday, [10000]).addTo(map);
L.polyline(secondday, {color: 'green'}).addTo(map);
//========================================================================
var thirdday = [[25.0439788,102.7157993],[ 24.7515023,103.1782069],[25.0574642,102.6838499],[25.0439788,102.7157993]];
var marker4 = L.Marker.movingMarker(thirdday, [10000]).addTo(map);
L.polyline(thirdday, {color: 'green'}).addTo(map);
//========================================================================

var fourdday = [[25.0439788,102.7157993],[25.0513952,102.7011452],[25.0275218,102.6737143],[ 24.9617588,102.6634683]];
var marker5 = L.Marker.movingMarker(fourdday, [10000]).addTo(map);
L.polyline(fourdday, {color: '#FE642E'}).addTo(map);
//========================================================================

var fifthday = [[25.0439788,102.7157993],[25.0520444,102.703872],[25.040238,102.7136702],[ 25.1013443,102.9327304],[ 2.7512352,101.7089291],[1.3644256,103.9893421]];
var marker6 = L.Marker.movingMarker(fifthday, [10000]).addTo(map);
L.polyline(fifthday, {color: '#151515'}).addTo(map);
//========================================================================
*/
  var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left'
        });
        map.addControl(sidebar);
	function onEachFeature(feature, layer) {
			var popupContent = "<p> "+feature.properties.name + "</p>";

			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}
          
			layer.bindPopup(popupContent);
		}

var overLayers = [
	{
		name: "The first day",
	//	icon: iconByName('Drinking_water'),
		layer: L.geoJson(firstdaylayer,{onEachFeature: onEachFeature,pointToLayer: function(feature, latlng) {
            var insidemarker =  L.marker(latlng, {
              title :'The first day'
        });
        insidemarker.on('click', function(e) { 
         $('#sidebar').html(this.feature.content);
        sidebar.toggle();  
        });
        return insidemarker;
		}}),
		group: "The first day",
		markertype:"dropdown",
		marker:{ 
			"control":"accordioncheckbox",
			"displayname":"Store"},
		active:true,
		marker:true,
	},
    
    {
		name: "The second day",
	//	icon: iconByName('Drinking_water'),
		layer: L.geoJson(seconddaylayer,{onEachFeature: onEachFeature,pointToLayer: function(feature, latlng) {
        var insidemarker2 = L.marker(latlng, {
              title :'The second day'
        });
         insidemarker2.on('click', function(e) { 
           $('#sidebar').html(this.feature.content);
            sidebar.toggle();   
         });
        return insidemarker2;
		}}),
		group: "The second day",
		markertype:"dropdown",
		marker:{ 
			"control":"accordioncheckbox",
			"displayname":"The second day"},
		active:true,
		marker:true,
	},
    {
		name: "The third day",
	//	icon: iconByName('Drinking_water'),
		layer: L.geoJson(thirddaylayer,{onEachFeature: onEachFeature,pointToLayer: function(feature, latlng) {
        var insidemarker3 =  L.marker(latlng, {
              title :'The third day'
        });
         insidemarker3.on('click', function(e) { 
              $('#sidebar').html(this.feature.content);
            sidebar.toggle();  
         });
        return insidemarker3;
		}}),
		group: "The third day",
		markertype:"dropdown",
		marker:{ 
			"control":"accordioncheckbox",
			"displayname":"The third day"},
		active:true,
		marker:true,
	},,
    {
		name: "The fourth day",
	//	icon: iconByName('Drinking_water'),
		layer: L.geoJson(fourthdaylayer,{onEachFeature: onEachFeature,pointToLayer: function(feature, latlng) {
        var insidemarker4 =   L.marker(latlng, {
              title :'The fourth day'
        });
          insidemarker4.on('click', function(e) { 
                $('#sidebar').html(this.feature.content);
                sidebar.toggle();   
          });
        return insidemarker4;
		}}),
		group: "The fourth day",
		markertype:"dropdown",
		marker:{ 
			"control":"accordioncheckbox",
			"displayname":"The fourth day"},
		active:true,
		marker:true,
	},
    {
		name: "The fifth day",
	//	icon: iconByName('Drinking_water'),
		layer: L.geoJson(fifthdaylayer,{onEachFeature: onEachFeature,pointToLayer: function(feature, latlng) {
        var insidemarker5 =   L.marker(latlng, {
              title :'The fifth day'
        });
         insidemarker5.on('click', function(e) {
             $('#sidebar').html(this.feature.content);
             sidebar.toggle();
            });
        return insidemarker5;
		}}),
		group: "The fifth day",
		markertype:"dropdown",
		marker:{ 
			"control":"accordioncheckbox",
			"displayname":"The fifth day"},
		active:true,
		marker:true,
	}
];
var baseLayers = [
	{
		name: "Open Street Map",
		layer: new L.TileLayer("http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0",{getUrlArgs: function(a) {
            return {
                z: a.z,
                x: a.x,
                y: Math.pow(2, a.z) - 1 - a.y
            }
        }})
	}];
var panelLayers = new L.Control.PanelLayers(null,overLayers,null,null);
map.addControl(panelLayers);
  map.on('click', function () {
            sidebar.hide();
        });
/*
var marker2 = L.Marker.movingMarker(londonParisRomeBerlinBucarest,
    [3000, 9000, 9000, 4000], {autostart: true}).addTo(map);
L.polyline(londonParisRomeBerlinBucarest, {color: 'red'}).addTo(map);


marker2.on('end', function() {
    marker2.bindPopup('<b>Welcome to Bucarest !</b>', {closeOnClick: false})
    .openPopup();
});

//=========================================================================

var marker3 = L.Marker.movingMarker(londonBrusselFrankfurtAmsterdamLondon,
    [2000, 2000, 2000, 2000], {autostart: true, loop: true}).addTo(map);

marker3.loops = 0;
marker3.bindPopup('', {closeOnClick: false});

//=========================================================================

var marker4 = L.Marker.movingMarker([[45.816667, 15.983333]], []).addTo(map);

marker3.on('loop', function(e) {
    marker3.loops++;
    if (e.elapsedTime < 50) {
        marker3.getPopup().setContent("<b>Loop: " + marker3.loops + "</b>")
        marker3.openPopup();
        setTimeout(function() {
            marker3.closePopup();

            if (! marker1.isEnded()) {
                marker1.openPopup();
            } else {
                if (marker4.getLatLng().equals([45.816667, 15.983333])) {
                    marker4.bindPopup('Click on the map to move me !');
                    marker4.openPopup();
                }

            }

        }, 2000);
    }
});

map.on("click", function(e) {
    marker4.moveTo(e.latlng, 2000);
});

//=========================================================================

var marker5 = L.Marker.movingMarker(
    barcelonePerpignanPauBordeauxMarseilleMonaco,
    10000, {autostart: true}).addTo(map);

marker5.addStation(1, 2000);
marker5.addStation(2, 2000);
marker5.addStation(3, 2000);
marker5.addStation(4, 2000);

L.polyline(barcelonePerpignanPauBordeauxMarseilleMonaco,
    {color: 'green'}).addTo(map);
*/