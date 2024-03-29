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
	const [allUser, setAllUser] = useState<any>();

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
		setIsSet(1);
		fetchData();
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
							requestType: "post",
							updatedAt: new Date(Date.now()).toISOString(),
						});
						if (response.data.status) {
							// console.log(response.data);
						}
					}
				});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	const fetchData = async () => {
		const data = {
			requestType: "get",
		};
		try {
			const response = await axios.post("/api/userLocation", data);
			if (response.data.status) {
				console.log(response.data.usersLocation);
				setAllUser(response.data.usersLocation);
			}
		} catch (error: any) {
			if (!error.response.data.status) {
				console.error(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		getLocation();
	}, [hasLocationPermission, cords.lat, cords.lng]);

	const customMarkerIcon = new Icon({
		iconUrl: "/images/marker.png",
		iconSize: [38, 38],
	});
	
	console.log(allUser);

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
				<UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
			</div>
			{cords.lat != 0 && cords.lng != 0 && (
				<>
					<MapContainer
						className="w-full col-span-9"
						center={[cords.lat, cords.lng]}
						zoom={6}
						zoomControl={false}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{
							isSet == 1 && allUser != undefined ? (
								allUser.map((d:any, i:any) => {
									return (
										<>
											<Marker key={i} icon={customMarkerIcon} position={[d.lat, d.lng]} ></Marker>
											<Circle
												center={[d.lat, d.lng]}
												pathOptions={{ fillColor: "red" }}
												radius={100}
												stroke={false}
											/>
										</>
									)
								})
							) : null
						}
					</MapContainer>
				</>
			)}
		</>
	);
};

export default MapComponent;
