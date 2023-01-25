import React, { useRef } from 'react'
import emailjs from "emailjs-com"
import Link from "next/link";
export default function Page() {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_2rgpnmg', 'template_a3eaole', e.target, 'H6vSPvEf36X6FpChS')
        .then((result) => {
            console.log(result.text);
            alert("Message sent!");
        }, (error) => {
            console.log(error.text);
            alert("Message not sent!");
        });
    };


    return (
        <div className="bg-cover bg-center bg-fixed bg-no-repeat  pl-2 pr-2 " style={{ backgroundImage: `url(/page-bg8.jpg)` }}>
            {/* Section About Me */}
            <div className="xl:ml-[250px] xl:pl-[120px] border-b border-gray-200  sm:ml-[230px] px-10 py-5 ">
                <h1 className="text-center text-3xl font-semibold text-white pt-20 pb-6 " id="About me">About me</h1>
                <p className="text-center text-white mt-2">Bienvenue, moi c'est OGOUBIYI Cédrick Gbemahonmédé j'ai 20ans, je suis étudiant en troisième année d'Architechture Logiciel à l'Ecole Supérieur de Gestion d'Informatique et des Sciences, je suis passionné d'informatique et de dessin. Très féru de manga de jeux-videos et de nouvelles technologies,  je suis aussi avide de connaissances et de nouvelles expérience donc j'aime me lancer de nouveaux défis.</p>
            </div>

            {/* Section Points forts */}
            <div className="xl:ml-[250px] xl:pl-[120px] border-b border-gray-200  sm:ml-[230px] px-10 py-5 ">
                <h1 className="text-center text-3xl font-semibold text-white pt-2 pb-6" id="Points fort">Points forts</h1>
                <p className="text-center text-white mt-2 pb-5">Comme la majorité des développeur ou des web développeur et étant encore étudiant il y a des domaines où j'excèlle et d'autres où mes performances ne sont pas élevées, j'excèlle donc avec les technologies suivantes:</p>

                <div className="grid grid-cols-2 gap-2 px-2 py-6">
                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700" >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-20 w-20 my-2 hover:text-green">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        <h1 className="text-2xl font-medium py-1">HTML5 & CSS3</h1>
                        <p className="py-2">Le HTML5 est un language de balisage qui permet l'écriture de l'hypertexte nécesaire à la mise en forme d'une page web, tandis que le CSS3 (Cascading Style Sheets) lui est un language informatique qui permet de mettre en forme, stylisé une page web.</p>

                    </div>

                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700  ">

                        <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 my-2"  color='currentColor' >
                            <title>javascript</title>
                            <path d="M17.313 14.789h-2.809c0 2.422-0.011 4.829-0.011 7.254 0.033 0.329 0.051 0.712 0.051 1.099 0 0.81-0.081 1.601-0.236 2.365l0.013-0.076c-0.412 0.861-1.475 0.751-1.957 0.6-0.451-0.242-0.808-0.609-1.031-1.055l-0.006-0.014c-0.044-0.094-0.097-0.174-0.16-0.246l0.001 0.001-2.281 1.406c0.367 0.79 0.934 1.434 1.637 1.885l0.018 0.011c0.763 0.427 1.675 0.678 2.645 0.678 0.484 0 0.954-0.063 1.401-0.18l-0.038 0.009c0.988-0.248 1.793-0.89 2.254-1.744l0.009-0.019c0.359-0.914 0.566-1.973 0.566-3.080 0-0.388-0.026-0.77-0.075-1.145l0.005 0.044c0.015-2.567 0-5.135 0-7.722zM28.539 23.843c-0.219-1.368-1.11-2.518-3.753-3.59-0.92-0.431-1.942-0.731-2.246-1.425-0.063-0.158-0.099-0.341-0.099-0.532 0-0.124 0.015-0.244 0.044-0.359l-0.002 0.010c0.208-0.55 0.731-0.935 1.343-0.935 0.199 0 0.388 0.040 0.559 0.113l-0.009-0.004c0.552 0.19 0.988 0.594 1.215 1.112l0.005 0.013c1.292-0.845 1.292-0.845 2.193-1.406-0.216-0.369-0.459-0.689-0.734-0.977l0.002 0.002c-0.767-0.814-1.852-1.32-3.056-1.32-0.171 0-0.34 0.010-0.505 0.030l0.020-0.002-0.881 0.111c-0.856 0.194-1.587 0.639-2.133 1.252l-0.003 0.004c-0.535 0.665-0.859 1.519-0.859 2.449 0 1.279 0.613 2.415 1.56 3.131l0.010 0.007c1.706 1.275 4.2 1.555 4.519 2.755 0.3 1.462-1.087 1.931-2.457 1.762-0.957-0.218-1.741-0.83-2.184-1.652l-0.009-0.017-2.287 1.313c0.269 0.536 0.607 0.994 1.011 1.385l0.001 0.001c2.174 2.194 7.61 2.082 8.586-1.255 0.113-0.364 0.178-0.782 0.178-1.215 0-0.3-0.031-0.593-0.091-0.875l0.005 0.028zM1.004 1.004h29.991v29.991h-29.991z"></path>
                        </svg>
                        <h1 className="text-2xl font-medium py-1">JavaScript</h1>
                        <p className="py-2">Le JavaScript est un langage de programmation dynamique complet qui utilsé sur un document HTML, peut fournir une interactivité dynamique sur les sites Web, c'est un puissant outil de de dynamisation de site web.</p>

                    </div>


                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg className="h-20 w-20 my-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" >
                            <path fill="currentColor" fill-rule="evenodd" d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z" clip-rule="evenodd"/>
                        </svg>
                        <h1 className="text-2xl font-medium py-1">GitHub</h1>
                        <p className="py-2"> C'est un service web d'hébergement et de gestion de développement de logiciels, utilisant le logiciel de versioning Git.</p>

                    </div>

                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 my-2">
                            <title>angular</title>
                            <path d="M24.826 23.885h-3.297l-1.777-4.377h-7.507l-1.777 4.379h-3.299l8.83-19.571zM15.999 1.004l-14.145 4.976 2.157 18.458 11.989 6.557 11.992-6.551 2.154-18.462-14.147-4.977zM13.414 16.806h5.171l-2.587-6.133z"></path>
                        </svg>
                        <h1 className="text-2xl font-medium py-1">Angular</h1>
                        <p className="py-2"> C'est un framework pour clients, basé sur TypeScript permettant la création d’applications Web, particulièrement d'applications Web monopages axé sur la fluidité de l’expérience utilisateur.</p>

                    </div>

                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 my-2">
                            <g clip-path="url(#clip0)">
                            <path d="M11.2141 0.00645944C11.1625 0.0111515 10.9982 0.0275738 10.8504 0.039304C7.44164 0.346635 4.24868 2.18593 2.22639 5.01291C1.10029 6.58476 0.380059 8.36775 0.107918 10.2563C0.0117302 10.9156 0 11.1103 0 12.0041C0 12.898 0.0117302 13.0927 0.107918 13.7519C0.760117 18.2587 3.96716 22.0452 8.31672 23.4481C9.0956 23.6991 9.91672 23.8704 10.8504 23.9736C11.2141 24.0135 12.7859 24.0135 13.1496 23.9736C14.7613 23.7953 16.1267 23.3965 17.4733 22.7091C17.6798 22.6035 17.7196 22.5754 17.6915 22.5519C17.6727 22.5378 16.793 21.3578 15.7372 19.9314L13.8182 17.339L11.4135 13.7801C10.0903 11.8235 9.00176 10.2235 8.99238 10.2235C8.98299 10.2211 8.97361 11.8024 8.96891 13.7331C8.96188 17.1138 8.95953 17.2499 8.9173 17.3296C8.85631 17.4446 8.80938 17.4915 8.71085 17.5431C8.63578 17.5807 8.57009 17.5877 8.21584 17.5877H7.80997L7.70205 17.5197C7.63167 17.4751 7.58006 17.4164 7.54487 17.3484L7.4956 17.2428L7.50029 12.539L7.50733 7.83285L7.58006 7.74136C7.6176 7.69209 7.69736 7.62875 7.75367 7.59825C7.84985 7.55133 7.88739 7.54664 8.29325 7.54664C8.77185 7.54664 8.85161 7.5654 8.97595 7.70147C9.01114 7.73901 10.3132 9.7003 11.871 12.0628C13.4287 14.4252 15.5589 17.651 16.6053 19.2346L18.5056 22.1132L18.6018 22.0499C19.4534 21.4962 20.3543 20.7079 21.0674 19.8868C22.5853 18.1437 23.5636 16.0182 23.8921 13.7519C23.9883 13.0927 24 12.898 24 12.0041C24 11.1103 23.9883 10.9156 23.8921 10.2563C23.2399 5.74957 20.0328 1.96306 15.6833 0.560125C14.9161 0.311445 14.0997 0.140184 13.1848 0.036958C12.9595 0.0134976 11.4088 -0.0123089 11.2141 0.00645944ZM16.1267 7.26511C16.2393 7.32142 16.3308 7.42933 16.3636 7.54194C16.3824 7.60294 16.3871 8.90734 16.3824 11.8469L16.3754 16.0651L15.6317 14.9249L14.8856 13.7848V10.7185C14.8856 8.73608 14.895 7.62171 14.9091 7.56775C14.9466 7.43637 15.0287 7.33315 15.1413 7.27215C15.2375 7.22288 15.2727 7.21819 15.6411 7.21819C15.9883 7.21819 16.0493 7.22288 16.1267 7.26511Z" fill="currentColor"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <h1 className="text-2xl font-medium py-1">Next.js</h1>
                        <p className="py-2"> Next.js est un framework React qui vous permet de créer des sites web statiques et des applications web surpuissantes, adaptés au référencement et extrêmement conviviaux à l’aide du framework React.</p>

                    </div>

                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 my-2">
                            <title>file_type_tailwind</title>
                            <path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" fill='currentColor' className='hover:fill-blue'/>
                        </svg>
                        <h1 className="text-2xl font-medium py-1">Tailwind CSS</h1>
                        <p className="py-2 "> Tailwind CSS est un framework CSS open source. C'est un framework conçu pour permettre aux utilisateurs de créer des applications plus rapidement et plus facilement.</p>

                    </div>

                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg fill="currentColor" className="h-20 w-20 my-2" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>react</title>
                            <path d="M14.313 22.211c0.55 0.025 1.112 0.043 1.681 0.043 0.575 0 1.143-0.012 1.7-0.043-0.557 0.72-1.107 1.357-1.689 1.964l0.008-0.008c-0.579-0.6-1.135-1.238-1.659-1.902l-0.041-0.054zM8.615 21.411c1.083 0.275 2.404 0.509 3.752 0.653l0.131 0.011c0.825 1.133 1.659 2.13 2.554 3.068l-0.011-0.012c-1.311 1.463-3.080 2.491-5.081 2.86l-0.055 0.008c-0.004 0-0.008 0-0.012 0-0.248 0-0.482-0.061-0.687-0.169l0.008 0.004c-0.832-0.475-1.193-2.292-0.912-4.627 0.067-0.575 0.177-1.18 0.312-1.797zM23.398 21.398c0.118 0.474 0.229 1.078 0.308 1.692l0.009 0.086c0.287 2.334-0.067 4.149-0.892 4.634-0.184 0.102-0.404 0.162-0.638 0.162-0.023 0-0.046-0.001-0.069-0.002l0.003 0c-2.053-0.375-3.821-1.396-5.129-2.841l-0.007-0.008c0.879-0.923 1.707-1.918 2.466-2.965l0.058-0.084c1.476-0.154 2.799-0.392 4.088-0.717l-0.197 0.042zM9.784 17.666c0.25 0.49 0.512 0.978 0.8 1.468q0.431 0.731 0.881 1.428c-0.868-0.127-1.706-0.287-2.507-0.482 0.225-0.787 0.507-1.602 0.825-2.416zM22.212 17.641c0.331 0.821 0.612 1.64 0.845 2.434-0.8 0.196-1.645 0.362-2.519 0.487 0.3-0.469 0.6-0.952 0.881-1.447 0.281-0.487 0.544-0.985 0.795-1.475zM7.619 12.292c0.436 1.478 0.904 2.714 1.449 3.906l-0.075-0.182c-0.466 1.005-0.927 2.234-1.305 3.499l-0.052 0.205c-0.706-0.217-1.274-0.43-1.827-0.669l0.115 0.044c-2.164-0.921-3.564-2.132-3.564-3.092s1.4-2.177 3.564-3.094c0.525-0.225 1.1-0.428 1.694-0.617zM24.358 12.287c0.605 0.187 1.18 0.396 1.718 0.622 2.164 0.925 3.564 2.134 3.564 3.094-0.006 0.96-1.406 2.174-3.57 3.093-0.525 0.225-1.1 0.427-1.693 0.616-0.44-1.483-0.908-2.718-1.451-3.912l0.076 0.188c0.464-1.004 0.926-2.233 1.303-3.498l0.053-0.206zM20.53 11.444c0.869 0.129 1.706 0.287 2.507 0.484-0.225 0.79-0.506 1.602-0.825 2.416-0.25-0.487-0.512-0.978-0.8-1.467-0.281-0.49-0.581-0.967-0.881-1.432zM11.458 11.444c-0.3 0.471-0.6 0.953-0.88 1.45-0.281 0.487-0.544 0.977-0.794 1.467-0.331-0.82-0.612-1.637-0.845-2.433 0.8-0.187 1.643-0.354 2.518-0.482zM16 11.126c0.925 0 1.846 0.042 2.752 0.116q0.761 1.091 1.478 2.324 0.697 1.2 1.272 2.432c-0.385 0.819-0.807 1.637-1.266 2.437-0.475 0.825-0.966 1.61-1.475 2.337-0.91 0.079-1.832 0.122-2.762 0.122-0.925 0-1.846-0.044-2.752-0.116-0.507-0.727-1.002-1.505-1.478-2.324q-0.697-1.2-1.272-2.432c0.379-0.821 0.807-1.641 1.266-2.442 0.475-0.825 0.966-1.607 1.475-2.334 0.91-0.080 1.832-0.122 2.762-0.122zM15.981 7.845c0.58 0.6 1.136 1.237 1.659 1.901l0.040 0.053c-0.55-0.025-1.112-0.042-1.681-0.042-0.575 0-1.143 0.012-1.7 0.042 0.556-0.72 1.106-1.357 1.689-1.964l-0.008 0.008zM9.88 4.033c2.053 0.376 3.82 1.397 5.129 2.841l0.007 0.008c-0.879 0.924-1.707 1.919-2.466 2.968l-0.058 0.084c-1.475 0.153-2.798 0.389-4.086 0.714l0.196-0.042c-0.14-0.612-0.244-1.205-0.317-1.774-0.287-2.334 0.067-4.149 0.892-4.632 0.206-0.097 0.447-0.157 0.701-0.165l0.003-0zM22.090 4.008v0.008c0.013-0 0.028-0.001 0.044-0.001 0.239 0 0.464 0.059 0.662 0.163l-0.008-0.004c0.832 0.477 1.193 2.293 0.912 4.629-0.067 0.575-0.177 1.181-0.312 1.799-1.085-0.278-2.406-0.513-3.754-0.656l-0.128-0.011c-0.826-1.134-1.66-2.131-2.555-3.070l0.012 0.012c1.311-1.46 3.077-2.488 5.074-2.859l0.056-0.009zM22.096 2.646c-2.442 0.371-4.556 1.557-6.1 3.268l-0.008 0.009c-1.555-1.71-3.669-2.888-6.051-3.245l-0.056-0.007c-0.013-0-0.029-0-0.045-0-0.491 0-0.952 0.129-1.351 0.355l0.014-0.007c-1.718 0.991-2.103 4.079-1.216 7.954-3.804 1.175-6.278 3.053-6.278 5.032 0 1.987 2.487 3.87 6.302 5.036-0.88 3.89-0.487 6.983 1.235 7.973 0.378 0.217 0.832 0.344 1.315 0.344 0.022 0 0.044-0 0.065-0.001l-0.003 0c2.442-0.371 4.556-1.558 6.1-3.27l0.008-0.009c1.555 1.711 3.669 2.889 6.051 3.246l0.056 0.007c0.015 0 0.034 0 0.052 0 0.488 0 0.947-0.128 1.344-0.351l-0.014 0.007c1.717-0.99 2.103-4.078 1.216-7.954 3.79-1.165 6.264-3.047 6.264-5.029 0-1.987-2.487-3.87-6.302-5.039 0.88-3.886 0.487-6.982-1.235-7.973-0.382-0.219-0.84-0.348-1.328-0.348-0.013 0-0.026 0-0.039 0l0.002-0zM18.787 16.005c0 1.543-1.251 2.794-2.794 2.794s-2.794-1.251-2.794-2.794c0-1.543 1.251-2.794 2.794-2.794 0.772 0 1.47 0.313 1.976 0.818v0c0.506 0.506 0.818 1.204 0.818 1.976 0 0 0 0 0 0v0z"></path>
                        </svg>
                        <h1 className="text-2xl font-medium py-1">React</h1>
                        <p className="py-2">React est une bibliothèque JavaScript open-source qui est utilisée pour construire des interfaces utilisateur spécifiquement pour des applications d'une seule page. Elle est utilisée pour gérer la couche d'affichage des applications web et mobiles et aussi pour créer des composants d'interface utilisateur réutilisables.</p>

                    </div>

                    <div className=" px-2 text-white bg-neutral-600 bg-opacity-40 hover:bg-slate-100 hover:text-black transition duration-700">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-20 w-20 my-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                        <h1 className="text-2xl font-medium py-1">Idées créatives</h1>
                        <p className="py-2"> Concernant le developpement de solution informatique je ne taris pas de d'idées et de ressources également talentueux en dessin et ayant été responsable et instructeur en dessin pour des collegiens, j'ai de très bonnes idées pour le graphisme et le design.</p>

                    </div>

                </div>

            </div>

            {/* Section Projects */}
            <div className="xl:ml-[250px] xl:pl-[120px] border-b border-gray-200  sm:ml-[230px] px-10 py-5 ">
                <div className="py-4">
                    <h1 className=" text-center text-3xl font-semibold text-white pt-2 pb-6 " id="Projects">Projects</h1>
                    <p className="text-center text-white "> Voici un petit étallage des différents projets que j'ai commencer et mener jusqu'à la fin. </p>
                </div>

                <div className="grid grid-cols-2 gap-2 px-2 py-6">
                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2" />
                        <p className="transition duration-700 text-center text-white">
                            <Link href=""> Projet 1</Link>
                        </p>
                    </div>

                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700 content-center">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2 " />
                        <p className="transition duration-700 text-center text-white">
                            <Link href=""> Projet 2</Link>
                        </p>                    
                    </div>

                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2" />
                        <p className="transition duration-700 text-center text-white">
                            <Link href=""> Projet 3</Link>
                        </p>                    
                    </div>

                    <div className="hover:bg-neutral-600 hover:bg-opacity-40 transition duration-700">
                        <img src="/Kurosaki Ichigo.png" width={500} height={25} className="px-2 py-2" />
                        <p className="transition duration-700 text-center text-white">
                            <Link href=""> Projet 4</Link>
                        </p>                    
                    </div>
                </div>

            </div>

            {/* Section Contact */}
            <div className="xl:ml-[250px] xl:pl-[120px]  border-gray-200 sm:ml-[230px] px-10 py-5 ">

                <div>
                    <h1 className="text-center text-3xl font-semibold text-white pt-2 pb-6" id="Contact">Contact</h1>
                    <p className="text-center text-white ">Avez vous besoin de mes services ou des suggestions à me faire ? Cette petite section vous aidera.</p>
                </div>

                <div className="grid grid-cols-1 gap-2 px-2 py-6">

                    <div className="">
                        <h1 className="font-bold text-xl text-white px-2 text-center py-2">OGOUBIYI Cédrick</h1>
                        <p className="px-2  text-white text-center">+229 96172375</p>
                        <p className="px-2  text-white text-center">benogoubiyi13@gmail.com</p>
                    </div>

                    <div className="px-2">
                        <h1 className="px-2 font-bold text-xl text-white text-center">Message</h1>
                        
                        <form ref={form} onSubmit={sendEmail} className="flex-col px-2 text-center">
                            <div className="py-2 text-center">
                                <input type="text" id="fullName" name="name" className="pr-[50px] bg-neutral-600  placeholder:text-gray-900 bg-opacity-60 text-white border" placeholder="nom et prenom..."/>
                            </div>
                            <div className="py-2 text-center">
                                <input type="text" id="email_id" name="email" className="pr-[50px] bg-neutral-600  placeholder:text-gray-900 bg-opacity-60 text-white border" placeholder="email..."/>
                            </div>
                            <div className="py-2 text-center">
                                <textarea type="text" id="message" name="message" className="bg-neutral-600  placeholder:text-gray-900 resize bg-opacity-60 text-white border pr-[100px]" placeholder="message..."/>
                            </div>
                            <input type="submit" className="bg-white px-3 py-1 text-neutral-600 font-medium hover:bg-green-900  hover:text-white transition duration-700" value="Send"/>
                        </form>

                    </div>

                    {/* <MyForm /> */}

                </div>

            </div>

        </div>
    )
}