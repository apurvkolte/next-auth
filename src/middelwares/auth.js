import catchAsyncErrors from './catchAsyncErrors'
import { getToken } from "next-auth/jwt"
const secret = process.env.NEXTAUTH_SECRET

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const session = await getToken({ req, secret })

    if (!session) {
        return res.status(401).send({ message: "Login first to access this resource" });
    }

    req.user = session.user;
    next();
})


// Handling user roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send({
                message: `Role (${req.user.role}) is not allowed to access this resource.`
            });
        }
        next()
    }
}


export {
    isAuthenticatedUser,
    authorizeRoles
}




// import { getSession } from "next-auth/react";

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session || session.user.role !== "admin") {
//         return {
//             redirect: {
//                 destination: "/unauthorized",
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { session },
//     };
// }