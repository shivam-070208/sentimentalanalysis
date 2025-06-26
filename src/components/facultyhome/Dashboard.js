"use client";

import {
  LineChart as RechartsLineChart, PieChart as RechartsPieChart, BarChart as RechartsBarChart,
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Pie, Bar, Cell, AreaChart, Area
} from "recharts";

export default function Dashboard() {
    const monthlyFeedbackData = [
    { month: "Jan", count: 15 },
    { month: "Feb", count: 20 },
    { month: "Mar", count: 25 },
    { month: "Apr", count: 30 },
    { month: "May", count: 22 },
    { month: "Jun", count: 18 },
    { month: "Jul", count: 25 },
    { month: "Aug", count: 30 },
    { month: "Sep", count: 40 },
    { month: "Oct", count: 35 },
    { month: "Nov", count: 28 },
    { month: "Dec", count: 20 },
  ];

  const ratingCategoriesData = [
    { name: "Teaching Quality", value: 4.2 },
    { name: "Knowledge", value: 4.5 },
    { name: "Communication", value: 3.8 },
    { name: "Availability", value: 4.0 },
  ];

  const sectionWiseData = [
    { name: "EA", value: 25 },
    { name: "EB", value: 30 },
    { name: "EC", value: 20 },
    { name: "FA", value: 15 },
    { name: "FB", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A4DE6C"];

  // Sentiment data
  const sentimentData = {
    positive: 65,
    neutral: 25,
    negative: 10,
  };

  // Recent suggestions
  const recentSuggestions = [
    { 
      id: 1, 
      text: "The Data Structures course should include more practical assignments",
      sentiment: "positive",
      date: "2025-04-15"
    },
    { 
      id: 2, 
      text: "Need more interactive teaching methods in Operating Systems class",
      sentiment: "neutral",
      date: "2025-04-12"
    },
    { 
      id: 3, 
      text: "Lab sessions are too short to complete the assignments",
      sentiment: "negative",
      date: "2025-04-10"
    },
  ];

  return (
    <div className="space-y-8 p-6">

    

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
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
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

      {/* Pie & Suggestions */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="p-6 rounded-lg shadow bg-white">
          <h2 className="text-lg font-semibold mb-1">Section Distribution</h2>
          <p className="text-sm text-gray-500 mb-4">Feedback by student section</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={sectionWiseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sectionWiseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 p-6 rounded-lg shadow bg-white">
          <h2 className="text-lg font-semibold mb-1">Recent Suggestions</h2>
          <p className="text-sm text-gray-500 mb-4">Latest anonymous feedback from students</p>
          <div className="space-y-4">
            {recentSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="pb-4 border-b border-gray-100 last:border-0">
                <p className="font-medium">{suggestion.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">{new Date(suggestion.date).toLocaleDateString()}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.sentiment === "positive"
                      ? "bg-green-100 text-green-800"
                      : suggestion.sentiment === "neutral"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {suggestion.sentiment === "positive" ? "Positive"
                      : suggestion.sentiment === "neutral" ? "Neutral"
                      : "Needs Attention"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
