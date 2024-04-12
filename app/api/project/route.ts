import { connectToDB } from "@/lib/database"
import { Project } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const projects = await Project.find().populate('author');

        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts', { status: 500 })
    }
}