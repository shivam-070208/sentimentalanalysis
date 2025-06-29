
"use client";
import React, { useEffect, useState } from "react";

const Suggestion = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState("");

  const getSuggestions = async () => {
    try {
      const res = await fetch("/api/Suggestion/fetch",{
        method:'post'
      });
      const data = await res.json();
      console.log(data)
      setSuggestions(data.suggestion);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  };
  useEffect(() => {
    getSuggestions();
  }, []);

  const filteredSuggestions = suggestions.filter(s =>
    s.Type.toLowerCase().includes(filter.toLowerCase()) ||
    s.Description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Student Suggestions</h1>
      <p className="text-gray-500">View suggestions submitted by students</p>

      {/* Search filter */}
      <input
        type="text"
        placeholder="Search suggestions..."
        className="w-full border px-4 py-2 rounded-md"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Suggestion cards */}
      {filteredSuggestions.length > 0 ? (
        <div className="space-y-4">
          {filteredSuggestions.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg shadow-md bg-white border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-indigo-700">{s.Type}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(s.Date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{s.Description}</p>
              <p className="mt-1 text-sm text-gray-400">Submitted by: {s.Student}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No suggestions found.</p>
      )}
    </div>
  );
};

export default Suggestion;
