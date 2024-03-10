import mongoose from "mongoose";

const userLocationSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "Please Provide user id."],
	},
	lat: {
      type: Number 
    },
    lng: {
        type: Number  
    },
	updatedAt: {
		type: Date,
		default: Date.now(),
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const UsersLocation =
	mongoose.models["usersLocation"] ||
	mongoose.model("usersLocation", userLocationSchema);
