import React, { useRef } from 'react'
import Link from "next/link";
import Image from 'next/image';
import pic1 from '../image/weatherApp.png'
import pic2 from '../image/twitter-clone.png'
import pic3 from '../image/ncpc2.png'
import pic4 from '../image/aso1.png'

export default function Page() {

    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className="space-y-2">
                <h1 className=" text-center text-5xl font-semibold text-white" id="Projects">Projects</h1>
                <p className="text-center text-white ">Here is a small display of the different projects that I have started and completed.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-8">
                <div className="sm:relative transition duration-700 content-center border p-2 rounded-2xl overflow-hidden" onClick={() => window.open("https://weather-app-five-azure.vercel.app/")}>
                    <Image alt="" src={pic1} className="bg-neutral-600/80 transition duration-500 hover:scale-110 rounded-2xl cursor-pointer" />
                    <div className="sm:absolute bottom-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70">
                        <Link href="https://weather-app-five-azure.vercel.app/" className="text-base text-white font-semibold" target="blank">WeatherApp</Link>
                        <p className="text-sm text-white hidden nd:block ">Petite application web pour consulter la météo.</p>
                    </div>
                </div>

                <div className="sm:relative transition duration-700 content-center border p-2 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://twitter-clone-cedrickogb.vercel.app/")}>
                    <Image alt="" src={pic2} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                    <div className="sm:absolute bottom-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70">
                        <Link href="https://twitter-clone-cedrickogb.vercel.app/" className="text-base text-white font-semibold" target="blank">Twitter-clone</Link>
                        <p className="text-sm text-white hidden nd:block ">Clone de l'application web Twitter.</p>
                    </div>
                </div>

                <div className="sm:relative transition duration-700 content-center border p-2 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://demos.signsdesigner.us/ncpc-live-demo/")}>
                    <Image alt="" src={pic3} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                    <div className="sm:absolute bottom-0 flex flex-grow flex-col space-y-2 p-4 py-2 bg-neutral-900/70">
                        <Link href="" className="text-base text-white font-semibold" target="blank">Neon Channel Product Customizer</Link>
                        <p className="text-xs text-white hidden nd:block ">With the Vertim Coders team on this project I was responsible for integrating the interfaces and implementing the functionalities for the customization of illuminated signs</p>
                    </div>
                </div>

                <div className="sm:relative transition duration-700 content-center border p-2 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://demos.signsdesigner.us/aso-live-demo/")}>
                    <Image alt="" src={pic4} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                    <div className="sm:absolute bottom-0 left-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70">
                        <Link href="" className="text-base text-white font-semibold" target="blank">All Signs Options</Link>
                        <p className="text-sm text-white hidden nd:block ">With the Vertim Coders team on this project I was responsible for integrating the interfaces and implementing the functionalities for the customization custom signs and banners</p>
                    </div>
                </div>
            </div>

        </div>
    )
}