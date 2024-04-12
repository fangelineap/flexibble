import { connectToDB } from "@/lib/database";
import { Project, User } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params: { id } }: { params: { id: string } }) => {
    try {
        await connectToDB();

        let user;

        user = await Project.find({ author: id }).populate("author");
        if (user?.length != 0) return NextResponse.json(user, { status: 200 });
        else return NextResponse.json({ error: "There are no projects." }, { status: 404 });

    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
};
