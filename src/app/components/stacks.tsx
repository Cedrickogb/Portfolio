import React, { useRef } from 'react'
// import emailjs from "emailjs-com"
import Link from "next/link";

export default function Page() {

    return (
        <div className="flex flex-col space-y-4 p-6 lg:p-10 z-20">
            <div className="flex flex-wrap gap-4 justify-center lg:p-6 rounded-2xl">

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl">
                        <div className="p-2">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20">
                                <g clip-path="url(#clip0)">
                                    <path d="M11.2141 0.00645944C11.1625 0.0111515 10.9982 0.0275738 10.8504 0.039304C7.44164 0.346635 4.24868 2.18593 2.22639 5.01291C1.10029 6.58476 0.380059 8.36775 0.107918 10.2563C0.0117302 10.9156 0 11.1103 0 12.0041C0 12.898 0.0117302 13.0927 0.107918 13.7519C0.760117 18.2587 3.96716 22.0452 8.31672 23.4481C9.0956 23.6991 9.91672 23.8704 10.8504 23.9736C11.2141 24.0135 12.7859 24.0135 13.1496 23.9736C14.7613 23.7953 16.1267 23.3965 17.4733 22.7091C17.6798 22.6035 17.7196 22.5754 17.6915 22.5519C17.6727 22.5378 16.793 21.3578 15.7372 19.9314L13.8182 17.339L11.4135 13.7801C10.0903 11.8235 9.00176 10.2235 8.99238 10.2235C8.98299 10.2211 8.97361 11.8024 8.96891 13.7331C8.96188 17.1138 8.95953 17.2499 8.9173 17.3296C8.85631 17.4446 8.80938 17.4915 8.71085 17.5431C8.63578 17.5807 8.57009 17.5877 8.21584 17.5877H7.80997L7.70205 17.5197C7.63167 17.4751 7.58006 17.4164 7.54487 17.3484L7.4956 17.2428L7.50029 12.539L7.50733 7.83285L7.58006 7.74136C7.6176 7.69209 7.69736 7.62875 7.75367 7.59825C7.84985 7.55133 7.88739 7.54664 8.29325 7.54664C8.77185 7.54664 8.85161 7.5654 8.97595 7.70147C9.01114 7.73901 10.3132 9.7003 11.871 12.0628C13.4287 14.4252 15.5589 17.651 16.6053 19.2346L18.5056 22.1132L18.6018 22.0499C19.4534 21.4962 20.3543 20.7079 21.0674 19.8868C22.5853 18.1437 23.5636 16.0182 23.8921 13.7519C23.9883 13.0927 24 12.898 24 12.0041C24 11.1103 23.9883 10.9156 23.8921 10.2563C23.2399 5.74957 20.0328 1.96306 15.6833 0.560125C14.9161 0.311445 14.0997 0.140184 13.1848 0.036958C12.9595 0.0134976 11.4088 -0.0123089 11.2141 0.00645944ZM16.1267 7.26511C16.2393 7.32142 16.3308 7.42933 16.3636 7.54194C16.3824 7.60294 16.3871 8.90734 16.3824 11.8469L16.3754 16.0651L15.6317 14.9249L14.8856 13.7848V10.7185C14.8856 8.73608 14.895 7.62171 14.9091 7.56775C14.9466 7.43637 15.0287 7.33315 15.1413 7.27215C15.2375 7.22288 15.2727 7.21819 15.6411 7.21819C15.9883 7.21819 16.0493 7.22288 16.1267 7.26511Z" fill="currentColor" />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">Next.js</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69" className='w-20 h-20'>
                                <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/>
                            </svg>
                        </div>

                        <div className="absolute top-[-30%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-[#41b883] rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[20%] right-[20%] group-hover:translate-y-[-10%] group-hover:translate-x-[-20%] flex w-32 h-32 bg-[#34495e] rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[50%] left-[10%] group-hover:translate-y-[50%] group-hover:translate-x-[50%] flex w-32 h-32 bg-[#34495e] rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-50%] group-hover:translate-x-[-100%] flex w-24 h-24 bg-[#41b883] rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">Vue.js</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="p-2">
                            <svg fill="currentColor" className="h-20 w-20 text-sky-600" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>react</title>
                                <path d="M14.313 22.211c0.55 0.025 1.112 0.043 1.681 0.043 0.575 0 1.143-0.012 1.7-0.043-0.557 0.72-1.107 1.357-1.689 1.964l0.008-0.008c-0.579-0.6-1.135-1.238-1.659-1.902l-0.041-0.054zM8.615 21.411c1.083 0.275 2.404 0.509 3.752 0.653l0.131 0.011c0.825 1.133 1.659 2.13 2.554 3.068l-0.011-0.012c-1.311 1.463-3.080 2.491-5.081 2.86l-0.055 0.008c-0.004 0-0.008 0-0.012 0-0.248 0-0.482-0.061-0.687-0.169l0.008 0.004c-0.832-0.475-1.193-2.292-0.912-4.627 0.067-0.575 0.177-1.18 0.312-1.797zM23.398 21.398c0.118 0.474 0.229 1.078 0.308 1.692l0.009 0.086c0.287 2.334-0.067 4.149-0.892 4.634-0.184 0.102-0.404 0.162-0.638 0.162-0.023 0-0.046-0.001-0.069-0.002l0.003 0c-2.053-0.375-3.821-1.396-5.129-2.841l-0.007-0.008c0.879-0.923 1.707-1.918 2.466-2.965l0.058-0.084c1.476-0.154 2.799-0.392 4.088-0.717l-0.197 0.042zM9.784 17.666c0.25 0.49 0.512 0.978 0.8 1.468q0.431 0.731 0.881 1.428c-0.868-0.127-1.706-0.287-2.507-0.482 0.225-0.787 0.507-1.602 0.825-2.416zM22.212 17.641c0.331 0.821 0.612 1.64 0.845 2.434-0.8 0.196-1.645 0.362-2.519 0.487 0.3-0.469 0.6-0.952 0.881-1.447 0.281-0.487 0.544-0.985 0.795-1.475zM7.619 12.292c0.436 1.478 0.904 2.714 1.449 3.906l-0.075-0.182c-0.466 1.005-0.927 2.234-1.305 3.499l-0.052 0.205c-0.706-0.217-1.274-0.43-1.827-0.669l0.115 0.044c-2.164-0.921-3.564-2.132-3.564-3.092s1.4-2.177 3.564-3.094c0.525-0.225 1.1-0.428 1.694-0.617zM24.358 12.287c0.605 0.187 1.18 0.396 1.718 0.622 2.164 0.925 3.564 2.134 3.564 3.094-0.006 0.96-1.406 2.174-3.57 3.093-0.525 0.225-1.1 0.427-1.693 0.616-0.44-1.483-0.908-2.718-1.451-3.912l0.076 0.188c0.464-1.004 0.926-2.233 1.303-3.498l0.053-0.206zM20.53 11.444c0.869 0.129 1.706 0.287 2.507 0.484-0.225 0.79-0.506 1.602-0.825 2.416-0.25-0.487-0.512-0.978-0.8-1.467-0.281-0.49-0.581-0.967-0.881-1.432zM11.458 11.444c-0.3 0.471-0.6 0.953-0.88 1.45-0.281 0.487-0.544 0.977-0.794 1.467-0.331-0.82-0.612-1.637-0.845-2.433 0.8-0.187 1.643-0.354 2.518-0.482zM16 11.126c0.925 0 1.846 0.042 2.752 0.116q0.761 1.091 1.478 2.324 0.697 1.2 1.272 2.432c-0.385 0.819-0.807 1.637-1.266 2.437-0.475 0.825-0.966 1.61-1.475 2.337-0.91 0.079-1.832 0.122-2.762 0.122-0.925 0-1.846-0.044-2.752-0.116-0.507-0.727-1.002-1.505-1.478-2.324q-0.697-1.2-1.272-2.432c0.379-0.821 0.807-1.641 1.266-2.442 0.475-0.825 0.966-1.607 1.475-2.334 0.91-0.080 1.832-0.122 2.762-0.122zM15.981 7.845c0.58 0.6 1.136 1.237 1.659 1.901l0.040 0.053c-0.55-0.025-1.112-0.042-1.681-0.042-0.575 0-1.143 0.012-1.7 0.042 0.556-0.72 1.106-1.357 1.689-1.964l-0.008 0.008zM9.88 4.033c2.053 0.376 3.82 1.397 5.129 2.841l0.007 0.008c-0.879 0.924-1.707 1.919-2.466 2.968l-0.058 0.084c-1.475 0.153-2.798 0.389-4.086 0.714l0.196-0.042c-0.14-0.612-0.244-1.205-0.317-1.774-0.287-2.334 0.067-4.149 0.892-4.632 0.206-0.097 0.447-0.157 0.701-0.165l0.003-0zM22.090 4.008v0.008c0.013-0 0.028-0.001 0.044-0.001 0.239 0 0.464 0.059 0.662 0.163l-0.008-0.004c0.832 0.477 1.193 2.293 0.912 4.629-0.067 0.575-0.177 1.181-0.312 1.799-1.085-0.278-2.406-0.513-3.754-0.656l-0.128-0.011c-0.826-1.134-1.66-2.131-2.555-3.070l0.012 0.012c1.311-1.46 3.077-2.488 5.074-2.859l0.056-0.009zM22.096 2.646c-2.442 0.371-4.556 1.557-6.1 3.268l-0.008 0.009c-1.555-1.71-3.669-2.888-6.051-3.245l-0.056-0.007c-0.013-0-0.029-0-0.045-0-0.491 0-0.952 0.129-1.351 0.355l0.014-0.007c-1.718 0.991-2.103 4.079-1.216 7.954-3.804 1.175-6.278 3.053-6.278 5.032 0 1.987 2.487 3.87 6.302 5.036-0.88 3.89-0.487 6.983 1.235 7.973 0.378 0.217 0.832 0.344 1.315 0.344 0.022 0 0.044-0 0.065-0.001l-0.003 0c2.442-0.371 4.556-1.558 6.1-3.27l0.008-0.009c1.555 1.711 3.669 2.889 6.051 3.246l0.056 0.007c0.015 0 0.034 0 0.052 0 0.488 0 0.947-0.128 1.344-0.351l-0.014 0.007c1.717-0.99 2.103-4.078 1.216-7.954 3.79-1.165 6.264-3.047 6.264-5.029 0-1.987-2.487-3.87-6.302-5.039 0.88-3.886 0.487-6.982-1.235-7.973-0.382-0.219-0.84-0.348-1.328-0.348-0.013 0-0.026 0-0.039 0l0.002-0zM18.787 16.005c0 1.543-1.251 2.794-2.794 2.794s-2.794-1.251-2.794-2.794c0-1.543 1.251-2.794 2.794-2.794 0.772 0 1.47 0.313 1.976 0.818v0c0.506 0.506 0.818 1.204 0.818 1.976 0 0 0 0 0 0v0z"></path>
                            </svg>
                        </div>

                        <div className="absolute top-0 left-[10%] group-hover:translate-y-[10%] group-hover:translate-x-[-50%] flex w-22 h-22 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[-5%] right-[-5%] group-hover:translate-y-[100%] group-hover:translate-x-[0%] flex w-24 h-24 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-10%] left-[0%] group-hover:translate-y-[-50%] group-hover:translate-x-[100%] flex w-40 h-40 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>

                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">React</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="p-2">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-sky-600">
                                <title>file_type_tailwind</title>
                                <path d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z" fill='currentColor' className='hover:fill-blue' />
                            </svg>
                        </div>

                        <div className="absolute top-0 left-[30%] group-hover:translate-y-[10%] group-hover:translate-x-[-50%] flex w-24 h-24 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[-5%] right-[-5%] group-hover:translate-y-[100%] group-hover:translate-x-[0%] flex w-40 h-40 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute botom-0 left-[0%] group-hover:translate-y-[-50%] group-hover:translate-x-[100%] flex w-32 h-32 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">Tailwind CSS</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden" >
                        <div className="flex flex-col justify-center items-center space-y-2 p-2">
                        <svg className="h-20 w-20 text-orange-600" viewBox="-1 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>html [#124]</title>
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-61.000000, -7639.000000)" fill="currentColor">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path d="M19.4350881,7485 L19.4279481,7485 L10.8119794,7485 L11.0180201,7487 L19.2300674,7487 C19.109707,7488.752 18.7455658,7492.464 18.6119454,7494.153 L13.99949,7495.451 L13.99949,7495.455 L13.98929,7495.46 L9.37377458,7493.836 L9.05757353,7490 L11.3199411,7490 L11.4800816,7492.063 L13.99337,7493 L13.99949,7493 L16.5086984,7492.1 L16.7667592,7489 L8.95659319,7489 C8.91885306,7488.599 8.43333144,7483.392 8.34867116,7483 L19.6370488,7483 C19.5738086,7483.66 19.5095484,7484.338 19.4350881,7485 L19.4350881,7485 Z M5,7479 L6.63812546,7497.148 L13.98929,7499 L21.3598345,7497.111 L23,7479 L5,7479 Z" id="html-[#124]"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </div>

                        <div className="absolute top-[-30%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-orange-600 rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[40%] left-[20%] group-hover:translate-y-[50%] group-hover:translate-x-[50%] flex w-32 h-32 bg-orange-600 rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-50%] group-hover:translate-x-[-100%] flex w-24 h-24 bg-orange-600 rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-semibold transition duration-700">HTML5</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden" >
                        <div className="flex flex-col justify-center items-center space-y-2 p-2">
                            <svg fill="currentColor"  version="1.1" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-sky-400" viewBox="0 0 512 512" enable-background="new 0 0 512 512">
                                <g id="c133de6af664cd4f011a55de6b001b19">
                                <path display="inline" d="M483.111,0.501l-42.59,461.314l-184.524,49.684L71.47,461.815L28.889,0.501H483.111z M397.29,94.302
                                    H255.831H111.866l6.885,55.708h137.08h7.7l-7.7,3.205l-132.07,55.006l4.38,54.453l127.69,0.414l68.438,0.217l-4.381,72.606
                                    l-64.058,18.035v-0.057l-0.525,0.146l-61.864-15.617l-3.754-45.07h-0.205H132.1h-0.202l7.511,87.007l116.423,34.429v-0.062
                                    l0.21,0.062l115.799-33.802l15.021-172.761h-131.03h-0.323l0.323-0.14l135.83-58.071L397.29,94.302z">
                                </path>
                                </g>
                            </svg>
                        </div>

                        <div className="absolute top-[-30%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-sky-400 rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[40%] left-[20%] group-hover:translate-y-[50%] group-hover:translate-x-[50%] flex w-32 h-32 bg-sky-400 rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-50%] group-hover:translate-x-[-100%] flex w-24 h-24 bg-sky-400 rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-semibold transition duration-700">CSS3</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="flex flex-col justify-center items-center space-y-2 p-2">
                            <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-yellow-400" color='currentColor' >
                                <title>javascript</title>
                                <path d="M17.313 14.789h-2.809c0 2.422-0.011 4.829-0.011 7.254 0.033 0.329 0.051 0.712 0.051 1.099 0 0.81-0.081 1.601-0.236 2.365l0.013-0.076c-0.412 0.861-1.475 0.751-1.957 0.6-0.451-0.242-0.808-0.609-1.031-1.055l-0.006-0.014c-0.044-0.094-0.097-0.174-0.16-0.246l0.001 0.001-2.281 1.406c0.367 0.79 0.934 1.434 1.637 1.885l0.018 0.011c0.763 0.427 1.675 0.678 2.645 0.678 0.484 0 0.954-0.063 1.401-0.18l-0.038 0.009c0.988-0.248 1.793-0.89 2.254-1.744l0.009-0.019c0.359-0.914 0.566-1.973 0.566-3.080 0-0.388-0.026-0.77-0.075-1.145l0.005 0.044c0.015-2.567 0-5.135 0-7.722zM28.539 23.843c-0.219-1.368-1.11-2.518-3.753-3.59-0.92-0.431-1.942-0.731-2.246-1.425-0.063-0.158-0.099-0.341-0.099-0.532 0-0.124 0.015-0.244 0.044-0.359l-0.002 0.010c0.208-0.55 0.731-0.935 1.343-0.935 0.199 0 0.388 0.040 0.559 0.113l-0.009-0.004c0.552 0.19 0.988 0.594 1.215 1.112l0.005 0.013c1.292-0.845 1.292-0.845 2.193-1.406-0.216-0.369-0.459-0.689-0.734-0.977l0.002 0.002c-0.767-0.814-1.852-1.32-3.056-1.32-0.171 0-0.34 0.010-0.505 0.030l0.020-0.002-0.881 0.111c-0.856 0.194-1.587 0.639-2.133 1.252l-0.003 0.004c-0.535 0.665-0.859 1.519-0.859 2.449 0 1.279 0.613 2.415 1.56 3.131l0.010 0.007c1.706 1.275 4.2 1.555 4.519 2.755 0.3 1.462-1.087 1.931-2.457 1.762-0.957-0.218-1.741-0.83-2.184-1.652l-0.009-0.017-2.287 1.313c0.269 0.536 0.607 0.994 1.011 1.385l0.001 0.001c2.174 2.194 7.61 2.082 8.586-1.255 0.113-0.364 0.178-0.782 0.178-1.215 0-0.3-0.031-0.593-0.091-0.875l0.005 0.028zM1.004 1.004h29.991v29.991h-29.991z"></path>
                            </svg>
                        </div>

                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-180%] group-hover:translate-x-[-300%] flex w-24 h-24 bg-yellow-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-0 right-[30%] group-hover:translate-y-[50%] group-hover:translate-x-[100%] flex w-32 h-32 bg-yellow-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-5%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-yellow-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">JavaScript</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="flex flex-col justify-center items-center space-y-2 p-2">
                            <svg className="h-20 w-20 text-sky-700" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 5H5V20H20V5ZM11.0769 18H9.82349V13.0444H8.02637V12.011H12.874V13.0444H11.0769V18ZM18.2893 16.2153C18.2893 17.4023 17.3679 18.1536 15.8738 18.1536C14.4419 18.1536 13.5371 17.4688 13.4666 16.4062L13.4624 16.3398H14.6702L14.6743 16.3813C14.72 16.8296 15.2056 17.1326 15.907 17.1326C16.5752 17.1326 17.0359 16.813 17.0359 16.3523V16.3481C17.0359 15.9539 16.7412 15.7339 15.9983 15.5803L15.3674 15.4517C14.1223 15.1985 13.5869 14.6174 13.5869 13.7085V13.7043C13.5869 12.592 14.5415 11.8574 15.8696 11.8574C17.2683 11.8574 18.0901 12.5962 18.1689 13.5964L18.1731 13.6504H16.9944L16.9861 13.6006C16.9155 13.1731 16.5005 12.8743 15.8696 12.8743C15.2512 12.8784 14.8403 13.1606 14.8403 13.6089V13.613C14.8403 14.0032 15.1309 14.2356 15.8364 14.3809L16.4714 14.5095C17.7373 14.771 18.2893 15.2773 18.2893 16.2112V16.2153Z" fill="currentColor"/>
                            </svg>
                        </div>

                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-180%] group-hover:translate-x-[-300%] flex w-24 h-24 bg-sky-700  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-0 right-[30%] group-hover:translate-y-[50%] group-hover:translate-x-[100%] flex w-32 h-32 bg-sky-700  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-5%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-sky-700  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">JavaScript</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="flex flex-col justify-center items-center space-y-2 p-2">
                            <svg className="h-20 w-20 text-green-700" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <title>node-js</title>
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="invisible_box" data-name="invisible box">
                                    <rect width="48" height="48" fill="none"/>
                                    </g>
                                    <g id="Q3_icons" data-name="Q3 icons">
                                    <g>
                                        <path fill="currentColor" d="M42.3,11.8,25.7,2.4a4,4,0,0,0-3.4,0L5.7,11.8A3.4,3.4,0,0,0,4,14.7V33.3a3.4,3.4,0,0,0,1.7,2.9l4.4,2.5a7.2,7.2,0,0,0,3.8,1c3.1,0,4.9-1.9,4.9-5.1V16.3a.5.5,0,0,0-.5-.5H16.2a.5.5,0,0,0-.5.5V34.6c0,1.5-1.5,2.9-3.9,1.7L7.2,33.7a.5.5,0,0,1-.2-.4V14.7a.8.8,0,0,1,.2-.5L23.7,4.9h.6l16.5,9.3a.8.8,0,0,1,.2.5V33.3a.5.5,0,0,1-.2.4L24.3,43a.6.6,0,0,1-.6,0l-4.2-2.4a.3.3,0,0,0-.4,0l-2.5,1.1c-.3.1-.7.2.1.7l5.6,3.1a3.1,3.1,0,0,0,3.4,0l16.6-9.3A3.4,3.4,0,0,0,44,33.3V14.7A3.4,3.4,0,0,0,42.3,11.8Z"/>
                                        <path fill="currentColor" d="M29.1,30.3c-4.4,0-5.3-1-5.7-3.1a.4.4,0,0,0-.4-.4H20.8a.4.4,0,0,0-.4.4c0,2.7,1.5,6,8.7,6,5.2,0,8.2-2,8.2-5.5s-2.4-4.5-7.5-5.1-5.6-1-5.6-2.2.4-2.2,4.2-2.2,4.7.7,5.2,2.9a.5.5,0,0,0,.5.4h2.1l.4-.2a.4.4,0,0,0,.1-.3c-.3-3.9-3-5.7-8.3-5.7s-7.5,2-7.5,5.2,2.8,4.5,7.3,5,5.9,1.2,5.9,2.3S32.6,30.3,29.1,30.3Z"/>
                                    </g>
                                    </g>
                                </g>
                            </svg>
                        </div>

                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-180%] group-hover:translate-x-[-300%] flex w-24 h-24 bg-green-700  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-0 right-[30%] group-hover:translate-y-[50%] group-hover:translate-x-[100%] flex w-32 h-32 bg-green-700  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-5%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-green-700  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">Node js</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="p-2">
                            <svg fill="currentColor" className="h-20 w-20 text-orange-400" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <title>git</title>
                                <path d="M30.428 14.663l-13.095-13.094c-0.35-0.349-0.833-0.565-1.367-0.565s-1.017 0.216-1.367 0.565l0-0-2.713 2.718 3.449 3.449c0.22-0.077 0.473-0.121 0.737-0.121 1.269 0 2.297 1.028 2.297 2.297 0 0.269-0.046 0.526-0.131 0.766l0.005-0.016 3.322 3.324c0.222-0.079 0.479-0.125 0.746-0.125 1.268 0 2.296 1.028 2.296 2.296s-1.028 2.296-2.296 2.296c-1.268 0-2.296-1.028-2.296-2.296 0-0.313 0.063-0.611 0.176-0.883l-0.006 0.015-3.11-3.094v8.154c0.764 0.385 1.279 1.163 1.279 2.061 0 1.27-1.030 2.3-2.3 2.3s-2.3-1.030-2.3-2.3c0-0.634 0.256-1.207 0.671-1.623l-0 0c0.211-0.211 0.462-0.382 0.741-0.502l0.015-0.006v-8.234c-0.842-0.354-1.422-1.173-1.422-2.126 0-0.32 0.065-0.624 0.183-0.901l-0.006 0.015-3.389-3.405-8.98 8.974c-0.348 0.351-0.562 0.834-0.562 1.368s0.215 1.017 0.563 1.368l13.096 13.092c0.349 0.35 0.832 0.566 1.366 0.566s1.016-0.216 1.366-0.566l13.034-13.034c0.35-0.349 0.567-0.833 0.567-1.366s-0.217-1.017-0.567-1.366l-0-0z"></path>
                            </svg>
                        </div>

                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-180%] group-hover:translate-x-[-300%] flex w-24 h-24 bg-orange-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-0 right-[30%] group-hover:translate-y-[50%] group-hover:translate-x-[100%] flex w-32 h-32 bg-orange-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-5%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-orange-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">Git</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="p-2">
                            <svg className="h-20 w-20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" >
                                <path fill="currentColor" fill-rule="evenodd" d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z" clip-rule="evenodd" />
                            </svg>
                        </div>

                        <div className="absolute bottom-0 right-0 group-hover:translate-y-[-180%] group-hover:translate-x-[-300%] flex w-24 h-24 bg-neutral-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-0 right-[30%] group-hover:translate-y-[50%] group-hover:translate-x-[100%] flex w-32 h-32 bg-neutral-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-5%] left-[-5%] group-hover:translate-y-[10%] group-hover:translate-x-[120%] flex w-40 h-40 bg-neutral-400  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">GitHub</h1>
                </div>

                <div className="group flex flex-col justify-center items-center space-y-2">
                    <div className="relative p-2 text-white bg-neutral-600/40 hover:bg-neutral-600/80 transition duration-700 cursor-pointer rounded-2xl overflow-hidden">
                        <div className="p-2">
                            <svg fill="currentColor" className="h-20 w-20 text-sky-600" viewBox="0 0 32 32" id="Camada_1" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M28,25.6l-5.9,2.4l-9.7-9.6l-6.1,4.8L4,21.9V10.1l2.3-1.2l6.1,4.8L22.1,4L28,6.4V25.6z M15.7,16l6.3,5l0,0V11L15.7,16  L15.7,16z M6.3,19.7L6.3,19.7L10,16l-3.6-3.7l0,0L6.3,19.7L6.3,19.7z"/></svg>
                        </div>

                        <div className="absolute top-0 left-[30%] group-hover:translate-y-[10%] group-hover:translate-x-[-50%] flex w-20 h-20 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute top-[-5%] right-[-5%] group-hover:translate-y-[100%] group-hover:translate-x-[0%] flex w-24 h-24 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>
                        <div className="absolute bottom-[-10%] left-[0%] group-hover:translate-y-[-50%] group-hover:translate-x-[100%] flex w-40 h-40 bg-sky-600  rounded-full filter blur-2xl -z-10 transition duration-700"></div>

                    </div>
                    <h1 className="invisible group-hover:visible text-sm font-medium">Vs code</h1>
                </div>

            </div>

        </div>
    )
}