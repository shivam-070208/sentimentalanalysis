"use client";
import React, { useState } from "react";

const DescriptionForm = () => {
  const [Type, setType] = useState("Curriculum");
  const [Description, setDescription] = useState("");
  const [alert, setAlert] = useState(null); // feedback
  const [loading, setLoading] = useState(false); // submission state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Description.trim()) {
      setAlert("Please enter a description before submitting.");
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("/api/Suggestion", {
        method: "POST",
        body: JSON.stringify({ Type, Description }),
      });

      if (res.ok) {
        setAlert("Your description was submitted successfully.");
        setDescription("");
        setType("Curriculum");
      } else {
        const data = await res.json();
        setAlert(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setAlert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-3 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Anonymous Descriptions</h1>
        <p className="text-neutral-400 text-sm">
          Share your ideas to improve the academic environment
        </p>
      </div>

      {alert && (
        <div
          className={`rounded p-2 text-white ${
            alert.includes("Error") || alert.includes("went wrong")
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >
          {alert}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 space-y-5 rounded-xl mt-8 hover:shadow-lg border-neutral-400 border hover:border-0 w-full transition-all"
      >
        <div>
          <h1 className="text-2xl font-semibold">Submit a Description</h1>
          <p className="text-neutral-400 text-sm">
            Your descriptions are completely anonymous and will be reviewed by faculty.
          </p>
        </div>
        <div>
          <label htmlFor="type" className="block mb-2 font-medium text-gray-700">
            Description Type
          </label>
          <select
            id="type"
            value={Type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border-neutral-200 text-sm outline-none rounded-md shadow-xs border-2 p-2 ring-indigo-500 focus:border-0 focus:ring-2"
          >
            <option value="Curriculum">Curriculum</option>
            <option value="Facilities">Facilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="Description" className="block mb-2 font-medium text-gray-700">
            Your Description
          </label>
          <textarea
            id="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border-gray-300 p-3 rounded-md shadow-sm outline-none focus:border-indigo-600 border-2"
            placeholder="Share your idea in detail..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Submit Anonymously"}
        </button>
      </form>

      <div className="rounded-xl mt-8 hover:shadow-lg border-neutral-400 border p-6">
        <h2 className="text-lg font-semibold mb-2">Previous Descriptions</h2>
        <p className="text-gray-500">You haven't submitted any descriptions yet.</p>
      </div>
    </div>
  );
};

export default DescriptionForm;
