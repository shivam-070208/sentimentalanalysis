"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  Bar,
  Cell,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
} from "recharts";
import { BarChart, LineChart, PieChart } from "lucide-react";
import Card from "../layout/Card";

export default function Dashboard() {
  const [monthlyFeedbackData, setMonthlyFeedbackData] = useState([]);
  const [ratingCategoriesData, setRatingCategoriesData] = useState([]);
  const [sectionWiseData, setSectionWiseData] = useState([]);
  const [recentSuggestions, setRecentSuggestions] = useState([]);
  const [cardStats, setCardStats] = useState({
    avgRating: 0,
    totalSuggestions: 0,
    sentiment: {
      positive: 0,
      neutral: 0,
      negative: 0,
    },
    totalFeedbacks: 0,
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A4DE6C"];

  useEffect(() => {
    fetch("/api/Feedback/fetch", { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        const feedbacks = data?.feedback || [];

        const monthlyCount = {};
        const sectionCount = {};
        const ratingSums = {
          Behaviour: 0,
          knowledge: 0,
          communication: 0,
          availability: 0,
        };
        const ratingCounts = {
          Behaviour: 0,
          knowledge: 0,
          communication: 0,
          availability: 0,
        };
        const suggestions = [];
        let totalRatingSum = 0;
        let totalRatingCount = 0;
        let sentimentCount = {
          positive: 0,
          neutral: 0,
          negative: 0,
        };

        feedbacks.forEach((fb) => {
          const month = new Date(fb.Date).toLocaleString("default", { month: "short" });
          monthlyCount[month] = (monthlyCount[month] || 0) + 1;

          const email = fb.Student;
          const section = email.split("@")[0].split(".").pop().toUpperCase();
          sectionCount[section] = (sectionCount[section] || 0) + 1;

          for (const key in fb.Ratings) {
            ratingSums[key] += fb.Ratings[key];
            ratingCounts[key]++;
            totalRatingSum += fb.Ratings[key];
            totalRatingCount++;
          }

          if (fb.Feedback) {
            suggestions.push({
              id: fb._id,
              text: fb.Feedback,
              sentiment: fb.Sentiment || "neutral",
              date: fb.Date,
            });

            sentimentCount[fb.Sentiment || "neutral"]++;
          }
        });

        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedMonthly = allMonths.map((m) => ({
          month: m,
          count: monthlyCount[m] || 0,
        }));

        const formattedRatings = Object.keys(ratingSums).map((key) => ({
          name: key,
          value: (ratingSums[key] / ratingCounts[key]).toFixed(1),
        }));

        const formattedSection = Object.keys(sectionCount).map((key) => ({
          name: key,
          value: sectionCount[key],
        }));

        const totalSentiments =
          sentimentCount.positive + sentimentCount.neutral + sentimentCount.negative;

        const sentimentPercent = {
          positive: ((sentimentCount.positive / totalSentiments) * 100 || 0).toFixed(0),
          neutral: ((sentimentCount.neutral / totalSentiments) * 100 || 0).toFixed(0),
          negative: ((sentimentCount.negative / totalSentiments) * 100 || 0).toFixed(0),
        };

        setMonthlyFeedbackData(formattedMonthly);
        setRatingCategoriesData(formattedRatings);
        setSectionWiseData(formattedSection);
        setRecentSuggestions(suggestions);
        setCardStats({
          avgRating: (totalRatingSum / totalRatingCount).toFixed(0),
          totalSuggestions: suggestions.length,
          sentiment: sentimentPercent,
          totalFeedbacks: feedbacks.length,
        });
      });
  }, []);

  const cardData = [
    {
      title: "Overall Rating",
      Icon: (<LineChart className="h-4 w-4 text-neutral-400" />),
      No: `${cardStats.avgRating??0}/5.0`,
      Comment: `Based on ${cardStats.totalFeedbacks} student feedbacks`,
    },
    {
      title: "Sentiment Analysis",
      Icon: (<PieChart className="h-4 w-4 text-neutral-400" />),
      No: `${cardStats.sentiment.positive}%`,
      Comment: (
        <>
          {cardStats.sentiment.neutral}% Neutral{" "}
          <span className="ml-2">{cardStats.sentiment.negative}% Needs Improvement</span>
        </>
      ),
    },
    {
      title: "Total Suggestions",
      Icon: (<BarChart className="h-4 w-4 text-neutral-400" />),
      No: cardStats.totalSuggestions,
      Comment: "11 new since last month",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="w-full flex justify-between flex-wrap">
        <span className="w-fit whitespace-nowrap text-2xl font-bold">Welcome Back, Proffesor!</span>
        <div className="flex gap-3 flex-wrap justify-center">
          <button className="hover:shadow-md shadow-neutral-600 hover:px-4 transition-all duration-400 rounded px-3 py-1 gap-2 flex bg-blue-600 hover:bg-blue-500 cursor-pointer text-white items-center">
            <BarChart className="w-5 h-5" />
            <span className="text-sm font-semibold">View Analytics</span>
          </button>
          <button className="hover:shadow-md shadow-neutral-600 hover:px-4 transition-all duration-400 rounded px-3 py-2 bg-white border border-neutral-300 text-sm cursor-pointer font-semibold hover:bg-green-500 hover:text-white">
            View All Feedback
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-7">
        {cardData.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="p-6 rounded-lg shadow bg-white">
          <h2 className="text-lg font-semibold mb-1">Feedback Over Time</h2>
          <p className="text-sm text-gray-500 mb-4">Monthly feedback submissions</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFeedbackData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow bg-white">
          <h2 className="text-lg font-semibold mb-1">Rating Categories</h2>
          <p className="text-sm text-gray-500 mb-4">Performance across different aspects</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={ratingCategoriesData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

  
    </div>
  );
}
