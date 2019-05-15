var map,
	mapOptions = {
		center: { lat: 53.4723679, lng: -2.363546 },
		zoom: 6,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		styles: [
			{
				elementType: "geometry",
				stylers: [
					{
						color: "#f5f5f5"
					}
				]
			},
			{
				elementType: "labels.icon",
				stylers: [
					{
						visibility: "off"
					}
				]
			},
			{
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#616161"
					}
				]
			},
			{
				elementType: "labels.text.stroke",
				stylers: [
					{
						color: "#f5f5f5"
					}
				]
			},
			{
				featureType: "administrative.land_parcel",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#bdbdbd"
					}
				]
			},
			{
				featureType: "landscape",
				stylers: [
					{
						color: "#cacaca"
					}
				]
			},
			{
				featureType: "poi",
				elementType: "geometry",
				stylers: [
					{
						color: "#eeeeee"
					}
				]
			},
			{
				featureType: "poi",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#757575"
					}
				]
			},
			{
				featureType: "poi.park",
				elementType: "geometry",
				stylers: [
					{
						color: "#e5e5e5"
					}
				]
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#9e9e9e"
					}
				]
			},
			{
				featureType: "road",
				stylers: [
					{
						color: "#ffffff"
					}
				]
			},
			{
				featureType: "road",
				elementType: "geometry",
				stylers: [
					{
						color: "#ffffff"
					}
				]
			},
			{
				featureType: "road.arterial",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#757575"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [
					{
						color: "#dadada"
					}
				]
			},
			{
				featureType: "road.highway",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#616161"
					}
				]
			},
			{
				featureType: "road.local",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#9e9e9e"
					}
				]
			},
			{
				featureType: "transit.line",
				elementType: "geometry",
				stylers: [
					{
						color: "#e5e5e5"
					}
				]
			},
			{
				featureType: "transit.station",
				elementType: "geometry",
				stylers: [
					{
						color: "#eeeeee"
					}
				]
			},
			{
				featureType: "water",
				stylers: [
					{
						color: "#f1f1f1"
					}
				]
			},
			{
				featureType: "water",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#9e9e9e"
					}
				]
			}
		]
	},
	radii = [112654, 225308, 337962, 450616],
	ranges = [
		{
			url: "/assets/markers_30mins.svg",
			distance: 70
		},
		{
			url: "/assets/markers_1hr.svg",
			distance: 140
		},
		{
			url: "/assets/markers_1hr30mins.svg",
			distance: 210
		},
		{
			url: "/assets/markers_2hrs.svg",
			distance: 280
		}
	];

// Generate
function initMap() {
	var circles = [];
	var distanceMarkers = [];
	var spherical = google.maps.geometry.spherical;
	map = new google.maps.Map(
		document.getElementById("map-radius"),
		mapOptions
	);

	// Add circles
	radii.forEach(function(radius, i) {
		circles[i] = new google.maps.Circle({
			center: map.getCenter(),
			strokeColor: "#A78357",
			strokeOpacity: 1,
			strokeWeight: 1,
			radius: radius,
			fillColor: "#0000FF",
			fillOpacity: 0,
			map: map
		});
	});

	// Branded pin marker
	var markerSVG = [
		'<?xml version="1.0" encoding="utf-8"?>',
		'<svg width="60px" height="89px" viewBox="0 0 60 89" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">',
		'<path d="M30.0003 89L4.05773 44.5006C-7.47187 24.7217 6.94108 0 30.0003 0C53.0595 0 67.4711 24.7217 55.9428 44.5006L30.0003 89Z" id="Fill-103" fill="#3B3951" stroke="none" />',
		'<path d="M13 15L11.1065 15C11.1142 14.5526 11.1245 13.7242 11.1348 12.5198C11.1476 11.313 11.1528 9.80909 11.1528 8.00944C11.0372 8.00944 10.3569 8.00819 9.1104 8.00443C7.86264 8.00067 6.92683 7.99941 6.2991 7.99941C5.54172 7.99941 4.63286 8.00067 3.57381 8.00443C2.51348 8.00819 1.93838 8.00944 1.84724 8.00944C1.84724 10.0861 1.85237 11.6576 1.86264 12.7266C1.87548 13.7944 1.88447 14.5526 1.89217 15L0 15C0.00770218 14.5526 0.0192555 13.7568 0.0333761 12.6138C0.0487805 11.4721 0.0564827 9.5409 0.0564827 6.82263C0.0564827 6.0005 0.0500642 5.00042 0.0397946 3.82112C0.0269576 2.64057 0.0141207 1.36728 0 0L1.89217 0C1.89217 1.13543 1.88447 2.25081 1.87035 3.34489C1.85494 4.43771 1.84724 5.4779 1.84724 6.4642C1.93838 6.4642 2.43646 6.46545 3.34531 6.46921C4.25032 6.47423 5.24005 6.47548 6.31065 6.47548C7.13607 6.47548 8.13222 6.47423 9.29397 6.46921C10.4557 6.46545 11.0757 6.4642 11.1528 6.4642C11.1528 5.4779 11.1438 4.44022 11.1297 3.3499C11.1142 2.25959 11.1065 1.14295 11.1065 0L13 0C12.9846 1.12791 12.9705 2.43128 12.9602 3.9101C12.9474 5.38892 12.9422 6.59454 12.9422 7.5282C12.9422 9.72387 12.9499 11.4057 12.9653 12.575C12.9795 13.7443 12.9923 14.5526 13 15" transform="translate(23 20)" id="Fill-105" fill="#00CACA" stroke="none" />',
		'<path d="M21 1.66362C10.3378 1.66362 1.66362 10.3378 1.66362 21C1.66362 31.6622 10.3378 40.3364 21 40.3364C31.6622 40.3364 40.3377 31.6622 40.3377 21C40.3377 10.3378 31.6622 1.66362 21 1.66362M21 42C9.42081 42 0 32.5805 0 21C0 9.42081 9.42081 0 21 0C32.5805 0 42 9.42081 42 21C42 32.5805 32.5805 42 21 42" transform="translate(9 8)" id="Fill-107" fill="#00CACA" stroke="none" />',
		"</svg>"
	].join("\n");

	// Add marker to map
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		map: map,
		title: "Marker",
		icon: {
			url:
				"data:image/svg+xml;charset=UTF-8," +
				encodeURIComponent(markerSVG),
			scaledSize: new google.maps.Size(48, 48)
		},
		optimized: false
	});

	// Add distance markers to map
	ranges.forEach(function(range, i) {
		distanceMarkers[i] = new google.maps.Marker({
			icon: {
				url: range.url,
				scaledSize: new google.maps.Size(92, 32),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(46, 20)
			},
			map: map,
			position: spherical.computeOffset(
				map.getCenter(),
				113000 * (i + 1),
				45
			)
		});
	});

	// Update cirlces on map move
	map.addListener("center_changed", function() {
		marker.setPosition(map.getCenter());
		circles.forEach(function(radius, i) {
			circles[i].setCenter(map.getCenter());
		});
		distanceMarkers.forEach(function(radius, i) {
			distanceMarkers[i].setPosition(
				spherical.computeOffset(map.getCenter(), 112654 * (i + 1), 45)
			);
		});
	});
}
