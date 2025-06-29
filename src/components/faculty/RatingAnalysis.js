import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RatingAnalysis = () => {
  const [categoryAverages, setCategoryAverages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/Feedback/fetch", { method: "POST" });
      const { feedback } = await res.json();
      processFeedback(feedback);
    };
    fetchData();
  }, []);

  const processFeedback = (feedbackList) => {
    const sums = {
      availability: 0,
      knowledge: 0,
      communication: 0,
      Behaviour: 0,
    };
    let total = 0;

    feedbackList.forEach((fb) => {
      for (let key in sums) sums[key] += fb.Ratings[key];
      total++;
    });

    const avg = Object.entries(sums).map(([key, val]) => ({
      category: key[0].toUpperCase() + key.slice(1),
      rating: parseFloat((val / total).toFixed(2)),
    }));

    setCategoryAverages(avg);
  };

  return (
    <div className="w-full -translate-x-3.5  md:translate-x-0 md:px-8">
      <h3 className="text-lg font-semibold ">Category-wise Average Ratings</h3>

      <div className="w-full min-h-[300px] h-[40vh]"> {/* ⬅ Responsive height */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryAverages}
            layout="vertical"
          
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 5]} />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 14 }}
              width={120}
            />
            <Tooltip />
            <Bar dataKey="rating" fill="#6366f1" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingAnalysis;
