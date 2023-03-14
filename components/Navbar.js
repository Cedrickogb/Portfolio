import { useState } from "react"
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

export default function Navb() {
    const [open, setOpen] = useState(false);
    return (
        <div className="transition duration-700 fixed">
            <FiMenu className="fixed sm:hidden display h-7 w-7 mr-2 mt-2 top-0 right-0 cursor-pointer bg-white " onClick={() => setOpen(!open)} />
            <div className={`${open ? "display" : "ml-[-100%]"} sm:ml-[0%] flex-col py-2 xl:items-start fixed  h-full xl:ml-[96px] bg-gradient-to-r from-lime-600 to-green-700 overflow-auto scrollbar-hide transition-ease duration-700  `}>



                <div className="sm:px-[16px] py-10">
                    <img width="200" height="200" src="https://t3.ftcdn.net/jpg/03/42/99/68/360_F_342996846_tHMepJOsXWwbvMpG7uiYpE68wbfQ9e4s.jpg" />

                    <div >
                        <h2 className="font-bold sm:px-3 py-2 text-white text-center text-xl ">OGOUBIYI Cédrick</h2>
                        <p className="text-center italic text-white">Développeur Web</p>
                    </div>
                </div>

                <div className="mt-10 mb-20 xl:items-start">
                    <nav className="sm:flex sm:items-center sm:w-auto w-auto ">

                        <ul className="px-[3px] py-4 ">
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2 cursor-pointer ">
                                <Link href="#About me">Qui suis-je</Link>
                            </li>
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2 cursor-pointer">
                                <Link href="#Points fort">Points fort</Link>
                            </li>
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2 cursor-pointer">
                                <Link href="#Projects">Projets</Link>
                            </li>
                            <li className="font-semibold sm:px-[75px] py-5 text-white text-center hover:bg-slate-100 hover:text-slate-900 transition duration-700 border-t-2 border-b-2 cursor-pointer">
                                <Link href="#Contact">Contact</Link>
                            </li>

                        </ul>

                    </nav>

                </div>

                <div className="grid-cols-3 gap-1 w-[50px] h-[50px]">
                    {/* je dois insérer dans cette div des svg d'incone de mes principaux réseaux sociaux */}
                </div>

                <div className="border-b-2">
                    <p className="text-center text-white pl-1 pt-1 ">Copyrigth 2023</p>
                </div>

            </div>


        </div>

    )

}