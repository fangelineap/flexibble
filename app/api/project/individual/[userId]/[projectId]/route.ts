import { connectToDB } from "@/lib/database"
import { Project } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: { params : any }) => {
    try {
        await connectToDB();
        
        const projects = await Project.find({'author': params.userId}).populate('author');
        const data = projects.filter((p) => p._id != params.projectId);
        console.log('halo');

        if(data.length == 0) return NextResponse.json('No data', { status: 404 })
        else return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompts', { status: 500 })
    }
}