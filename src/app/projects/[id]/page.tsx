// src/app/projects/[id]/page.tsx
import { QUESTS } from '../../../../constants'; // Ajuste le chemin selon ton dossier
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // On cherche le projet qui correspond à l'ID passé dans l'URL
  const project = QUESTS.find((quest) => quest.id === params.id);

  // Si aucun projet ne correspond à l'URL, on renvoie une page 404
  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-20 pointer-events-none"></div>

      <Link 
         href="/projects" 
         className="text-primary hover:underline mb-8 inline-block font-mono text-sm"
      >
         ← Back to Quests
      </Link>

      <div className='relative flex justify-between'>
         <section className='relative w-full md:w-3/5'>
            <article className="bg-white/80 dark:bg-card-dark/60 space-y-4 md:space-y-6 backdrop-blur-md rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700/50 shadow-lg">
               <header className="">
                  <h1 className="text-xl md:text-4xl font-display text-primary mb-4">
                     {project.title}
                  </h1>
               </header>

               <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <Image 
                     src={project.image} 
                     alt={project.title} 
                     fill
                     className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(255,255,255,0))] to-transparent"></div>
               </div>
               
               <div className='w-full flex justify-between items-center px-2'>
                  <div className='flex space-x-1 items-center text-gray-600 dark:text-gray-400 line-clamp-2 font-mono text-lg leading-relaxed transition-colors'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                     </svg>

                     <p> {project.date ? project.date : ""} {project.year} </p>
                  </div>
                  <div className="">
                     <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2  md:px-6 md:py-3 font-display text-sm text-black transition-all duration-200 bg-primary pixel-border-primary hover:translate-y-[-4px] active:translate-y-[0px]"
                     >
                        {project.isWeb == false ? "DOWNLOAD" : "START"}
                     </a>
                  </div>
               </div>

            </article>

            <div className='mt-8 space-y-8 md:space-y-2'>
               <div id='resume' className="prose md:py-4 dark:prose-invert max-w-none font-sans text-gray-600 dark:text-gray-300">
                  
                  <div className='bg-white/90 dark:bg-gray-900/90 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300 shadow-xl dark:shadow-none'>
                     <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
                        <h3 className='font-display text-lg md:text-xl text-primary' >Quest</h3>
                     </div>

                     <p className="text-base md:text-lg font-medium leading-relaxed font-body">
                        {project.description}
                        <span className="inline-block w-2 h-5 bg-primary ml-1 cursor-blink align-middle"></span>
                     </p>
                  </div>
               </div>

               <div id='skills-gears' className="prose md:py-4 dark:prose-invert max-w-none font-sans text-gray-600 dark:text-gray-300">
                  <div className='bg-white/90 dark:bg-gray-900/90 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300 shadow-xl dark:shadow-none'>
                     <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
                        <h3 className='font-display text-lg md:text-xl text-primary' >Skills & Gears</h3>
                     </div>

                     <div className="text-base md:text-lg font-medium leading-relaxed font-body">
                        <ul className="list-disc list-inside space-y-1">
                           {project.tags.map((tag, id) => (
                           <li key={tag+id} className='items-center'>
                              {tag}
                              {id == project.tags.length - 1 &&
                                 <span className="inline-block w-2 h-5 bg-primary ml-1 cursor-blink align-middle"></span>
                              }
                           </li>
                           ))}
                        </ul>                       
                     </div>
                  </div>                  
                  
               </div>

               <div id='achievements' className="prose md:py-4 dark:prose-invert max-w-none font-sans text-gray-600 dark:text-gray-300">
                  <div className='bg-white/90 dark:bg-gray-900/90 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300 shadow-xl dark:shadow-none'>
                     <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
                        <h3 className='font-display text-lg md:text-xl text-primary'>Achievements</h3>
                     </div>

                     <div className="text-base md:text-lg font-medium leading-relaxed font-body">
                        <ul className="list-disc list-inside space-y-1">
                           {project.features?.map((feature, id) => (
                           <li key={feature+id} className='items-center'>
                              {feature}
                              {id == project.features?.length - 1 &&
                                 <span className="inline-block w-2 h-5 bg-primary ml-1 cursor-blink align-middle"></span>
                              }
                           </li>
                           ))}
                        </ul>                       
                     </div>
                  </div>                  
                  
               </div>
            </div>
         </section>

         <section className="relative hidden md:block md:w-1/5">
            <div className="fixed top-32 right-6 lg:right-auto flex-col gap-2 ">
               <div className='flex flex-col bg-white/90 dark:bg-gray-900/90 border-4 border-gray-300 dark:border-gray-600 rounded p-6 relative pixel-border group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-300 shadow-xl dark:shadow-none'>
                  <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2">
                     <h3 className='font-display text-lg md:text-xl text-primary' >QUEST LOG</h3>
                  </div>

                  <nav className="flex flex-col gap-1 font-body text-sm uppercase">
                     <a className="text-gray-600 dark:text-gray-300 flex items-center gap-3 p-2 hover:border-b-2 hover:border-primary hover:glow-lg transition-shadow duration-200"
                        href="#resume">
                        <span className="text-primary material-symbols-outlined">article</span> Quest
                     </a>
                     <a className="text-gray-600 dark:text-gray-300 flex items-center gap-3 p-2 hover:border-b-2 hover:border-primary hover:glow-lg transition-shadow duration-200"
                        href="#skills-gears">
                        <span className="text-primary material-symbols-outlined">memory</span> Skills & Gears
                     </a>
                     <a className="text-gray-600 dark:text-gray-300 flex items-center gap-3 p-2 hover:border-b-2 hover:border-primary hover:glow-lg transition-shadow duration-200"
                        href="#achievements">
                        <span className="text-primary material-symbols-outlined">star</span> Achievements
                     </a>
                     {/* <a className="text-primary flex items-center gap-3 p-2 border-l-4 border-transparent hover:bg-[#0a0f0d] hover:glow-lg transition-shadow duration-200"
                        href="#solutions">
                        <span className="material-symbols-outlined">psychology</span> Solutions
                     </a> */}
                  </nav>
               </div>
            </div>
        </section>
      </div>
    </main>
  );
}