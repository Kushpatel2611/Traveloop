import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit3, Trash2, Calendar, MapPin, ChevronLeft, ChevronRight, Save, X } from 'lucide-react';

const initialNotes = [
  { id: 1, trip: 'Paris Trip', day: 'Day 1', date: 'Jun 12, 2025', title: 'Arrival Day Thoughts', content: 'Finally landed at CDG after a long flight. The hotel in Le Marais is gorgeous — tiny streets, charming cafés. Grabbed a crêpe right outside. Paris already feels magical, even tired and jet-lagged.' },
  { id: 2, trip: 'Paris Trip', day: 'Day 2', date: 'Jun 13, 2025', title: 'Eiffel & Seine', content: 'Woke up early and beat the crowds to the Eiffel Tower summit. Worth every penny. The Seine cruise was incredibly relaxing. Note to self: book dinner reservations earlier next time — Le Jules Verne was fully booked.' },
  { id: 3, trip: 'Kyoto (Past)', day: 'Day 4', date: 'Mar 13, 2025', title: 'Arashiyama Bamboo', content: 'The bamboo grove was everything I imagined and more. Go before 7 AM to avoid crowds. Took the train back and had the most delicious matcha ice cream near the station.' },
];

export default function TripNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [editing, setEditing] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [creating, setCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const startEdit = () => { setDraftContent(selectedNote.content); setEditing(true); };
  const saveEdit = () => { setNotes(p => p.map(n => n.id === selectedNote.id ? { ...n, content: draftContent } : n)); setSelectedNote(p => ({ ...p, content: draftContent })); setEditing(false); };
  const deleteNote = (id) => { setNotes(p => p.filter(n => n.id !== id)); setSelectedNote(notes.find(n => n.id !== id) || null); };
  const createNote = () => {
    if (!newNote.title.trim()) return;
    const n = { id: Date.now(), trip: 'Paris Trip', day: 'New', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), title: newNote.title, content: newNote.content };
    setNotes(p => [n, ...p]); setSelectedNote(n); setCreating(false); setNewNote({ title: '', content: '' });
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl">
        <h1 className="text-2xl font-extrabold flex items-center gap-2"><BookOpen size={24} className="text-primary" /> Travel Journal</h1>
        <button onClick={() => setCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform text-sm">
          <Plus size={16} /> New Note
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 border-r border-white/10 bg-slate-950/30 flex flex-col overflow-y-auto">
          <div className="p-4 space-y-2">
            {notes.map(note => (
              <button key={note.id} onClick={() => { setSelectedNote(note); setEditing(false); }}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedNote?.id === note.id ? 'bg-primary/10 border-primary/30 text-white' : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-primary">{note.day} · {note.trip}</span>
                </div>
                <p className="font-semibold text-sm truncate">{note.title}</p>
                <p className="text-xs mt-1 text-slate-500 flex items-center gap-1"><Calendar size={10} /> {note.date}</p>
                <p className="text-xs mt-2 text-slate-600 line-clamp-2">{note.content}</p>
              </button>
            ))}
          </div>
        </aside>

        {/* Note Detail / Editor */}
        <main className="flex-1 flex flex-col overflow-auto p-6 sm:p-10 max-w-3xl">
          <AnimatePresence mode="wait">
            {creating ? (
              <motion.div key="create" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">New Journal Entry</h2>
                  <button onClick={() => setCreating(false)} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
                </div>
                <input value={newNote.title} onChange={e => setNewNote(p => ({ ...p, title: e.target.value }))} placeholder="Note title..."
                  className="w-full text-2xl font-bold bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-primary placeholder-slate-700 transition-colors" />
                <textarea value={newNote.content} onChange={e => setNewNote(p => ({ ...p, content: e.target.value }))} placeholder="Write about your day, your feelings, discoveries..."
                  rows={12} className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-5 text-slate-300 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-base" />
                <div className="flex gap-3">
                  <button onClick={createNote} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-transform"><Save size={16} /> Save Note</button>
                  <button onClick={() => setCreating(false)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">Cancel</button>
                </div>
              </motion.div>
            ) : selectedNote ? (
              <motion.div key={selectedNote.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                {/* Note Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <MapPin size={13} className="text-primary" /><span>{selectedNote.trip}</span>
                      <span>·</span>
                      <Calendar size={13} /><span>{selectedNote.date}</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-semibold">{selectedNote.day}</span>
                    </div>
                    {editing
                      ? <input value={selectedNote.title} readOnly className="text-3xl sm:text-4xl font-extrabold bg-transparent focus:outline-none leading-tight" />
                      : <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{selectedNote.title}</h2>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {editing
                      ? <button onClick={saveEdit} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl hover:scale-105 transition-transform"><Save size={14} /> Save</button>
                      : <button onClick={startEdit} className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"><Edit3 size={16} /></button>}
                    <button onClick={() => deleteNote(selectedNote.id)} className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />

                {/* Note Content */}
                {editing
                  ? <textarea value={draftContent} onChange={e => setDraftContent(e.target.value)} rows={16}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-5 text-slate-200 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                  : <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-light">{selectedNote.content}</div>}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"><ChevronLeft size={16} /> Previous Entry</button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">Next Entry <ChevronRight size={16} /></button>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-600">
                <div className="text-center"><BookOpen size={48} className="mx-auto mb-4 opacity-40" /><p>Select a note to read</p></div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
