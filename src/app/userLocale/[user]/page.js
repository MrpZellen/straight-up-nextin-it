"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UserLocale() {
    const [userLocations, setUserLocations] = useState(null);
    const [ready, setReady] = useState(false);
    const params = useParams();
    const user = params.user;
    const router = useRouter();
    useEffect( () => {
        const getUsers = async () => {
            await fetch(`/api/userLocations/${user}`)
            .then(fetched => fetched.json())
            .then(data => {
                console.log(data)
                setUserLocations(data[0].userPhotos)
            }).then(() => {
            setReady(true)
                })
            }
        getUsers();
        }, []);
    var iterable = 0;
    if (!ready || userLocations.length === 0) {
        return (
            <main className="flex min-h-screen flex-row p-10">
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
                        My Photos Test
                        </div>
                    </nav>
                </div>
                <div className="flex flex-col text-center justify-around">
                    <div className="flex flex-col items-center text-4xl">
                        Does this user even exist?
                    </div>
                    <div className="flex flex-col items-center text-4xl">
                        Do they have data?
                    </div>
                    <img className="flex flex-col items-center m-4" src="/icons/whereLogo.gif" 
                    width={800}
                    height={450}
                    />
                </div>
            </main>
        )
    } else {
        return (
        <main className="flex min-h-screen p-10">
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
                        <div role="button" onClick={() => router.push("/userLocale/682e46f23c2b6a9eb5ba88cd")}
                        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <div className="grid mr-4 place-items-center">
                        </div>
                        My Photos Test
                        </div>
                    </nav>
            </div>
            <div>
                <h1 className="text-3xl text-center font-bold">HELLO THERE!! User {user}.</h1>
                <h2 className="text-2xl text-center font-bold">Here are your beautiful new stores:</h2>
            <ul className="flex flex-row row-end-2 flex-wrap gap-4">
                {userLocations.map((location) => (
                    <li key={iterable++} className="flex flex-col">
                        <div className="flex flex-col ">
                            <img className="mt-4 m-2 rounded-2xl border-b-blue-100 border-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
                            width={400}
                            height={400}
                            src={`../userPhotos/${location.locationType.replaceAll(' ', '-')}/${location.urlExtension}.png`} alt={location.locationType} />
                        </div>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold pt-3 text-center">Now get out there and keep on destroying nature, you ruffian.</h2>
        </div>
        </main>
    )
    }
}

