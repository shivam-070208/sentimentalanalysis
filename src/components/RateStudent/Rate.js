"use client"
import { useState } from "react";

export default function TeacherEvaluation() {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [ratings, setRatings] = useState({
    teachingQuality: 0,
    subjectKnowledge: 0,
    communicationSkills: 0,
    availabilitySupport: 0,
  });

  const teachers = [
    "Dr. Robert Williams - Operating Systems",
    "Dr. Sarah Smith - Databases",
    "Mr. Alan Turing - Algorithms",
  ];
  const handleSubmit=()=>{

  }

  const StarRating = ({ value, onChange }) => (
    <div className="flex space-x-1 cursor-pointer">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          onClick={() => onChange(i + 1)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 mt-2 ${
            i < value ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.429 8.215 1.196-5.941 5.789 1.403 8.173L12 18.896l-7.345 3.878 1.403-8.173-5.94-5.789 8.214-1.196z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="w-full md:p-4 ">
        <h3 className="text-2xl font-bold">Rate Your Teachers</h3>
        <p className="text-sm text-neutral-400">Your feedback helps improve teaching quality and is completely anonymous</p>
    <div className="bg-white p-6 rounded-xl mt-8 hover:shadow-lg shadow-[#1111118b] hover:scale-102 transition-all  border-neutral-400 border hover:border-0 w-full">
      <h1 className="text-2xl font-semibold mb-2">Teacher Evaluation Form</h1>
      <p className="text-gray-600 text-sm mb-4">
        Rate your teachers across different aspects of their teaching
      </p>

   
      <label className="block mb-2 font-medium text-sm">Select Teacher</label>
      <select
        className="w-full border cursor-pointer  border-neutral-300 focus:outline-2 outline-blue-600 rounded-md p-2 mb-6 text-sm"
        value={selectedTeacher}
        onChange={(e) => setSelectedTeacher(e.target.value)}
      >
        <option value="" hidden disabled>Select a teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher}   value={teacher}>{teacher}</option>
        ))}
      </select>


      {selectedTeacher !=="" &&
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-sm">
        <div>
          <p className="font-medium">Teaching Quality</p>
          <StarRating
            value={ratings.teachingQuality}
            onChange={(v) => setRatings((prev) => ({ ...prev, teachingQuality: v }))}
          />
        </div>
        <div>
          <p className="font-medium">Subject Knowledge</p>
          <StarRating
            value={ratings.subjectKnowledge}
            onChange={(v) => setRatings((prev) => ({ ...prev, subjectKnowledge: v }))}
          />
        </div>
        <div>
          <p className="font-medium">Communication Skills</p>
          <StarRating
            value={ratings.communicationSkills}
            onChange={(v) => setRatings((prev) => ({ ...prev, communicationSkills: v }))}
          />
        </div>
        <div>
          <p className="font-medium">Availability & Support</p>
          <StarRating
            value={ratings.availabilitySupport}
            onChange={(v) => setRatings((prev) => ({ ...prev, availabilitySupport: v }))}
          />
        </div>
      </div>

    <label className="block mb-2 font-medium text-sm">Additional feedback (optional)</label>
      <textarea
        className="w-full border border-neutral-300 focus:outline-2 min-h-20 outline-blue-600 rounded-md p-2 mt-2"
        placeholder="Share your thoughts about the teacher's strengths and areas for improvement..."
        rows={4}
      />

      <button className="bg-blue-600 text-white mt-4 px-6 py-2 rounded-md hover:bg-blue-700">
        Submit Feedback
      </button>
      </div>}
    </div>
    </div>
  );
}
