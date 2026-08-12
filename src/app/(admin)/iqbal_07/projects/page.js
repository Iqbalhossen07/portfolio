"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this project deletion!",
      icon: "warning",
      background: "#1e293b",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Project has been deleted.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#14b8a6",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete project.",
          icon: "error",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#f43f5e",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white">Projects</h2>
          <p className="text-slate-400 text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/iqbal_07/projects/new" className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold text-sm rounded-md transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> Add Project
        </Link>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-white/5 text-slate-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-bold">Image</th>
                <th className="px-6 py-4 font-bold">Project Info</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">Loading projects...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No projects found. Create one!</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 relative rounded-md overflow-hidden bg-black/50 border border-white/10">
                        {project.mainImageUrl ? (
                          <Image src={project.mainImageUrl} alt={project.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No Img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white mb-1">{project.title}</div>
                      <div className="text-xs text-slate-500 max-w-xs truncate">{project.shortDescription}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-bold">{project.category}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/iqbal_07/projects/${project.id}/details`} className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="View Details">
                          <i className="fa-solid fa-eye text-xs"></i>
                        </Link>
                        <Link href={`/iqbal_07/projects/${project.id}`} className="w-8 h-8 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-colors" title="Edit">
                          <i className="fa-solid fa-pen text-xs"></i>
                        </Link>
                        <button onClick={() => handleDelete(project.id)} className="w-8 h-8 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors" title="Delete">
                          <i className="fa-solid fa-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
