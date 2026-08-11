"use client";
import React, { useEffect, useState } from "react";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white">Messages Inbox</h2>
          <p className="text-slate-400 text-sm mt-1">Inquiries submitted from your contact form</p>
        </div>
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
            <div key={msg.id} className="bg-white/5 border border-white/5 hover:border-white/10 rounded-xl p-6 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-black text-lg shrink-0">
                    {msg.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {msg.userName}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 mb-4 font-mono">
                      <span className="flex items-center gap-1"><i className="fa-solid fa-envelope"></i> {msg.userEmail}</span>
                      {msg.userPhone && <span className="flex items-center gap-1"><i className="fa-solid fa-phone"></i> {msg.userPhone}</span>}
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {msg.userDescription}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between shrink-0 gap-4 md:gap-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="text-xs font-bold text-slate-500 bg-black/20 px-3 py-1 rounded-md mb-0 md:mb-4">
                    {formatDate(msg.createdAt)}
                  </div>
                  <button onClick={() => handleDelete(msg.id)} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs rounded-md transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
