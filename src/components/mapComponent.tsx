"use client";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { Button } from "./ui/button";

const MapComponent = () => {
	const [hasLocationPermission, setHasLocationPermission] = useState("");

	const [cords, setCords] = useState({
		lat: 20.5937,
		lng: 78.9629,
	});

	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	function success(pos: any) {
		var crd = pos.coords;
		setHasLocationPermission("granted");
		setCords({ lat: crd.latitude, lng: crd.longitude });
	}

	function errors(err: any) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: "geolocation" })
				.then(function (result) {
					if (result.state === "granted") {
						setHasLocationPermission(result.state);
					} else if (result.state === "prompt") {
						//If prompt then the user will be asked to give permission
						setHasLocationPermission(result.state);
						navigator.geolocation.getCurrentPosition(
							success,
							errors,
							options
						);
					}
				});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}, []);

	const customMarkerIcon = new Icon({
		iconUrl: "/images/marker.png",
		iconSize: [38, 38],
	});

	const handleRequestLocation = () => {
		navigator.geolocation.getCurrentPosition(success, errors, options);
	};
	return (
		<>
			{hasLocationPermission !== "granted" && (
				<>
					<div className="fixed w-screen h-screen z-[9999] bg-black/40 flex justify-center items-center flex-col">
						<div className="bg-white p-4 rounded-xl max-w-[24rem] flex justify-center items-center flex-col mx-4 text-center">
							<img src="/images/marker.png" alt="location Icon" />
							<p className="mb-4">
								This application requires your location. Please
								allow access to proceed.
							</p>
							<Button
								className="w-full bg-purple-700"
								onClick={handleRequestLocation}
							>
								Allow Location
							</Button>
						</div>
					</div>
				</>
			)}

			<MapContainer center={[cords.lat, cords.lng]} zoom={6}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker
					position={[cords.lat, cords.lng]}
					icon={customMarkerIcon}
				/>
			</MapContainer>
		</>
	);
};

export default MapComponent;
