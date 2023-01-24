import Image from "next/image"
import { useState } from "react"
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

export default function Navb() {
    const [open, setOpen] = useState(false);
    return (
        <div className="transition duration-700">
            <FiMenu className="fixed sm:hidden display h-7 w-7 mr-2 mt-2 top-0 right-0 cursor-pointer bg-white " onClick={() => setOpen(!open)} />
            <div className={`${open ? "display" : "hidden"} sm:flex flex-col py-2 xl:items-start fixed  h-full xl:ml-[96px] bg-green-900 overflow-auto scrollbar-hide transition duration-700  `}>



                <div className="sm:px-[16px] py-10">
                    <Image width="200" height="200" src="/Kurosaki Ichigo.png" >
                    </Image>
                    <div >
                        <h2 className="font-bold sm:px-3 py-2 text-white text-center text-xl ">OGOUBIYI Cédrick</h2>
                        <p className="text-center italic text-white">Développeur Web</p>
                    </div>
                </div>

                <div className="mt-10 mb-20 xl:items-start">
                    <nav className={`${open ? "display" : "hidden"}  sm:flex sm:items-center sm:w-auto w-auto `}>

                        <ul className="px-[3px] py-4 ">
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2 ">
                                <Link href="#About me">Qui suis-je</Link>
                            </li>
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2">
                                <Link href="#Points fort">Points fort</Link>
                            </li>
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2">
                                <Link href="#Projects">Projets</Link>
                            </li>
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2 border-b-2">
                                <Link href="#Contact">Contact</Link>
                            </li>

                        </ul>

                    </nav>

                </div>

                <div className="grid-cols-3 gap-1 w-[50px] h-[50px]">
                    {/* je dois insérer dans cette div des svg d'incone de mes principaux réseaux sociaux */}
                </div>

                <div className="px-10 pt-10 mt-20 xl:items-start sm:flex border-t-2 items-center">
                    <p className="text-center text-white">Copyrigth 2023</p>
                </div>

            </div>


        </div>

    )

}