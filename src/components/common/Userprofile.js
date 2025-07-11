import React from 'react'
import Link from "next/link";
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';


const Userprofile = () => {
    // const { user, success, message, error } = useSelector((state) => state.auth);
    const { data: session, status } = useSession();

    return (
        <div className=" py-20">
            <h1 className="text-xl text-gray-800 text-center py-5 font-bold ">User Information</h1>
            {session && session.user.email ? (
                <div className="max-w-sm flex justify-center bg-slate-50 shadow-lg rounded mx-auto p-6 mb-10">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">User</p>
                            <p className="text-lg text-gray-800">{session.user.email || session.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Joined Date</p>
                            <p className="text-lg text-gray-800">
                                {new Date(session.user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-sm flex flex-col items-center justify-center bg-slate-50 shadow-lg rounded  mx-auto p-6 mb-10">
                    No User Found
                    <br />
                    <br />
                    <Link className="max-w-sm bg-green-500 hover:bg-green-400 rounded  text-white px-4 py-1" href='/'>Home</Link>
                </div>
            )}
        </div>
    )
}

export default Userprofile