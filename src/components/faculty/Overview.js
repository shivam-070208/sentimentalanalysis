import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {
  const [semesterRatings, setSemesterRatings] = useState([]);
  const [monthlyVolume, setMonthlyVolume] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/Feedback/fetch", { method: "POST" });
      const { feedback } = await res.json();
      processFeedback(feedback);
    };
    fetchData();
  }, []);

  const processFeedback = (feedbackList) => {
    const semesterMap = {};
    const monthMap = new Array(12).fill(0);

    feedbackList.forEach((fb) => {
      const date = new Date(fb.Date);
      const sem = date.getMonth() < 6 ? `Spring ${date.getFullYear()}` : `Fall ${date.getFullYear()}`;
      semesterMap[sem] = semesterMap[sem] || { total: 0, sum: 0 };
      const avg = average(Object.values(fb.Ratings));
      semesterMap[sem].total++;
      semesterMap[sem].sum += avg;

      monthMap[date.getMonth()]++;
    });

    setSemesterRatings(
      Object.entries(semesterMap).map(([s, v]) => ({
        semester: s,
        rating: (v.sum / v.total).toFixed(2),
      }))
    );

    setMonthlyVolume(
      monthMap.map((v, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        count: v,
      }))
    );
  };

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <div className="space-y-6 w-full h-fit">
      <div>
        <h3 className="text-lg font-semibold mb-2">Semester-wise Rating Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={semesterRatings}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Line dataKey="rating" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Feedback Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyVolume}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="count" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
