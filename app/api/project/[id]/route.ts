import { ProjectInterface } from "@/common_types";
import { connectToDB } from "@/lib/database";
import { Project } from "@/lib/models";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const GET = async (request: any, { params: { id } }: { params: { id: string } }) => {
    try {
        await connectToDB();

        const individualProjects = await Project.findById(id).populate("author");

        return NextResponse.json(individualProjects, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed fetching individual projects." }, { status: 500 });
    }
};

const isBase64 = (value: string) => {
    const base64 = /^data:image\/[a-z]+;base64,/;
    return base64.test(value)
}

export const PATCH = async (request: Request, { params: { id } }: { params: { id: string } }) => {
    const { category, desc, githhubUrl, livesiteUrl, img, title } = await request.json();

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        transformation: [{ width: 1000, height: 752, crop: 'scale' }]
    }

    try {
        await connectToDB();

        const existingData = await Project.findById(id);

        if (!existingData) return NextResponse.json({ message: "Project doesn't exist" }, { status: 200 });

        const imgResult = await cloudinary.uploader.upload(img, options);

        existingData.category = category;
        existingData.desc = desc;
        existingData.githubUrl = githhubUrl;
        if(!isBase64(img)) existingData.img = imgResult;
        existingData.livesiteUrl = livesiteUrl;
        existingData.title = title;

        await existingData.save();

        return NextResponse.json({ message: "Edit success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error editing this project." }, { status: 500 });
    }
};
