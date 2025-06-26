"use client"
import React, { useState } from 'react';

const SuggestionForm = () => {
  const [suggestionType, setSuggestionType] = useState('Curriculum');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with your backend logic
    console.log('Submitted:', { suggestionType, suggestion });
    setSuggestion(''); // Clear after submit
  };

  return (
    <div className="w-full mx-auto p-3 space-y-6">
       <div>
        <h1 className="text-2xl font-bold">Anonymous Suggestions</h1>
        <p className="text-neutral-400  text-sm">Share your ideas to improve the academic environment</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 space-y-5 rounded-xl mt-8 hover:shadow-lg shadow-[#1111118b] hover:scale-102 transition-all  border-neutral-400 border hover:border-0 w-full ">
         <div>
        <h1 className="text-2xl font-semibold">Submit a Suggestion</h1>
        <p className="text-neutral-400  text-sm">Your suggestions are completely anonymous and will be reviewed by faculty</p>
      </div>
        <div>
          <label htmlFor="type" className="block mb-2 font-medium text-gray-700">Suggestion Type</label>
          <select
            id="type"
            value={suggestionType}
            onChange={(e) => setSuggestionType(e.target.value)}
            className="w-full border-neutral-200 text-sm outline-none rounded-md shadow-xs border-2 p-2 ring-indigo-500 focus:border-0 focus:ring-2"
          >
            <option value="Curriculum">Curriculum</option>
            <option value="Facilities">Facilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="suggestion" className="block mb-2 font-medium text-gray-700">Your Suggestion</label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows={4}
            className="w-full border-gray-300 p-3 rounded-md shadow-sm outline-none   focus:border-indigo-600 border-2"
            placeholder="Share your idea in detail..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Submit Anonymously
        </button>
      </form>

      <div className="rounded-xl mt-8 hover:shadow-lg shadow-[#1111118b] hover:scale-102 transition-all  border-neutral-400 border hover:border-0 p-6 hover:p-7">
        <h2 className="text-lg font-semibold mb-2">Previous Suggestions</h2>
        <p className="text-gray-500">You haven't submitted any suggestions yet.</p>
      </div>
    </div>
  );
};

export default SuggestionForm;