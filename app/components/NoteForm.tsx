

'use client';


import React, { useState} from 'react';
// import {uploadToIPFS}

const NoteFormUI = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        // just logging values - no backend / storage here 

        const note = {
            title,
            content,
            createdAt: new Date().toISOString()
        }

        const blob = new Blob([JSON.stringify(note, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${title || 'note'}.json`;
        a.click();

        URL.revokeObjectURL(url);

        console.log({title,content});
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Create a Note</h2>
    
          <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
    
          <label className="block mb-2 text-sm font-medium text-gray-700">Content</label>
          <textarea
            className="w-full p-2 border rounded h-40 mb-4"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
    
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Note
          </button>
        </form>
      );
    };

    
    export default NoteFormUI; 
