import { connectToDB } from "@/lib/database";
import { Project } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params : { lim }} : { params : { lim: number }}) => {
    try {
        await connectToDB();
        const projects = await Project.find().limit(lim).populate('author');

        return NextResponse.json(projects, { status: 200 });
    } 
    catch (error) {
        return NextResponse.json({ error: 'Error fetching this category.' }, { status: 500 });
    }
}