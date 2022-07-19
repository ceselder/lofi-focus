import React from "react"
import Router from "next/router"

export default function Login() {
    return (
        <>
            <div className="relative flex h-screen justify-center z-30 text-center text-white">
                <div className="bg-white opacity-80 mx-auto border-black border-4 my-auto rounded-xl p-20 text-gray-600">
                    <h2 className="text-2xl font-bold mb-5">Login</h2>
                    <div className="p-2">
                        Username: <input className="border-2 ml-2 rounded-lg" type="value" />
                    </div>
                    <div className="p-2">
                        Password: <input className="border-2 ml-2 rounded-lg" type="password" />
                    </div>
                    <button onClick={() => {Router.push("/")}} className="bg-gray-400 p-2 rounded-lg mt-4">
                        login
                    </button>
                </div>
            </div>
        </>

    )
}