"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Message has been deleted.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#14b8a6",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete message.",
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

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedIds.length} message(s).`,
      icon: "warning",
      background: "#1e293b",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete them!"
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/messages/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        setMessages(messages.filter(m => !selectedIds.includes(m.id)));
        setSelectedIds([]);
        Swal.fire({
          title: "Deleted!",
          text: "Messages have been deleted.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#14b8a6",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete messages.",
          icon: "error",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#f43f5e",
        });
      }
    } catch (error) {
      console.error("Bulk delete error:", error);
    }
  };

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === messages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(messages.map(m => m.id));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white">Messages Inbox</h2>
          <p className="text-slate-400 text-sm mt-1">Inquiries submitted from your contact form</p>
        </div>
        
        {messages.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSelectAll}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs rounded-md transition-colors"
            >
              {selectedIds.length === messages.length ? "Deselect All" : "Select All"}
            </button>
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-md transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-trash"></i> Bulk Delete ({selectedIds.length})
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 bg-white/5 border border-white/5 rounded-xl">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-white/5 border border-white/5 rounded-xl">
            Your inbox is empty.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white/5 border border-white/5 hover:border-white/10 rounded-xl p-4 md:p-6 transition-colors flex flex-col md:flex-row gap-4">
              
              {/* Checkbox */}
              <div className="flex items-center justify-between md:justify-start md:pt-4 shrink-0">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(msg.id)}
                  onChange={() => toggleSelection(msg.id)}
                  className="w-5 h-5 rounded border-white/10 bg-black/20 text-teal-500 focus:ring-teal-500/50 cursor-pointer"
                />
                <div className="md:hidden text-xs font-bold text-slate-500 bg-black/20 px-3 py-1 rounded-md">
                  {formatDate(msg.createdAt)}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 flex-1">
                
                {/* Content */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black text-lg shrink-0 mt-1">
                    {msg.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2 truncate">
                      {msg.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-slate-400 mt-1 mb-3 font-mono">
                      <span className="flex items-center gap-1 truncate"><i className="fa-solid fa-envelope"></i> {msg.email}</span>
                      {msg.subject && <span className="flex items-center gap-1 truncate"><i className="fa-solid fa-tag"></i> {msg.subject}</span>}
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed line-clamp-2 mb-3">
                      {msg.message}
                    </div>
                    <button
                      onClick={() => setSelectedMessage(msg)}
                      className="text-teal-400 text-xs font-bold hover:text-teal-300 transition-colors flex items-center gap-1"
                    >
                      View Details <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>

                {/* Actions (Desktop) */}
                <div className="hidden md:flex flex-col items-end justify-between shrink-0 gap-4 w-40">
                  <div className="text-xs font-bold text-slate-500 bg-black/20 px-3 py-1 rounded-md">
                    {formatDate(msg.createdAt)}
                  </div>
                  <button onClick={() => handleDelete(msg.id)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-md transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </div>
                
                {/* Actions (Mobile) */}
                <div className="md:hidden flex justify-end mt-2 pt-4 border-t border-white/5">
                  <button onClick={() => handleDelete(msg.id)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-md transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-[#0f0f11] border border-white/10 rounded-xl shadow-2xl max-w-2xl w-full relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-black text-white">Message Details</h3>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">From</div>
                  <div className="text-white font-bold flex items-center gap-2">
                    {selectedMessage.name}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Email</div>
                  <div className="text-teal-400 font-bold">
                    <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Subject</div>
                  <div className="text-white font-bold">{selectedMessage.subject || "No Subject"}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Received At</div>
                  <div className="text-slate-300 font-mono text-sm">{formatDate(selectedMessage.createdAt)}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-3">Message</div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-white/5 p-4 rounded-lg border border-white/5">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-black/20">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-md transition-colors"
              >
                Close
              </button>
              <a 
                href={`mailto:${selectedMessage.email}`}
                className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-md transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-reply"></i> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
