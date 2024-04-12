import { connectToDB } from "@/lib/database";
import { User } from "@/lib/models";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user?.email,
            });

            return {...session,
                user: { ...session.user,
                    id: sessionUser._id,
                }
            };
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                const exist = await User.findOne({
                    email: profile?.email,
                });

                console.log('profilep', profile?.picture);

                if(!exist) {
                    await User.create({
                        email: profile?.email,
                        name: profile?.name?.replace(' ', "").toLowerCase(),
                        avatarUrl: profile?.picture,
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
});

export { handler as GET, handler as POST };