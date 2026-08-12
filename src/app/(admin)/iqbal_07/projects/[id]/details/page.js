import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getIconClass } from '@/lib/iconUtils';

export default async function AdminProjectDetails({ params }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    return notFound();
  }

  return (
    <div className="font-sans text-slate-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Actions */}
        <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
          <Link 
            href="/iqbal_07/projects"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-300 hover:text-white border border-white/10 rounded-full hover:bg-white/5 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i> BACK TO PROJECTS
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-red-400 hover:text-red-300 border border-red-500/20 hover:bg-red-500/10 rounded-full transition-colors">
              <i className="fa-regular fa-trash-can"></i> DELETE
            </button>
            <Link 
              href={`/iqbal_07/projects/${id}`}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 rounded-full transition-colors shadow-lg shadow-teal-500/25"
            >
              <i className="fa-solid fa-pen"></i> EDIT PROJECT
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/20">
                Category: <span className="text-teal-300">{project.category}</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/20 flex items-center gap-1.5">
                <i className="fa-regular fa-calendar"></i> YEAR: <span className="text-teal-300">{project.year}</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/20 flex items-center gap-1.5">
                <i className="fa-regular fa-clock"></i> DURATION: <span className="text-teal-300">{project.duration}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
              {project.title}
            </h1>

            <p className="text-slate-400 leading-relaxed text-lg">
              {project.shortDescription}
            </p>
          </div>

          {project.mainImageUrl && (
            <div className="w-full md:w-[45%] aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image src={project.mainImageUrl} alt={project.title} fill className="object-cover" />
            </div>
          )}
        </div>

        {/* Problem Section */}
        {(project.problemTitle || project.problemDescription) && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                {project.problemTitle}
              </h2>
            </div>
            {project.problemDescription && (
              <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
                <p className="text-slate-300 leading-loose text-base">
                  {project.problemDescription}
                </p>
              </div>
            )}
            {project.problemPoints && project.problemPoints.length > 0 && (
              <ul className="mt-6 space-y-3 list-disc list-inside text-slate-300">
                {project.problemPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Solution Section */}
        {(project.solutionTitle || project.solutionDescription) && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
                <i className="fa-regular fa-lightbulb"></i>
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                {project.solutionTitle}
              </h2>
            </div>
            {project.solutionDescription && (
              <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-slate-300 leading-loose text-base">
                  {project.solutionDescription}
                </p>
              </div>
            )}
            {project.solutionPoints && project.solutionPoints.length > 0 && (
              <ul className="mt-6 space-y-3 list-disc list-inside text-slate-300">
                {project.solutionPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Technology Stack */}
        {project.techs && project.techs.length > 0 && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl">
                <i className="fa-solid fa-code"></i>
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                Technology Stack
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.techs.map((tech, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-800/40 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 shadow-inner">
                    <i className={getIconClass(tech.icon)}></i>
                  </div>
                  <span className="font-bold text-slate-300 text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                Key Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.features.map((feat, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-800/40 border border-white/10 hover:border-white/20 transition-colors space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-teal-400 shadow-inner text-lg">
                    <i className={getIconClass(feat.icon)}></i>
                  </div>
                  <h3 className="font-black text-white text-lg" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                    {feat.title || feat.heading}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results & Impact */}
        {project.results && project.results.length > 0 && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl">
                <i className="fa-solid fa-arrow-trend-up"></i>
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                Results & Impact
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {project.results.map((res, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-800/40 border border-white/10 hover:border-white/20 transition-colors flex flex-col items-center justify-center text-center space-y-2">
                  <div className="text-5xl font-black text-teal-400 mb-2" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                    {res.stats}
                  </div>
                  {res.heading && <div className="font-bold text-slate-300">{res.heading}</div>}
                  {res.description && <div className="text-xs text-slate-500 uppercase tracking-wider">{res.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl">
                <i className="fa-regular fa-image"></i>
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-merriweather), serif' }}>
                Project Gallery
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, i) => (
                <div key={i} className="space-y-3">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image src={img.url} alt={img.caption || "Gallery image"} fill className="object-cover" />
                  </div>
                  {img.caption && (
                    <p className="text-center text-sm font-bold text-slate-400">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
