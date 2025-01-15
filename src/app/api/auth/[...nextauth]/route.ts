// // // src/app/api/auth/[...nextauth]/route.ts

// // import NextAuth, {type NextAuthOptions} from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { PrismaClient } from "@prisma/client";
// // import { compare } from "bcryptjs";


// // const prisma = new PrismaClient();


// // export const authOptions: NextAuthOptions = {
// //     session: {
// //         strategy: 'jwt'
// //     },
// //     providers: [
// //         CredentialsProvider({
// //             name: 'Sign in',
// //             credentials: {
// //                 email: {
// //                     label: 'Email',
// //                     type: 'email',
// //                     placeholder: 'hello@example.com'
// //                 },
// //                 password: {
// //                     label: 'Password',
// //                     type: 'password'
// //                 }
// //             },
// //             async authorize(credentials) {
// //                 // Handel Auth!
// //                 if (!credentials?.email || !credentials.password){
// //                     return null
// //                 }

// //                 const user = await prisma.user.findUnique({
// //                     where : {
// //                         email: credentials.email
// //                     }
// //                 })

// //                 if (!user){
// //                     return null
// //                 }

// //                 const isPasswordValid = await compare(
// //                     credentials.password, 
// //                     user.password
// //                 )

// //                 if (!isPasswordValid){
// //                     return null
// //                 }

// //                 return {
// //                     id: user.id.toString(),
// //                     email: user.email,
// //                     role: user.role, // Include the role here
// //                   };

// //             }
// //         })
// //     ]
// // }


// // const handler = NextAuth(authOptions)
// // export {handler as GET, handler as POST}

// // src/app/api/auth/[...nextauth]/route.ts
// import NextAuth, { type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import { compare } from "bcryptjs";

// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "hello@example.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user) {
//           return null;
//         }

//         const isPasswordValid = await compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordValid) {
//           return null;
//         }

//         return {
//           id: user.id.toString(),
//           email: user.email,
//           role: user.role, // Include the role here
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     // Include the role in the JWT token
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.role = user.role; // Add role to the token
//       }
//       return token;
//     },
//     // Include the role in the session
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           ...session.user,
//           id: token.id as string,
//           email: token.email as string,
//           role: token.role as string, // Add role to the session
//         };
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", // Custom login page
//     signOut: "/login", // Redirect to /login after signing out
//   },
// };

// // const handler = NextAuth(authOptions);

// // export default handler;

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);


// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "./auth";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);