import { connectToDB } from "@/lib/database";
import { Project } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async ( request: Request, { params : { id }} : { params : { id : string }}) => {
    try {
        await connectToDB();

        await Project.findByIdAndDelete(id);
        return NextResponse.json({message: 'Success deleting project'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting project.'}, { status: 500 });
    }
}