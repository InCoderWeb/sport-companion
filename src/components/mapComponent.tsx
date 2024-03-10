"use client";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Circle, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { UserButton, useAuth } from "@clerk/nextjs";
import axios from "axios";

const MapComponent = () => {
	const { userId } = useAuth();
	const [hasLocationPermission, setHasLocationPermission] = useState("");
	const [isSet, setIsSet] = useState(0);

	const [cords, setCords] = useState({
		lat: 0,
		lng: 0,
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
		setIsSet(1)
	}

	function errors(err: any) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.permissions
				.query({ name: "geolocation" })
				.then(async function (result) {
					if (result.state === "granted") {
						setHasLocationPermission(result.state);
					} else if (result.state === "prompt") {
						setHasLocationPermission(result.state);
					}
					navigator.geolocation.getCurrentPosition(
						success,
						errors,
						options
					);
					if (isSet == 1) {
						const response = await axios.post("/api/userLocation", {
							userId,
							lat: cords.lat,
							lng: cords.lng,
							updatedAt: new Date(Date.now()).toISOString(),
						});
						if (response.data.status) {
							console.log(response.data);
						}
					}
				});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	useEffect(() => {
		getLocation();
	}, [hasLocationPermission, cords.lat, cords.lng]);

	const customMarkerIcon = new Icon({
		iconUrl: "/images/marker.png",
		iconSize: [38, 38],
	});

	return (
		<>
			{hasLocationPermission !== "granted" && (
				<>
					<div className="fixed w-auto h-screen z-[9999] backdrop-blur-sm bg-black/40 flex justify-center items-center flex-col">
						<div className="bg-white p-4 rounded-xl max-w-[24rem] flex justify-center items-center flex-col mx-4 text-center">
							<img src="/images/marker.png" alt="location Icon" />
							<p className="mb-4">
								This application requires your location. Please
								allow access to proceed.
							</p>
						</div>
					</div>
				</>
			)}

			<div className="fixed right-6 top-6 z-[9999] bg-white size-[2.5rem] flex justify-center items-center rounded-full shadow-2xl">
				<UserButton afterSignOutUrl="/" />
			</div>
			{cords.lat != 0 && cords.lng != 0 && (
				<>
					<MapContainer
						className="w-full col-span-9"
						center={[cords.lat, cords.lng]}
						zoom={6}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker
							position={[cords.lat, cords.lng]}
							icon={customMarkerIcon}
						/>
						<Circle
							center={[cords.lat, cords.lng]}
							pathOptions={{ fillColor: "red" }}
							radius={100}
							stroke={false}
						/>
					</MapContainer>
				</>
			)}
		</>
	);
};

export default MapComponent;
