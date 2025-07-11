import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/user';
import bcrypt from 'bcryptjs';

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";


export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No user found");
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id,
                    email: user.email,
                    role: user.role || "user",
                    name: user.name || '',
                    mobile: user.mobile || '',
                    image: user.imageName || '',
                    createdAt: user.createdAt || '',
                    resetPasswordToken: user.resetPasswordToken,
                    resetPasswordExpire: user.resetPasswordExpire
                };
            },
        }),

        // 🟢 Social Providers
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            // authorization: {
            //     params: {
            //         scope: 'r_liteprofile r_emailaddress',
            //     },
            // },
            // profile(profile) {
            //     return {
            //         id: profile.id,
            //         name: `${profile.localizedFirstName || ''} ${profile.localizedLastName || ''}`.trim(),
            //         email: profile.emailAddress || '',
            //         image: profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '',
            //     };
            // },
        }),

        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            version: "2.0",
            authorization: {
                params: {
                    scope: "tweet.read users.read offline.access",
                },
            },
            profile(profile) {
                return {
                    id: profile.data.id,
                    name: profile.data.name || '',
                    email: profile.data.email || '',
                    image: profile.data.profile_image_url || '',
                };
            },
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email }) {

            await connectDB();

            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                await User.create({
                    email: user.email,
                    name: user.name,
                    imageName: user.image,
                    provider: account.provider,
                    role: "user",
                    createdAt: new Date(),
                });
            }

            return {
                id: user._id,
                email: user.email,
                role: user.role || "user",
                name: user.name || '',
                mobile: user.mobile || '',
                image: user.imageName || '',
                createdAt: user.createdAt || '',
                resetPasswordToken: user.resetPasswordToken,
                resetPasswordExpire: user.resetPasswordExpire
            };
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // token.user = user;
                token.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role || "user",
                    createdAt: user.createdAt,
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
                session.user = token.user;
            }
            return session;
        },
    },
});
