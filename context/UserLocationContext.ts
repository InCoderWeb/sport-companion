import { createContext } from "react";

export type location = {
	lat: Number;
	lng: Number;
};

export const UserLocationContext = createContext<any>({});
