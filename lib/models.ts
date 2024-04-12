import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: [true, 'Email already exists.'],
        },
        avatarUrl: {
            type: String
        },
        description: {
            type: String,
        },
        githubUrl: {
            type: String
        },
        linkedinUrl: {
            type: String
        }
    }
);

const projectSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is required.'],
            min: 3
        },
        desc:{
            type: String,
            required: [true, 'Description is required.']
        },
        img:{
            type: String
        },
        livesiteUrl: {
            type: String
        },
        githubUrl: {
            type: String
        },
        category: {
            type: String
        },
        author:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
)

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
export const Project = mongoose.models?.Project || mongoose.model('Project', projectSchema);