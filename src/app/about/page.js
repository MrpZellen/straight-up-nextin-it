"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function About() {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <main className="flex min-h-screen flex-row p-10">
        <title>About</title>
        <div className="relative flex h-[calc(100vh)] w-full max-w-[18rem] flex-col bg-transparent bg-clip-border p-4 text-blue-100 shadow-xl shadow-blue-gray-900/5">
    <div className="p-4 mb-2">
        <h5 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        <span className="text-emerald-300">Where</span> Should We Put A...
        </h5>
    </div>
    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <div role="button" onClick={() => router.push("/")}
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
        </div>
        The Game
        </div>
        <div role="button" onClick={() => router.push("/about")}
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
        </div>
        About
        </div>
        <div role="button" onClick={() => router.push("/userLocale/0")}
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
        </div>
        My Photos
        </div>
    </nav>
    </div>
        <div className="flex flex-col pl-60 text-center justify-around MAINSTORAGE">
        <div className="flex flex-col items-center text-4xl">
            I made this website cause its funny.
        </div>
        <div className="flex flex-col ">
            (and also cause I had an assignment.)
        </div>
        </div>
        </main>
        
    )
}