import React, { useRef } from 'react'
import Link from "next/link";

export default function Page() {

    return (
        <div className="flex flex-col justify-center items-center space-y-4 animate-moveToleft">
            {/* <h1 className="text-center text-3xl font-semibold text-white" id="About me">Qui suis-je ?</h1> */}
            {/* <div className="w-[80%] text-center text-white p-10 bg-gray-200/20 rounded-2xl"> */}
            <div className="lg:w-[80%] flex flex-col -space-y-6 text-3xl text-white p-10">
                <h3>Hello, I'm </h3>
                <h1 className='flex flex-col lg:block items-end space-x-2 text-[100px] md:text-[125px] leading-normal text-lime-500 light'>  
                    <span className='font-bold'>Cédrick</span> 
                    <span className='invisible lg:visible text-[50px] lg:text-[65px] font-medium'>OGOUBIYI</span> 
                </h1>  
                <p className='text-2xl'>I'm a Software Engineer specialized in frontend development, with a passion for building fast, accessible, and visually compelling web interfaces.
                Let’s bring your ideas to life one line of code at a time.</p>
                
            </div>


            {/* <div className="w-[80%] text-3xl text-center text-white p-10">
                Helloo, I'm <span className='text-lime-500 text-[70px] font-bold'>Cédrick</span>  <span className='text-lime-500 text-lg font-medium'>OGOUBIYI</span> 
                j'ai 20'ans, je suis étudiant en troisième année d'Architechture Logiciel à l'Ecole Supérieur de Gestion d'Informatique et des Sciences, je suis passionné d'informatique et de dessin. Très féru de manga de jeux-videos et de nouvelles technologies,  je suis aussi avide de connaissances et de nouvelles expérience donc j'aime me lancer de nouveaux défis.
            </div> */}
        </div>
    )
}