"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function TeacherEvaluation() {
  const [TeacherId, setSelectedTeacher] = useState("");
  const [alert, setAlert] = useState(null);
  const [Ratings, setRatings] = useState({
    communication: null,
    knowledge: null,
    Behaviour: null,
    availability: null,
  });
  const [Feedback, setFeedback] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch("/api/fetch", { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        setTeachers(data.data || []);
      })
      .catch((error) => showAlert(`Error: ${error.message}`));
  }, []);

  const showAlert = (message) => {
    setAlert(message);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAlert(null), 3000);
  };

  const resetForm = () => {
    setSelectedTeacher("");
    setFeedback("");
    setRatings({
      communication: null,
      knowledge: null,
      Behaviour: null,
      availability: null,
    });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAlert(null), 2000);
  };

  const handleSubmit = async () => {
    const { communication, knowledge, Behaviour, availability } = Ratings;
    if (!communication || !knowledge || !Behaviour || !availability) {
      showAlert("Fill all required details");
      return;
    }

    try {
      setLoading(true);
      showAlert("Submitting…");

      const res = await fetch("/api/Feedback", {
        method: "POST",
        body: JSON.stringify({ TeacherId, Ratings, Feedback }),
      });

      const teacher = teachers.find((t) => t._id === TeacherId);

      if (res.ok) {
        setRecent((prev) => [
          ...prev,
          {
            date: new Date().toLocaleString(),
            teacherName: teacher?.Name,
            course: teacher?.Department,
          },
        ]);
        showAlert("Submitted successfully ✅");
        resetForm();
      } else {
        const data = await res.json();
        showAlert(data.message || "Error submitting feedback");
      }
    } catch (err) {
      showAlert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ value, onChange }) => (
    <div className="flex space-x-1 cursor-pointer">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          onClick={() => onChange(i + 1)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 mt-1 ${i < value ? "text-yellow-500" : "text-gray-300"}`}
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed right-10 bottom-4 bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold z-50"
        >
          {alert}
        </motion.div>
      )}

      <p className="text-sm text-neutral-400 mb-4">
        Your feedback is anonymous and will help improve teaching quality.
      </p>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-neutral-300">
        <h1 className="text-xl font-semibold mb-4">Teacher Evaluation Form</h1>

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
              className="w-full border border-neutral-300 min-h-24 rounded-md p-2 text-sm"
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

        {/* Recent Feedback Activity */}
        {recent.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold mb-2 text-sm text-neutral-700">Recent Feedback Activity</h2>
            <ul className="text-sm space-y-1">
              {recent.map((item, index) => (
                <li key={index}>
                  📅 <span className="font-medium">{item.date}</span> — 👨‍🏫{" "}
                  <span className="font-semibold">{item.teacherName}</span> ({item.course})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
