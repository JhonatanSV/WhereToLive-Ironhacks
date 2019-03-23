var districts_url = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?							where=1=1&outFields=*&outSR=4326&f=geojson";
var crimes_url = "https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=2015-12-31T00:00:00.000";
var affordabilty_url = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
var neibor_url="https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";

var data_crime=[];
var data_districts=[];
var data_afford=[];
var data_neibor=[];





var todo = {
	"MANHATTAN": [],
	"BROOKLYN": [],
	"QUEENS": [],
	"BRONX": [],
	"StatenIsland": []
};

var topDistancesCrimes=[];
var topDistancesAfford=[];
var topCrimesAfford=[];
var topDistancesCrimesAfford=[];



var centers = {};
var distances = [];
var crimes_d = [];
var affor_d = [];
var markers = [];

var hju;

var markerIcon = {
	url: "https://img.icons8.com/color/40/000000/marker.png",
};



var ind;
var punt = 1;
labels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

const nyu = {
	lat: 40.7291,
	lng: -73.9965
};



async function load_data() {
  return new Promise((resolve,reject) => {
 setTimeout(() => {
	$.get(districts_url, function (response) {




    fillTodo();

    doPolygons();

    loadCrimes();

		loadAfford();

 		filltops();

    fillTableTops();

    loadNeibor();



         function clearMarkers() {
			setMapOnAll(null);
		}

		function deleteMarkers() {
			clearMarkers();
			markers = [];
		}

     function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

		$('#sel1').change(function () {




			var selectedText = $(this).find("option:selected").text();


      if(selectedText == "High")
      	punt=1;
      else if (selectedText == "Low")
				punt = 2;
			else if (selectedText == "Medium")
        punt=3;


			deleteMarkers();

			tableReference = $("#Table1Body")[0];
			var newRow, borough, district, distance;
			document.getElementById('change').innerHTML = 'Distances';
			$(function () {
				$('#text-muted').text(" DISTANCES");
			});
			tableReference.innerHTML = "";



			if (punt == 1) {
				showtops(0,10,distances,distance);
			} else if (punt == 2) {
				showtops(10,20,distances,distance);
			} else if(punt==3) {
				showtops(20,30,distances,distance);
			}

		});

    $('#sel2').change(function () {
      var selectedText = $(this).find("option:selected").text();

      if(selectedText == "High")
      	punt=1;
      else if (selectedText == "Low")
				punt = 2;
			else if (selectedText == "Medium")
        punt=3;

      tableReference = $("#Table1Body")[0];
			var newRow, borough, district, distance;
			document.getElementById('change').innerHTML = 'Crimes';
			$(function () {
				$('#text-muted').text(" CRIMES");
			});
			tableReference.innerHTML = "";
      deleteMarkers();

      if(punt==1) {
				showtops(0,10,crimes_d,distance);
			}else if(punt==2) {
				showtops(10,20,crimes_d,distance);
			}else if(punt==3) {
				showtops(20,30,crimes_d,distance);
			}
    });


			$('#sel3').change(function () {
				var selectedText = $(this).find("option:selected").text();

				if (selectedText == "High")
					punt = 1;
				if (selectedText == "Low")
					punt = 2;
				if (selectedText == "Medium")
					punt = 3;
				deleteMarkers();

				tableReference = $("#Table1Body")[0];
				var newRow, borough, district, points_d;
				tableReference.innerHTML = "";
				document.getElementById('change').innerHTML = 'Affordability';
				$(function () {
					$('#text-muted').text(" AFFORDABILITY");
				});

				if(punt==1) {
				showtops(0,10,affor_d,distance);
			}else if(punt==2) {
				showtops(10,20,affor_d,distance);
			}else if(punt==3) {
				showtops(20,30,affor_d,distance);
			}


			});

    $('#sel4').change(function () {
				var selectedText4 = $(this).find("option:selected").text();
      console.log(selectedText4);
      tableReference = $("#Table1Body")[0];
				var newRow, borough, district, distances;
				tableReference.innerHTML = "";


			if (selectedText4 == "C-A"){
				punt = 1;
      document.getElementById('change').innerHTML = 'Closeness-Affordability';

      }
			else if (selectedText4 == "C-S"){
				punt = 2;
        document.getElementById('change').innerHTML = 'Closeness-Security';

      }
			else if (selectedText4 == "S-A"){
				punt = 3;
        document.getElementById('change').innerHTML = 'Security-Affordability';

      }
      else if (selectedText4 == "C-S-A"){
				punt = 4;
        document.getElementById('change').innerHTML = 'Closeness-Affordability-Security';

      }

				deleteMarkers();

				$(function () {
					$('#text-muted').text(" MIXED TOP");
				});

				if(punt==1) {
				showtops(0,10,topDistancesAfford,distance);
			}else if(punt==2) {
				showtops(0,10,topDistancesCrimes,distance);
			}else if(punt==3) {
				showtops(0,10,topCrimesAfford,distance);
			}else if(punt==4)
        showtops(0,10,topDistancesCrimesAfford,distance);


			});







	});
console.log("geoshapes ");
   console.log(data_crime);
                resolve("geo data ");
        }, 100);
    });

}

function filltops(){
  for(i=0;i<10;i++){
        var temp={};
        var p=findObject(crimes_d,0,distances[i].id,i,2);
          temp.points = p[0];
					temp.crimes = p[1].points;
    			temp.distance=distances[i].points;
					temp.id = distances[i].id;
					temp.borough = distances[i].borough;
					topDistancesCrimes.push(temp);
      }

      for(i=0;i<10;i++){
        var temp1={};
        var p1=findObject(affor_d,0,distances[i].id,i,3);
					temp1.points = p1[0];
        	temp1.afford=p1[1].points;
          temp1.distance=distances[i].points;
					temp1.id = distances[i].id;
					temp1.borough = distances[i].borough;
					topDistancesAfford.push(temp1);
      }

      for(i=0;i<10;i++){
        var temp2={};
        var p2=findObject(affor_d,0,crimes_d[i].id,i,2);
          temp2.afford=p2[1].points;
          temp2.crimes=crimes_d[i].points;
					temp2.points = p2[0];
					temp2.id = crimes_d[i].id;
					temp2.borough = crimes_d[i].borough;
					topCrimesAfford.push(temp2);
      }

       for(i=0;i<10;i++){
        var temp3={};
        var p3=findObject(affor_d,crimes_d,distances[i].id,i,2);
					temp3.points = p3[0];
          temp3.distance=distances[i].points;
          temp3.afford=p3[1].points;
          temp3.crimes=p3[2].points;
					temp3.id = distances[i].id;
					temp3.borough = distances[i].borough;
					topDistancesCrimesAfford.push(temp3);
      }

  topDistancesCrimes.sort(function (a, b) {
			return a.points - b.points;
		});

  topDistancesAfford.sort(function (a, b) {
			return a.points - b.points;
		});

  topCrimesAfford.sort(function (a, b) {
			return a.points - b.points;
		});

  topDistancesCrimesAfford.sort(function (a, b) {
			return a.points - b.points;
		});


}

async function getJson() {
return new Promise((resolve,reject) => {
            var data1 = $.get(crimes_url, function(){}).done(function(){
              data_crime = data1.responseJSON;
               });
  					var data2 = $.get(districts_url,function(){}).done(function(){
             data_districts = JSON.parse(data2.responseText);
               });
 					  var data3 = $.get(affordabilty_url, function(){}).done(function(){
              data_afford= data3.responseJSON.data;
               });
 					 var data4 = $.get(neibor_url, function(){}).done(function(){
              data_neibor = data4.responseJSON.data;
               });
  resolve("geo data saved");

    });
}


function fillTodo(){
      data = data_districts;
		var no_districts = [164, 355, 356, 481, 482, 484, 595, 226, 228, 227, 483, 487, 480];
		for (i = 0; i < data.features.length; i++) {
			current_district = data.features[i];
			is_valid_district = true;
			for (j = 0; j < no_districts.length; j++) {
				if (current_district.properties.BoroCD == no_districts[j])
					is_valid_district = false;
			}
			if (!is_valid_district)
				continue;
			var new_district = {};
			new_district.id = current_district.properties.BoroCD;
			new_district.coordinates = [];
			if (current_district.geometry.type == "Polygon") {
				for (j = 0; j < current_district.geometry.coordinates.length; j++) {
					var sub_cor = [];
					for (k = 0; k < current_district.geometry.coordinates[j].length; k++) {
						sub_cor.push({
							lng: current_district.geometry.coordinates[j][k][0],
							lat: current_district.geometry.coordinates[j][k][1]
						});
					}
					new_district.coordinates.push(sub_cor);
				}
			} else {
				for (l = 0; l < current_district.geometry.coordinates.length; l++) {
					for (j = 0; j < current_district.geometry.coordinates[l].length; j++) {
						var sub_cor1 = [];
						for (k = 0; k < current_district.geometry.coordinates[l][j].length; k++) {
							sub_cor1.push({
								lng: current_district.geometry.coordinates[l][j][k][0],
								lat: current_district.geometry.coordinates[l][j][k][1]
							});


						}
						new_district.coordinates.push(sub_cor1);
					}
				}
			}


			var sum_lat = 0;
			var sum_lng = 0;
			var cont = 0;
			var current_cor = {};
			var center = {};
			for (j1 = 0; j1 < new_district.coordinates.length; j1++) {
				for (i1 = 0; i1 < new_district.coordinates[j1].length; i1++) {
					if (cont == 0 || distance(current_cor, new_district.coordinates[j1][i1]) > 1000) {
						cont++;
						current_cor.lat = new_district.coordinates[j1][i1].lat;
						current_cor.lng = new_district.coordinates[j1][i1].lng;
						sum_lat += new_district.coordinates[j1][i1].lat;
						sum_lng += new_district.coordinates[j1][i1].lng;
					}
				}
			}


			center_lats = sum_lat / cont;
			center_lngs = sum_lng / cont;
			center.lat = center_lats;
			center.lng = center_lngs;
			center.dis = new_district.id;
			centers[new_district.id] = center;
			temp = {};
			temp.points= distance(center, nyu);
			temp.id = center.dis;


			new_district.crimes = 0;
			new_district.points = 0;
			new_district.distances = temp.points;
			if (new_district.id < 200) {
				todo.MANHATTAN.push(new_district);
				temp.borough = "MANHATTAN";
			} else if (new_district.id < 300) {
				todo.BRONX.push(new_district);
				temp.borough = "BRONX";
			} else if (new_district.id < 400) {
				todo.BROOKLYN.push(new_district);
				temp.borough = "BROOKLYN";
			} else if (new_district.id < 500) {
				todo.QUEENS.push(new_district);
				temp.borough = "QUEENS";
			} else {
				todo.StatenIsland.push(new_district);
				temp.borough = "STATEN ISLAND";
			}
			distances.push(temp);
		}
  distances.sort(function (a, b) {
			return a.points - b.points;
		});

     for(i=0;i<distances.length;i++){
        distances[i].top=i+1;
      }
    }

function doPolygons(){
  var colors = ['blue', 'red', 'orange', 'purple', 'green'];
		var c = 0;


		for (var key in todo) {
			for (i = 0; i < todo[key].length; i++) {

				todo[key][i].polygons = [];


				var pol = new google.maps.Polygon({
					paths: todo[key][i].coordinates,
					strokeColor: colors[c],
					strokeOpacity: 80,

					strokeWeight: 2,
					fillColor: colors[c],
					fillOpacity: 0.3,
				});

        var string=key+" district: "+todo[key][i].id;
        attachPolygonInfoWindow(pol,todo[key][i],key);
        pol.setMap(map);

				todo[key][i].polygons.push(pol);

			}
			c++;
		}
}

function attachPolygonInfoWindow(polygon,name,borough) {
  var opa;

    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(polygon, 'click', function (e) {
      var infoN="";
     for(i=0;i<name.neiborghoods.length;i++){
       if(i==0)
         infoN+=name.neiborghoods[i];
       else
      	infoN+=","+name.neiborghoods[i];

     }

        infoWindow.setContent('<h4 class="mapview" style="color:#4C7AFF">'+borough+'</h4>'+
        '<h5>'+'District ' +(name.id) +'</h5>'+
        '<div id="mapviewcontainer">' +'<div id="listmap" >'+'<h5>' +'Distance to the University : '+'</h5>'+ name.distances.toFixed(2)+ ' km'+'</div>'+
        '<div id="listmap" >'+'<h5>'+'Crimes: '+'</h5>'+name.crimes+'<br>'+'</div>'+
        '<div id="listmap" >'+'<h5>'+'Low income units :'+'</h5>'+name.points+'<br>'+'</div>'+
        '<div id="listmap1">'+'<h5>'+'Neighborhoods: '+'</h5>'+infoN)+'<br>'+'</div>'
        ;

        var latLng = e.latLng;
        infoWindow.setPosition(latLng);
        infoWindow.open(map);
    });

  	google.maps.event.addListener(polygon,'mouseover', function(event){
				name.polygons.forEach(function (polygon){
          polygon.setOptions({
            fillOpacity:0.8,

        });


    });
      });

    google.maps.event.addListener(polygon, 'mouseout', function (e) {
     name.polygons.forEach(function (polygon){
          polygon.setOptions({
            fillOpacity:0.3,

        });
    });
        infoWindow.close(map);
    });
}

function loadCrimes(){
        for (i = 0; i < data_crime.length; i++) {
				s = data_crime[i].boro_nm;

				if (s.length > 10) {
					s = "StatenIsland";
				}

				var a = located(data_crime[i].latitude, data_crime[i].longitude, s);
				if (a == "j")
					continue;

				todo[s][a].crimes++;
			}

			for (var key in todo) {
				for (j = 0; j < todo[key].length; j++) {
					var crim = {};
					crim.points = todo[key][j].crimes;
					crim.id = todo[key][j].id;
					crim.borough = key;
					crimes_d.push(crim);
				}

			}
			crimes_d.sort(function (a, b) {
				return a.points - b.points;
			});

      for(i=0;i<crimes_d.length;i++){
        crimes_d[i].top=i+1;
      }
      }

function loadAfford(){
      for (i = 0; i < data_afford.length; i++) {

				s = data_afford[i][15].toLocaleUpperCase();

				if (s.length > 10) {
					s = "StatenIsland";
				}

				if (data_afford[i][23] == null || data_afford[i][24] == null || data_afford[i][33] == "0")
					continue;

				var a = located(data_afford[i][23], data_afford[i][24], s);

				if (a == "j")
					continue;
				todo[s][a].points += Number(data_afford[i][33]);
			}

			for (var key in todo) {
				for (j = 0; j < todo[key].length; j++) {
          todo[key][j].neiborghoods=[];
					var aff = {};
					aff.points = todo[key][j].points;
					aff.id = todo[key][j].id;
					aff.borough = key;
					affor_d.push(aff);
				}
			}
			affor_d.sort(function (a, b) {
				return b.points - a.points;
			});

       for(i=0;i<affor_d.length;i++){
        affor_d[i].top=i+1;
      }
    }


function loadNeibor(){


      for (i = 0; i < data_neibor.length; i++) {
        s = data_neibor[i][16].toLocaleUpperCase();
				if (s.length > 10) {
					s = "StatenIsland";
				}
      var coordenadas= data_neibor[i][8].split(" ");
        coordenadas[1]=coordenadas[1].substring(1);
        coordenadas[2]=coordenadas[2].substring(0, coordenadas[2].length-1);
			var a = located(coordenadas[2], coordenadas[1], s);


      if (a == "j")
					continue;

      todo[s][a].neiborghoods.push(data_neibor[i][10]);
    }
}


function distance(cor1, cor2) {
	return (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cor1.lat, cor1.lng), new google.maps.LatLng(cor2.lat, cor2.lng)));
}


function showtops(index,tope,top,type){
        var option="";
  			var string="";
        for (i = index; i < tope; i++) {

					newRow = tableReference.insertRow(tableReference.rows.length);
					borough = newRow.insertCell(0);
					district = newRow.insertCell(1);
					type = newRow.insertCell(2);
					district.innerHTML = top[i].id;
					borough.innerHTML = top[i].borough;
          if(top==distances){
            option=" meters";
            string=top[i].points.toFixed(2) + option;
          }else
            string=top[i].points;


          if(top==topDistancesCrimes)
            string=top[i].distance.toFixed(2)+" meters and "+top[i].crimes+" crimes";
          if(top==topDistancesAfford)
            string=top[i].distance.toFixed(2)+" meters and "+top[i].afford+" points";
          if(top==topCrimesAfford)
            string=top[i].crimes+" crimes and "+top[i].afford+" afford";
          if(top==topDistancesCrimesAfford)
            string=top[i].distance.toFixed(2)+" meters, "+top[i].crimes+" crimes and "+top[i].afford+" afford";


					type.innerHTML = string;

					ind = top[i].id;
					markers[i%10] = new google.maps.Marker({
						position: {
							lat: centers[ind].lat,
							lng: centers[ind].lng
						},
						animation: google.maps.Animation.DROP,
						icon: markerIcon,
						label: {
							text: labels[i % 10],
							fontSize: "16px",
							fontWeight: "bold"
						},
						map: map,
					});
				}
      }


function fillTableTops(){
  tableReference = $("#TabletopBody")[0];
  var newRow, borough, district, datatable;
  var top=topDistancesCrimesAfford;

  for(i=0;i<3;i++){
  newRow = tableReference.insertRow(tableReference.rows.length);
  borough = newRow.insertCell(0);
	district = newRow.insertCell(1);
	datatable = newRow.insertCell(2);
	district.innerHTML = top[i].id;
	borough.innerHTML = top[i].borough;
  string=top[i].distance.toFixed(2)+" meters, "+top[i].crimes+" crimes and "+top[i].afford+" afford";
	datatable.innerHTML = string;
}
}


function findObject(array,array1,id,top,num){
  var resultado2={};
  resultado2.top=0;
  var resultado = array.find( district => district.id === id );
  if(array1!=0)
  resultado2 = array1.find( district => district.id === id );


  return [(resultado.top+resultado2.top+top)/num,resultado,resultado2];
}

function csvbutton1(){
  var html = document.querySelector("table").outerHTML;
    exportTable1(html, "tableTop10.csv");
}

function csvbutton2(){
  var html = document.querySelector("table").outerHTML;
    exportTable2(html, "tableTop3.csv");
}

function exportTable1(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

  	if(rows.length<6){
      ind=0;
      tope=1;
    }else{
      ind=0;
      tope=11;
    }

    for (var i = ind; i < tope; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","));
    }
    download_csv(csv.join("\n"), filename);
}

function exportTable2(html, filename) {
    var csv = [];
    var ind,tope;

    var rows = document.querySelectorAll("table tr");
    if(rows.length<6){
      ind=1;
      tope=5;
    }else{
      ind=11;
      tope=15;
    }
    for (var i = ind; i < tope; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(","));
    }
    download_csv(csv.join("\n"), filename);
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}



function located(lat, lng, name) {

	coordinate = new google.maps.LatLng(lat, lng);
	for (j = 0; j < todo[name].length; j++) {
		for (k = 0; k < todo[name][j].polygons.length; k++) {
			if (google.maps.geometry.poly.containsLocation(coordinate, todo[name][j].polygons[k]))
				return j;
		}
	}

	return "j";
}


$(document).ready(async () => {

        await getJson();

   console.log("listo getJSON");



   console.log(data_crime);

   await load_data();
  console.log("listo todo");


});
