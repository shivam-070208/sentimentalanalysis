"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TeacherEvaluation() {
  const [TeacherId, setSelectedTeacher] = useState("");
  const [alert, setallert] = useState(null);
  const [Ratings, setRatings] = useState({
    communication: null,
    knowledge: null,
    Behaviour: null,
    availability: null,
  });
  const [Feedback, setFeedback] = useState("");
  const [teachers, setteacher] = useState([]);
  const [loading, setLoading] = useState(false); // new
  const timeoutRef = useRef(null); // using useRef to clear timeouts properly

  useEffect(() => {
    fetch("/api/fetch", { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        setteacher(data.data || []);
      })
      .catch((error) => setallert(`Error: ${error.message}`));
  }, []);

  const reset = () => {
    setSelectedTeacher("");
    setFeedback("");
    setRatings({
      communication: null,
      knowledge: null,
      Behaviour: null,
      availability: null,
    });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setallert(null), 2000);
  };

  const handleSubmit = async () => {
    if (!Ratings.Behaviour || !Ratings.availability || !Ratings.communication || !Ratings.knowledge) {
      setallert("Fill all required details");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setallert(null), 2000);
      return;
    }

    try {
      setLoading(true); // disable submit
      setallert("Submitting…");
      const res = await fetch("/api/Feedback", {
        method: "POST",
        body: JSON.stringify({ TeacherId, Ratings, Feedback }),
      });

      if (res.ok) {
        setallert("Submitted successfully ✅");
        reset();
      } else {
        const data = await res.json();
        setallert(data.message || "Error submitting feedback");
      }
    } catch (err) {
      setallert(`Error: ${err.message}`);
    } finally {
      setLoading(false); // enable submit again
    }
  };

  const StarRating = ({ value, onChange }) => (
    <div className="flex space-x-1 cursor-pointer">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          onClick={() => onChange(i + 1)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 mt-2 ${i < value ? "text-yellow-500" : "text-gray-300"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.429 8.215 1.196-5.941 5.789 1.403 8.173L12 18.896l-7.345 3.878 1.403-8.173-5.94-5.789 8.214-1.196z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="w-full md:p-4">
      <h3 className="text-2xl font-bold">Rate Your Teachers</h3>
      {alert && (
        <motion.div
          animate={{ y: -10, opacity: 1 }}
          className="fixed right-10 bottom-0 bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold"
        >
          {alert}
        </motion.div>
      )}

      <p className="text-sm text-neutral-400 mb-4">
        Your feedback is anonymous and will help improve teaching quality.
      </p>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-neutral-400">
        <h1 className="text-2xl font-semibold mb-2">Teacher Evaluation Form</h1>

        <label className="block mb-2 font-medium text-sm">Select Teacher</label>
        <select
          className="w-full border border-neutral-300 rounded-md p-2 mb-6 text-sm"
          value={TeacherId}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="" disabled hidden>
            Select a teacher
          </option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.Name} - {teacher.Department}
            </option>
          ))}
        </select>

        {TeacherId && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-sm">
              {["communication", "knowledge", "Behaviour", "availability"].map((field) => (
                <div key={field}>
                  <p className="font-medium capitalize">{field}</p>
                  <StarRating
                    value={Ratings[field]}
                    onChange={(v) => setRatings((prev) => ({ ...prev, [field]: v }))}
                  />
                </div>
              ))}
            </div>

            <label className="block mb-2 font-medium text-sm">Additional feedback (optional)</label>
            <textarea
              value={Feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-neutral-300 min-h-20 rounded-md p-2 text-sm"
              placeholder="Share your thoughts about the teacher's strengths and areas for improvement..."
            />

            <button
              disabled={loading}
              onClick={handleSubmit}
              className={`bg-blue-600 text-white mt-4 px-6 py-2 rounded-md hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting…" : "Submit Feedback"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
