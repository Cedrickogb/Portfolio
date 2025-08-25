import React, { useRef, useState } from 'react'
import Link from "next/link";
import Image from 'next/image';
import pic1 from '../image/weatherApp.png'
import pic2 from '../image/twitter-clone.png'
import pic3 from '../image/ncpc2.png'
import pic4 from '../image/aso1.png'
import pic5 from '../image/mr-streaming.png'


export default function Page() {

    const [downloadModal, setDownloadModal] = useState(false)

    return (
        <div>
            <div className="flex flex-col space-y-4 p-4 animate-moveToleft">
                <div className="space-y-2">
                    <h1 className=" text-center text-5xl font-semibold text-white" id="Projects">Projects</h1>
                    <p className="text-center text-white ">Here is a small display of the different projects that I have started and completed.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-8">
                    {/* <div className="sm:relative transition duration-700 content-center border p-2 rounded-2xl overflow-hidden" onClick={() => window.open("https://weather-app-five-azure.vercel.app/")}>
                        <Image alt="" src={pic1} className="bg-neutral-600/80 transition duration-500 hover:scale-110 rounded-2xl cursor-pointer" />
                        <div className="sm:absolute bottom-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70">
                            <Link href="https://weather-app-five-azure.vercel.app/" className="text-base text-white font-semibold" target="blank">WeatherApp</Link>
                            <p className="text-sm text-white hidden nd:block ">Petite application web pour consulter la météo.</p>
                        </div>
                    </div> */}

                    <div className="sm:relative transition duration-700 content-center border p-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://twitter-clone-cedrickogb.vercel.app/")}>
                        <Image alt="" src={pic2} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                        <div className="sm:absolute bottom-0 left-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70 backdrop-blur-sm">
                            <Link href="https://twitter-clone-cedrickogb.vercel.app/" className="text-base text-white font-semibold" target="blank">Twitter-clone</Link>
                            <p className="text-sm text-white hidden nd:block ">Clone of the web app Twitter.</p>
                        </div>
                    </div>

                    <div className="sm:relative transition duration-700 content-center border p-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://demos.signsdesigner.us/ncpc-live-demo/")}>
                        <Image alt="" src={pic3} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                        <div className="sm:absolute bottom-0 left-0 flex flex-grow flex-col space-y-2 p-4 py-2 bg-neutral-900/70 backdrop-blur-sm">
                            <Link href="" className="text-base text-white font-semibold" target="blank">Neon Channel Product Customizer</Link>
                            <p className="text-xs text-white hidden nd:block ">With the Vertim Coders team on this project I was responsible for integrating the interfaces and implementing the functionalities for the customization of illuminated signs</p>
                        </div>
                    </div>

                    <div className="sm:relative transition duration-700 content-center border p-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://demos.signsdesigner.us/aso-live-demo/")}>
                        <Image alt="" src={pic4} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                        <div className="sm:absolute bottom-0 left-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70 backdrop-blur-sm">
                            <Link href="" className="text-base text-white font-semibold" target="blank">All Signs Options</Link>
                            <p className="text-sm text-white hidden nd:block ">With the Vertim Coders team on this project I was responsible for integrating the interfaces and implementing the functionalities for the customization custom signs and banners</p>
                        </div>
                    </div>

                    <div className="sm:relative transition duration-700 content-center border p-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open("https://mr-streamings.vercel.app/")}>
                        <Image alt="" src={pic5} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                        <div className="sm:absolute bottom-0 left-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70 backdrop-blur-sm">
                            <Link href="" className="text-base text-white font-semibold" target="blank">Mr Streaming</Link>
                            <p className="text-sm text-white hidden nd:block ">Streaming subscription profile sales site</p>
                        </div>
                    </div>

                    {/* <div className="sm:relative transition duration-700 content-center border p-1 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setDownloadModal(true)}>
                        <Image alt="" src={pic5} className="bg-neutral-600/80 hover:transform transition duration-500 hover:scale-110 rounded-2xl sm:hover:none" />
                        <div className="sm:absolute bottom-0 left-0 flex flex-col space-y-2 p-4 py-2 bg-neutral-900/70 backdrop-blur-sm">
                            <Link href="" className="text-base text-white font-semibold" target="blank">MusicHopper</Link>
                            <p className="text-sm text-white hidden nd:block ">Lecteur de musique desktop basé sur un design revisité de apple music </p>
                        </div>
                    </div> */}
                </div>

            </div>

            {downloadModal && 
                <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                    <div className='relative max-w-sm w-[50%] h-fits bg-black items-center p-4 space-y-3 shadow-md shadow-lime-500 rounded-2xl'>
                        <span onClick={() => setDownloadModal(false)} className='absolute top-2 right-2 flex text-white hover:text-lime-600 border border-white hover:border-lime-500 p-0.5 rounded-lg cursor-pointer transition-all'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                        <h3 className='text-center text-xl font-medium'>Here you can download the app</h3>

                        <div onClick={() => window.open("https://github.com/Cedrickogb/MusicHopper/releases/download/music/MusicHopper_v1.zip")} className='flex justify-between p-2 cursor-pointer'>
                            <span>Windows</span>
                            <span className='text-lime-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </span>
                        </div>

                        <div className='border-[1px] w-full'></div>

                        <div className='flex justify-between p-2 cursor-not-allowed'>
                            <span>linux</span>
                            <p className='text-sm text-center text-lime-500 border border-lime-500 px-2 rounded-2xl'>
                                soon
                            </p>
                        </div>

                        <div className='border-[1px] w-full'></div>

                        <div className='flex justify-between p-2 cursor-not-allowed'>
                            <span>MacOs</span>
                            <p className='text-sm text-center text-lime-500 border border-lime-500 px-2 rounded-2xl'>
                                soon
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}