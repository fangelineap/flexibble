import { FormFieldProps } from "@/common_types";
import { connectToDB } from "@/lib/database";
import { Project } from "@/lib/models";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

     
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const POST = async (req: Request) => {
    const { title, desc, img, livesiteUrl, githubUrl, category, author } = await req.json();

    console.log('hi')
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        transformation: [{ width: 1000, height: 752, crop: 'scale' }]
    }

    if(!img) {
        return new Response('Image path is required', { status: 400 });
    }

    try {
        await connectToDB();

        const result = await cloudinary.uploader.upload(img, options);

        const newProject = new Project({
            title: title,
            desc: desc,
            img: img,
            livesiteUrl: livesiteUrl,
            githubUrl: githubUrl,
            category: category,
            author: author,
        });

        await newProject.save();

        return NextResponse.json(newProject, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
    }
};
