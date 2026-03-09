import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Edit2, Save, LogOut, Lock } from 'lucide-react';
import { Project } from '../types';

export default function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/check-auth', { credentials: 'include' });
      const data = await res.json();
      setIsAdmin(data.isAdmin);
      if (data.isAdmin) fetchProjects();
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects', { credentials: 'include' });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Fetch projects failed:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include'
      });
      if (res.ok) {
        setIsAdmin(true);
        fetchProjects();
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      setIsAdmin(false);
      onClose();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      // Reset after 3 seconds if not confirmed
      setTimeout(() => setDeleteConfirmId(prev => prev === id ? null : prev), 3000);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { 
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (res.ok) {
        setDeleteConfirmId(null);
        fetchProjects();
        window.dispatchEvent(new CustomEvent('portfolio-refresh'));
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || 'Failed to delete'}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
        credentials: 'include'
      });

      if (res.ok) {
        setEditingId(null);
        setEditForm({});
        fetchProjects();
        window.dispatchEvent(new CustomEvent('portfolio-refresh'));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save project');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Network error while saving');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditForm(p);
  };

  const startAdd = () => {
    setEditingId(0);
    setEditForm({ title: '', category: 'Branding', image: '', description: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b flex justify-between items-center bg-zinc-50">
              <h2 className="text-2xl font-display font-black tracking-tight flex items-center gap-3">
                {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
                {!isAdmin && <Lock className="w-5 h-5 text-zinc-400" />}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {!isAdmin ? (
                <form onSubmit={handleLogin} className="max-w-sm mx-auto py-12 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Admin Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-zinc-100 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-brand-primary transition-all"
                      placeholder="••••••••"
                      autoFocus
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-brand-primary transition-all"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={startAdd}
                      className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-bold text-sm hover:scale-105 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add New Project
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors text-sm font-bold">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {editingId !== null && (
                      <div className="p-8 bg-zinc-50 rounded-3xl border-2 border-brand-primary space-y-6">
                        <h3 className="font-display font-black text-xl">{editingId === 0 ? 'Add Project' : 'Edit Project'}</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <input
                            placeholder="Title"
                            value={editForm.title}
                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                            className="px-4 py-3 rounded-xl border"
                          />
                          <select
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                            className="px-4 py-3 rounded-xl border"
                          >
                            {['Branding', 'UI/UX', 'Illustration', 'Graphic Design'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <input
                            placeholder="Image URL"
                            value={editForm.image}
                            onChange={e => setEditForm({...editForm, image: e.target.value})}
                            className="px-4 py-3 rounded-xl border md:col-span-2"
                          />
                          <textarea
                            placeholder="Description"
                            value={editForm.description}
                            onChange={e => setEditForm({...editForm, description: e.target.value})}
                            className="px-4 py-3 rounded-xl border md:col-span-2"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Project'}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-8 py-3 bg-zinc-200 rounded-xl font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {projects.map((p) => (
                      <div key={p.id} className="flex items-center gap-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 group">
                    <div className="w-20 h-20 rounded-xl bg-zinc-200 overflow-hidden flex-shrink-0">
                      {p.image ? (
                        <img src={p.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400 font-bold">NO IMG</div>
                      )}
                    </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-zinc-900">{p.title}</h4>
                          <p className="text-sm text-zinc-500">{p.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => startEdit(p)} 
                            className="p-3 hover:bg-white rounded-xl text-zinc-400 hover:text-brand-primary transition-all"
                            title="Edit Project"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id)} 
                            className={`p-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${
                              deleteConfirmId === p.id 
                                ? 'bg-red-500 text-white animate-pulse px-4' 
                                : 'hover:bg-white text-zinc-400 hover:text-red-500'
                            }`}
                            title={deleteConfirmId === p.id ? "Click again to confirm" : "Delete Project"}
                          >
                            {deleteConfirmId === p.id ? 'CONFIRM?' : <Trash2 className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
