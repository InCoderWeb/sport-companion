import Sidebar from "@/components/Sidebar";
import MapComponent from "@/components/mapComponent";
import React from "react";

const Page = () => {
	return (
		<>
            <div className="grid grid-cols-12 gap-4">
                <Sidebar />
                <MapComponent />
            </div>
		</>
	);
};

export default Page;
