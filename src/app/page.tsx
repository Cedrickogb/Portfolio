"use client"

import Image from "next/image";
import HomeSection from "./components/Home"
import Stacks from "./components/stacks"
import Projects from "./components/projects"
import Contacts from "./components/contacts"
import Imager from './image/empty.png'
import { useState } from "react";

export default function Home() {
  const [section, setSection] = useState('Home');
  const [menu, setMenu] = useState(false);

  function changeValue(section: string){
    setSection(section);
  };
  function showMenu(){
    setMenu(!menu);
  };


  return (
    <div className="relative flex flex-col justify-center items-center w-full h-[100vh] font-[family-name:var(--font-nunito)] bg-neutral-900 overflow-hidden">
      <header className="w-full p-8 flex justify-between z-10">
        <div className="flex md:hidden relative">
          <div onClick={() => showMenu()} className="flex text-white">
            {menu === false &&  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>}

            {menu === true &&  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>}
          </div>

          {menu === true && <div className="absolute left-0 top-[160%] flex space-x-3 text-white text-xl">
            <div onClick={() => setSection('Home')} className={`${section === 'Home' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Home</div>
            <div onClick={() => setSection('Stack')} className={`${section === 'Stack' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Stacks</div>
            <div onClick={() => setSection('Project')} className={`${section === 'Project' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Projects</div>
            <div onClick={() => setSection('Contact')} className={`${section === 'Contact' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Contact</div>
          </div>}
        </div>

        <div className="flex flex-grow justify-end md:justify-between">
          <div className="hidden md:flex space-x-3 text-white text-xl">
            <div onClick={() => setSection('Home')} className={`${section === 'Home' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Home</div>
            <div onClick={() => setSection('Stack')} className={`${section === 'Stack' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Stacks</div>
            <div onClick={() => setSection('Project')} className={`${section === 'Project' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Projects</div>
            <div onClick={() => setSection('Contact')} className={`${section === 'Contact' ? 'text-lime-500' : ''} hover:text-lime-500 transition duration-700 cursor-pointer`}>Contact</div>
          </div>

          <div className="flex space-x-6 text-white">
            <span className="flex hover:text-lime-500 transition duration-700 cursor-pointer" onClick={() => window.open("https://github.com/Cedrickogb")}>
              <svg className="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" >
                  <path fill="currentColor" fill-rule="evenodd" d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z" clip-rule="evenodd" />
              </svg>
            </span>
            <span className="flex hover:text-lime-500 transition duration-700 cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/c%C3%A9drick-ogoubiyi-80510132b/")}>
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>linkedin</title>
                <path d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"></path>
              </svg>
            </span>
            <span className="flex hover:text-lime-500 transition duration-700 cursor-pointer" onClick={() => window.open("https://www.instagram.com/cedrick_ogb/")}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor"/>
              </svg>
            </span>
          </div>
        </div>
      </header>

      <div className={`flex ${section === 'Home' || 'Stack' ? 'justify-center items-start' : ''} w-full h-full overflow-auto z-10`}>
        {section === 'Home' && <HomeSection/>}
        {section === 'Stack' && <Stacks/>}
        {section === 'Project' && <Projects/>}
        {section === 'Contact' && <Contacts/>}
      </div>

      <footer className="w-full flex justify-center text-white p-4 z-10">
        <p>Copyright © 2020 - 2024. Cédrick OGOUBIYI</p>
      </footer>

      <div className="opacity-25 z-0">
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-lime-600 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute top-12 left-12 lg:left-32 w-80 h-80 bg-[#46FF78] rounded-full filter blur-2xl animate-slideToRight"></div>
        <div className="absolute -top-10 right-40 w-72 h-72 bg-green-600 filter rounded-full blur-2xl animate-slideToleft"></div>
        <div className="absolute top-32 -right-5 w-96 h-96 bg-[#46FF14] filter rounded-full blur-2xl animate-slideUp"></div>
      </div>
    </div>
  );
}
