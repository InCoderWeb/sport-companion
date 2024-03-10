"use client";
import { clerkClient } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { LuAlignJustify } from "react-icons/lu";

const Sidebar = () => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};
	return (
		<Sheet>
			<SheetTrigger className="fixed top-6 left-6 z-[999999]">
        <Button className="bg-blue-600 p-2"><LuAlignJustify className="!size-6" /></Button>
      </SheetTrigger>
			<SheetContent side={"left"}>
				<div
					className={`w-full z-[9999] h-screen p-3 bg-white dark:bg-gray-800`}
					aria-labelledby="drawer-navigation-label"
				>
					<div className="flex justify-between">
						<h5
							id="drawer-navigation-label"
							className="text-lg font-semibold text-gray-500 uppercase dark:text-gray-400"
						>
							Sport Companion
						</h5>
					</div>
					<div className="py-4 overflow-y-auto">
						<ul className="space-y-2 font-medium">
							<li>
								<form className="max-w-md mx-auto">
									<label
										htmlFor="default-search"
										className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
									>
										Search
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
											<svg
												className="w-4 h-4 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 20 20"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
												/>
											</svg>
										</div>
										<input
											type="search"
											id="default-search"
											className="block w-full p-4 ps-10 text-sm outline-blue-600 outline-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Search for people..."
											required
										/>
										<button
											type="submit"
											className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Search
										</button>
									</div>
								</form>
							</li>
							<li>
								<div className="userCard">
									<img
										className="block mx-auto h-16 rounded-full sm:mx-0 sm:shrink-0"
										src="https://tailwindcss.com/img/erin-lindford.jpg"
										alt="Woman's Face"
									/>
									<div className="text-center space-y-2 sm:text-left">
										<div className="space-y-0.5">
											<p className="text-lg text-black font-semibold">
												Erin Lindford
											</p>
											<p className="text-slate-500 font-medium">
												Likes Football
											</p>
										</div>
										<button className="px-4 py-1 text-sm text-white font-semibold rounded-md bg-blue-700">
											Message
										</button>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Sidebar;
