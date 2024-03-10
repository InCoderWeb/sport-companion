"use client";
import Sidebar from "@/components/Sidebar";
import MapComponent from "@/components/mapComponent";
import React, { useEffect, useState } from "react";

const Page = () => {
	const [isLoaded, setIsLoaded] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(1);
		}, 6000);
	}, []);
	return (
		<>
			{!isLoaded && (
				<div className="fixed bg-white w-screen z-[9999999] h-screen grid place-items-center">
					<img src="/images/ripple.gif" alt="loading..." />
				</div>
			)}
			<Sidebar />
			<MapComponent />
		</>
	);
};

export default Page;
