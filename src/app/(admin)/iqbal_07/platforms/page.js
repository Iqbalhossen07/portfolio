"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ManagePlatforms() {
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Form state
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const res = await fetch("/api/platforms");
      const data = await res.json();
      setPlatforms(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || (!image && !editingId)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Company name and logo are required!",
        background: "#0f172a",
        color: "#fff"
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    if (link) formData.append("link", link);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(editingId ? `/api/platforms/${editingId}` : "/api/platforms", {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: editingId ? "Updated!" : "Added!",
          text: `Company ${editingId ? "updated" : "added"} successfully.`,
          confirmButtonColor: "#14b8a6",
          background: "#0f172a",
          color: "#fff"
        });
        closeModal();
        fetchPlatforms();
      } else {
        throw new Error("Failed to save company");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong.",
        confirmButtonColor: "#14b8a6",
        background: "#0f172a",
        color: "#fff"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#14b8a6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      background: '#0f172a',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/platforms/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Company has been deleted.',
            icon: 'success',
            background: '#0f172a',
            color: '#fff',
            confirmButtonColor: '#14b8a6'
          });
          fetchPlatforms();
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete company.',
          icon: 'error',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#14b8a6'
        });
      }
    }
  };

  const openEditModal = (platform) => {
    setEditingId(platform.id);
    setName(platform.name);
    setLink(platform.link || "");
    setPreviewUrl(platform.imageUrl);
    setImage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setName("");
    setLink("");
    setImage(null);
    setPreviewUrl("");
  };

  if (isLoading) return <div className="text-white p-8">Loading platforms...</div>;

  return (
    <div className="max-w-7xl mx-auto pb-24 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-sm">
            Manage <span className="text-teal-400">Companies Image</span>
          </h2>
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">Portfolio Assets</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm rounded-md transition-colors shadow-lg flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add New Company Image
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {platforms.map((p) => (
          <div key={p.id} className="bg-slate-900/40 border border-white/10 rounded-md flex flex-col items-center justify-center relative group hover:border-white/20 transition-all duration-300 h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedImage(p.imageUrl)}>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none flex items-center justify-center">
              <i className="fa-solid fa-expand text-white text-3xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"></i>
            </div>
            <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-20">
              <button 
                onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors border border-blue-500/20 shadow-lg"
              >
                <i className="fa-solid fa-pen text-[10px]"></i>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                className="w-7 h-7 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors border border-red-500/20 shadow-lg"
              >
                <i className="fa-solid fa-trash text-[10px]"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <div className="p-6 md:p-8 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white">{editingId ? "Edit Company" : "Add New Company"}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full bg-[#1e293b] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors font-semibold placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Link (Optional)</label>
                  <input 
                    type="url" 
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-[#1e293b] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors font-semibold placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Upload Logo {editingId && "(Leave empty to keep current)"}</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center relative hover:border-teal-400/50 transition-colors bg-[#1e293b]/50">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="h-16 object-contain" />
                    ) : (
                      <div className="text-center">
                        <i className="fa-solid fa-cloud-arrow-up text-3xl text-teal-500 mb-2"></i>
                        <div className="text-sm font-bold text-teal-500">Click to upload</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                  <button type="button" onClick={closeModal} className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-full flex items-center justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors text-4xl font-black focus:outline-none"
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged Platform" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
