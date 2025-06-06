"use client";
import { setConfig } from "next/config";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [image, setImage] = useState(
    "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=-23.336299,145.721099&fov=110&heading=70&radius=40000&return_error_code=true&pitch=0&key=AIzaSyB2M7-G3xNN7T2I4-iOYiJmEZpB9pU9iYc"
  );
  const [chosenImage, setChosenImage] = useState(
    "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=-10.521838,-40.099011&fov=80&heading=70&radius=40000&return_error_code=true&pitch=0&key=AIzaSyB2M7-G3xNN7T2I4-iOYiJmEZpB9pU9iYc"
  );
  const [finished, setFinished] = useState(true);
  const [locationType, setLocationType] = useState("Walmart");
  const [saving, setSaving] = useState(false);
  const loadLink = async () => {
    setFinished(false);
    const response = await fetch("/api/randomPic");
    console.log(response);
    if (!response.ok) {
      console.error("Failed to fetch random image");
      loadLink();
      return;
    }
    const data = await response.json();
    console.log(data);
    setImage(data.imageString);
    setFinished(true);
  };

  const chooseNewImage = async (event) => {
    var tempImage = image;
    loadLink().then(() => {
      console.log("Image loaded");
    });
    setChosenImage(tempImage);
    console.log(event.imageString);
  };

  const saveLocation = async () => {
    setSaving(true);
    console.log("Saving location...");
    //make an id for the new photo type
    var newPhotoID = makeID(10);
    const body = {
      image: chosenImage,
      locationType: locationType,
      imageString: newPhotoID,
    };
    console.log(body);
    //send the post request to the server
    await fetch("/api/userLocations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to save location");
          return;
        }
        console.log("Location saved successfully");
        router.push(`/userLocale/0`); //hardcoded as admin for testing
      })
      .catch((error) => {
        console.error("Error saving location:", error);
      });
    setSaving(false);
    //this is where we would save the image to the server
  };

  function makeID(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-between pr-10">
      <Head>
        <title>Where should we put a.....</title>
      </Head>
      <div className="relative flex h-[calc(100vh)] w-full max-w-[18rem] flex-col bg-transparent bg-clip-border p-4 text-blue-100 shadow-xl shadow-blue-gray-900/5">
        <div className="p-4 mb-2">
          <h5 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            <span className="text-emerald-300">Where</span> Should We Put A...
          </h5>
        </div>
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <div
            role="button"
            onClick={() => router.push("/")}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center"></div>
            The Game
          </div>
          <div
            role="button"
            onClick={() => router.push("/about")}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center"></div>
            About
          </div>
          <div
            role="button"
            onClick={() => router.push("/userLocale/0")}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-lg focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center"></div>
            My Photos
          </div>
        </nav>
      </div>
      <div className="flex flex-col items-center text-center justify-around MAINSTORAGE">
        <h1 className="text-3xl font-bold">Where should we put a...</h1>
        <Image
          src={"/icons/" + locationType.replaceAll(" ", "-") + ".png"}
          alt={locationType}
          width={500}
          height={123}
        />
        {finished && (
          <div>
            <div className="flex flex-row items-around justify-around text-center">
              <div>
                <h2 className="text-2xl font-bold m-4">
                  {locationType} stays here.
                </h2>
                <img
                  src={chosenImage}
                  alt="Random Street View"
                  onClick={loadLink}
                  className="mt-4 m-10 rounded-2xl border-b-blue-100 border-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
                  width={400}
                  height={400}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold m-4">
                  {locationType} goes here instead.
                </h2>
                <img
                  src={image}
                  alt="Random Street View"
                  onClick={chooseNewImage}
                  className="mt-4 m-10 rounded-2xl border-b-blue-100 border-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            {!saving && (
              <button
                onClick={saveLocation}
                className="bg-gray-500 hover:bg-green-950 text-white text-xl font-bold py-2 px-4 rounded p-5 m-6 w-100"
              >
                Save Location
              </button>
            )}
            {saving && <div className="text-2xl font-bold">Saving...</div>}
          </div>
        )}
        {!finished && (
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold">Loading....</h1>
            <img src="/icons/whereLogo.gif"></img>
          </div>
        )}
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-bold">Set your Location:</div>
          <div className="flex flex-row items-around justify-around text-center">
            <button
              onClick={() => setLocationType("Walmart")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Walmart
            </button>
            <button
              onClick={() => setLocationType("Big Lots")}
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Big Lots
            </button>
            <button
              onClick={() => setLocationType("Hobby Lobby")}
              className="bg-orange-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Hobby Lobby
            </button>
            <button
              onClick={() => setLocationType("Seven Eleven")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Seven Eleven
            </button>
            <button
              onClick={() => setLocationType("Barnes And Noble")}
              className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Barnes and Noble
            </button>
            <button
              onClick={() => setLocationType("Bucees")}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded p-3 m-6"
            >
              Bucees
            </button>
            <button
              onClick={() => setLocationType("Target")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Target
            </button>
            <button
              onClick={() => setLocationType("Vape Shop")}
              className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded p-3 m-6"
            >
              Vape Shop
            </button>
          </div>
        </div>

        <div className="flex flex-row items-around justify-around text-center">
          <button
            onClick={() => setLocationType("Cracker Barrel")}
            className="bg-amber-600 hover:bg-amber-900 text-gray-300 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Cracker Barrel
          </button>
          <button
            onClick={() => setLocationType("Applebees")}
            className="bg-emerald-700 hover:bg-emerald-900 text-red-200 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Applebees
          </button>
          <button
            onClick={() => setLocationType("Betos")}
            className="bg-red-500 hover:bg-red-900 text-green-300 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Betos
          </button>
          <button
            onClick={() => setLocationType("Dollar General")}
            className="bg-green-900 hover:bg-green-500 text-gray-700 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Dollar General
          </button>
          <button
            onClick={() => setLocationType("Fiesta")}
            className="bg-green-900 hover:bg-green-500 text-orange-500 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Fiesta
          </button>
          <button
            onClick={() => setLocationType("GameStop")}
            className="bg-gray-600 hover:bg-gray-900 text-red-500 font-bold py-2 px-4 rounded p-3 m-6"
          >
            GameStop
          </button>
          <button
            onClick={() => setLocationType("HF Sinclair")}
            className="bg-lime-500 hover:bg-lime-700 text-gray-600 font-bold py-2 px-4 rounded p-3 m-6"
          >
            HF Sinclair
          </button>
          <button
            onClick={() => setLocationType("Home Depot")}
            className="bg-orange-500 hover:bg-orange-400 text-gray-600 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Home Depot
          </button>
        </div>
        <div className="flex flex-row items-around justify-around text-center">
          <button
            onClick={() => setLocationType("Kmart")}
            className="bg-blue-700 hover:bg-blue-800 text-red-600 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Kmart
          </button>
          <button
            onClick={() => setLocationType("Maverik")}
            className="bg-rose-700 hover:bg-rose-400 text-black font-bold py-2 px-4 rounded p-3 m-6"
          >
            Maverik
          </button>
          <button
            onClick={() => setLocationType("Spirit Halloween")}
            className="bg-yellow-300 hover:bg-yellow-500 text-orange-600 font-bold py-2 px-4 rounded p-3 m-6"
          >
            Spirit Halloween
          </button>
          <button
            onClick={() => setLocationType("TGI Fridays")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
          >
            TGI Fridays
          </button>
          <button
            onClick={() => setLocationType("Tim Hortons")}
            className="bg-rose-700 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded p-3 m-6"
          >
            Tim Hortons
          </button>
          <button
            onClick={() => setLocationType("Waffle House")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
          >
            Waffle House
          </button>
          <button
            onClick={() => setLocationType("Walgreens")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
          >
            Walgreens
          </button>
          <button
            onClick={() => setLocationType("AutoZone")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded p-3 m-6"
          >
            AutoZone
          </button>
        </div>
      </div>
    </main>
  );
}
