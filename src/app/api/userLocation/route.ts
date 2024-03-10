import { connect } from "@/db/dbConfig";
import { UsersLocation } from "@/models/UserLocationModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userId, lat, lng, updatedAt, requestType } = body;
		// console.log(userId, lat, lng, updatedAt);

		if (requestType == "get") {
			const usersLocation = await UsersLocation.find();
			if (usersLocation) {
				return NextResponse.json(
					{
						status: true,
						usersLocation,
						message: "Data fetched successfully.",
					},
					{ status: 201 }
				);
			} else {
				return NextResponse.json(
					{
						status: false,
						usersLocation,
						message: "Something Went wrong.",
					},
					{ status: 400 }
				);
			}
		} else {
			const user = await UsersLocation.exists({ userId });
			console.log(user);

			if (user !== null) {
				await UsersLocation.updateOne(
					{ userId },
					{ $set: { lat, lng, updatedAt } } // set the value of specific fields in a document
				).exec();

				return NextResponse.json(
					{
						status: true,
						message: "User Location updated Successfully.",
					},
					{ status: 201 }
				);
			} else {
				new UsersLocation({
					userId,
					lat,
					lng,
					createdAt: new Date(),
					updatedAt,
				}).save();
				return NextResponse.json(
					{
						status: true,
						message: "User Location added Successfully.",
					},
					{ status: 201 }
				);
			}
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function GET() {
	try {
		const usersLocation = await UsersLocation.find();
		if (usersLocation) {
			return NextResponse.json(
				{
					status: true,
					usersLocation,
					message: "Data fetched successfully.",
				},
				{ status: 201 }
			);
		} else {
			return NextResponse.json(
				{
					status: false,
					usersLocation,
					message: "Something Went wrong.",
				},
				{ status: 400 }
			);
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		const { id } = body;
		console.log(id);
	} catch (e) {
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
