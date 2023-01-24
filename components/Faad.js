import MyForm from "./Form"
import React, { useRef } from 'react'
import emailjs from "emailjs-com"

function SendMail() {
    
    var params = {
        fullName : " ben " ,
        email_id : " email_id " ,
        message : " message " ,
    }
    emailjs.send( " service_2rgpnmg " , " template_3c9ftpq " , params).then(function(res) {
        alert("success! " + res.status)
    })
}

export default function Page() {

        emailjs.init("H6vSPvEf36X6FpChS");
        // const form = useRef();
      
        // const sendEmail = (e) => {
        //   e.preventDefault();
      
        //   emailjs.sendForm('service_2rgpnmg', 'template_3c9ftpq', form.current, 'H6vSPvEf36X6FpChS')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        // };

    return (

        <div className="bg-cover bg-center bg-fixed bg-no-repeat  pl-2 pr-2 " style={{ backgroundImage: `url(/page-bg8.jpg)` }}>
            {/* Section About Me */}
            <div className="xl:ml-[250px] xl:pl-[120px] border-b border-gray-200  sm:ml-[230px] px-10 py-5 ">
                <h1 className="text-center text-3xl font-semibold text-white pt-20 pb-6 " id="About me">About me</h1>
                <p className="text-center text-white mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus delectus distinctio repellat, deserunt perspiciatis, totam minus eligendi fuga unde animi fugit adipisci corrupti doloremque eum sint qui aperiam optio natus.</p>
            </div>

            {/* Section Points forts */}
            <div className="xl:ml-[250px] xl:pl-[120px] border-b border-gray-200  sm:ml-[230px] px-10 py-5  ">
                <h1 className="text-center text-3xl font-semibold text-white pt-2 pb-6" id="Points fort">Points forts</h1>
                <p className="text-center text-white mt-2 pb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus delectus distinctio repellat, deserunt perspiciatis, totam minus eligendi fuga unde animi fugit adipisci corrupti doloremque eum sint qui aperiam optio natus.<br />Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus delectus distinctio repellat, deserunt perspiciatis, totam minus eligendi fuga unde animi fugit adipisci corrupti doloremque eum sint qui aperiam optio natus.</p>

                <div className="grid grid-cols-2 gap-2 px-2 py-6">
                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700" >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-20 w-20 my-2 hover:text-green">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        <h1 className="text-2xl font-medium py-1">HTML5 & CSS3</h1>
                        <p className="py-2">Le HTML5 est un language de balisage qui permet l'écriture de l'hypertexte nécesaire à la mise en forme d'une page web, tandis que le CSS3 (Cascading Style Sheets) lui est un language informatique qui permet de mettre en forme, stylisé une page web</p>

                    </div>
                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700  ">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-20 w-20 my-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                        <h1 className="text-2xl font-medium py-1">JavaScript</h1>
                        <p className="py-2">Le JavaScript est un langage de programmation dynamique complet qui utilsé sur un document HTML, peut fournir une interactivité dynamique sur les sites Web, c'eest un puissant outil de de dynamisation de site web.</p>

                    </div>
                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25" strokeWidth={1.5} stroke="currentColor" className="h-20 w-20 my-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                        <h1 className="text-2xl font-medium py-1">Idées créative</h1>
                        <p className="py-2"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus delectus distinctio repellat, deserunt perspiciatis, totam minus eligendi fuga unde animi fugit adipisci corrupti doloremque eum sint qui aperiam optio natus.  </p>

                    </div>
                </div>

            </div>

            {/* Section Projects */}
            <div className="xl:ml-[250px] xl:pl-[120px] border-b border-gray-200  sm:ml-[230px] px-10 py-5 ">
                <div className="py-4">
                    <h1 className=" text-center text-3xl font-semibold text-white pt-2 pb-6 " id="Projects">Projects</h1>
                    <p className="text-center text-white "> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus delectus distinctio repellat, deserunt perspiciatis, totam minus eligendi fuga unde animi fugit adipisci corrupti doloremque eum sint qui aperiam optio natus.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 px-2 py-6">
                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2" />
                        <p className="visible transition duration-700 hover:invisible text-center text-white"> Project 1</p>
                    </div>

                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700 content-center">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2 " />
                        <p className="visible transition duration-700 hover:invisible text-center text-white"> Project 2</p>
                    </div>

                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2" />
                        <p className="visible transition duration-700 hover:invisible text-center text-white"> Project 2</p>
                    </div>

                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2" />
                        <p className="visible transition duration-700 hover:invisible text-center text-white"> Project 3</p>
                    </div>
                </div>

            </div>

            {/* Section Contact */}
            <div className="xl:ml-[250px] xl:pl-[120px]  border-gray-200 sm:ml-[230px] px-10 py-5">

                <div>
                    <h1 className="text-center text-3xl font-semibold text-white pt-2 pb-6" id="Contact">Contact</h1>
                    <p className="text-center text-white "> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus delectus distinctio repellat, deserunt perspiciatis, totam minus eligendi fuga unde animi fugit adipisci corrupti doloremque eum sint qui aperiam optio natus.</p>
                </div>

                <div className="grid grid-cols-1 gap-2 px-2 py-6">

                    <div className="">
                        <h1 className="font-bold text-xl text-white px-2 text-center py-2">Kurosaki Ichigo</h1>
                        <p className="px-2  text-white text-center">+229 96172375</p>
                        <p className="px-2  text-white text-center">benogoubiyi13@gmail.com</p>
                    </div>

                    <div className="px-2">
                        <h1 className="px-2 font-bold text-xl text-white text-center">Un mot pour moi ?</h1>
                        <form >

                            <ul className="flex-col px-2">
                                <li className="py-2 text-center ">
                                    <input type="text" name="Nom-Prenom" className=" placeholder:text-gray-900 bg-neutral-600 bg-opacity-60 text-white border pr-20" placeholder="nom-prenom..." id="fullName" />
                                </li>
                                <li className="py-2 text-center">
                                    <input type="email" placholder="Email" className="bg-neutral-600  placeholder:text-gray-900 bg-opacity-60 text-white border pr-20" placeholder="email..." id="email_id" />
                                </li>
                                <li className="py-2 text-center">
                                    <textarea type="text" className="bg-neutral-600  placeholder:text-gray-900 resize bg-opacity-60 text-white border pr-[130px]" placeholder="message..." id="message" />
                                </li>
                                <li className="py-2 text-center">
                                    <input type="submit" value="Envoyer" className="bg-white px-3 py-1 text-neutral-600 font-medium hover:bg-green-900  hover:text-white transition duration-700" onClick={SendMail()} />
                                </li>
                            </ul>

                        </form>
                    </div>

                    {/* <MyForm /> */}

                </div>

            {/* <div className="content-center">
                <audio controls src="Aqua Timez - Velonica.mp3"></audio>
            </div> */}
            </div>


        </div>
    )
}