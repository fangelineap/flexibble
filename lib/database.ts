import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("Using existing connection...");
        return;
    }

    const mongodb = process.env.MONGODB_URI || '';
    try {
        await mongoose.connect(mongodb, {
            dbName: "flexibble",
        });

        isConnected = true;
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
        throw new Error("Connection failed");
    }
}