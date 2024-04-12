import { connectToDB } from "@/lib/database";
import { User } from "@/lib/models";
import { NextResponse } from "next/server"

export const GET =  async ( req: any, { params : { id }} :
    { params : { id : string }}
) => {
    try {
        await connectToDB();

        const user = await User.findById(id);

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}