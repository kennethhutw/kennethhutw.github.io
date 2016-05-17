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


var myTrip = [[1.3010655,103.8538013],[1.4618116,103.7615745],[3.1393364,101.5467663],[2.7512352,101.7089291],[25.1013443,102.9327304],[25.0439788,102.7157993],[24.7515023,103.1782069],[25.0700448,103.3500283],[25.0439788,102.7157993],[25.0513952,102.7011452],[25.0275218,102.6737143],[24.9617588,102.6634683],[25.0347297, 102.7083859],[25.0439788,102.7157993],[25.0520444,102.703872],[25.0395304, 102.7071431],[25.1013443,102.9327304],[2.7512352,101.7089291],[1.3644256, 103.9893421]];
var greenIcon = L.icon({
    iconUrl: 'me2.png',
    iconSize:     [60, 60]
});
var marker2 = L.Marker.movingMarker(myTrip,
    [3000, 9000, 9000, 4000, 4000, 4000, 4000,3000, 9000, 9000, 4000, 4000, 4000, 4000,4000, 4000, 4000, 4000], {autostart: true})
 marker2.setIcon(greenIcon);   
    
    L.polyline(myTrip, {color: 'red'}).addTo(map);
    marker2.on('start', function() {
    marker2.bindPopup('<b>Welcome!  This is my 2016/5/1 Holiday !</b> <p>You can click each marker <img src="../js/images/marker-icon.png"  title="The fifth day" style=" width: 25px; height: 41px;"> to see the details. </P> ', {closeOnClick: false})
    .openPopup();
        setTimeout(function() {
        marker2.bindPopup('<b>Click me!! Click me !!</b>').openPopup();
    }, 10000);
});
    marker2.on('end', function() {
    marker2.bindPopup('<b>2016/5/1 Holiday Done !</b>', {closeOnClick: false})
    .openPopup();
});
marker2.once('click', function () {
    marker2.start();
    marker2.closePopup();
    marker2.unbindPopup();
    marker2.on('click', function() {
        if (marker2.isRunning()) {
            marker2.pause();
        } else {
            marker2.start();
        }
    });
    setTimeout(function() {
        marker2.bindPopup('<b>Click me!! Click me !!</b>').openPopup();
    }, 2000);
});
marker2.addTo(map);
// add the layer to the map
//map.addLayer(layer);

/*

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
		  sidebar.hide();
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





  map.on('click', function () {
            sidebar.hide();
        });
		
L.TileLayer.WebDogTileLayer = L.TileLayer.extend({
    getTileUrl: function (tilePoint) {
        var urlArgs,
            getUrlArgs = this.options.getUrlArgs;
 
        if (getUrlArgs) {
            var urlArgs = getUrlArgs(tilePoint);
        } else {
            urlArgs = {
                z: tilePoint.z,
                x: tilePoint.x,
                y: tilePoint.y
            };
        }
 
        return L.Util.template(this._url, L.extend(urlArgs, this.options, {s: this._getSubdomain(tilePoint)}));
    }
});
 
L.tileLayer.webdogTileLayer = function (url, options) {
    return new L.TileLayer.WebDogTileLayer(url, options);
};
var url = 'http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0',
    options = L.extend({
        subdomain: '012'},{

		
		   subdomains: "012",
        getUrlArgs: function (tilePoint) {
            return {
                z: tilePoint.z,
                x: tilePoint.x,
                y: Math.pow(2, tilePoint.z) - 1 - tilePoint.y
            };
        }        
    });
	L.tileLayer.webdogTileLayer(url, options);
	var baseLayers = [
	{
		name: "Open Street Map",
		layer: new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
		active: true
	},{
		name: "QQ Map",
		layer: new L.tileLayer.webdogTileLayer(url, options)
	}];
	var panelLayers = new L.Control.PanelLayers(baseLayers,overLayers,null,null);
map.addControl(panelLayers);


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-65211878-2', 'auto');
  ga('send', 'pageview');

