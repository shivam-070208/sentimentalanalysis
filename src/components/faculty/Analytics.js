"use client";
import React, { useState } from "react";
import Overview from "./Overview";
import RatingAnalysis from "./RatingAnalysis";
import SentimentAnalysis from "./SentimentAnalysis";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    { name: "Overview", key: "Overview" },
    { name: "Rating Analysis", key: "RatingAnalysis" },
    { name: "Sentiment Analysis", key: "SentimentAnalysis" },
  ];

  return (
    <div className="w-[100%] min-h-screen bg-[#f9fafb]">
      {/* Navigation Bar */}
      <div className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex md:flex-row flex-col justify-between items-center">
          <h1 className="md:text-2xl text-xl font-bold text-[#773fe7]">Feedback Dashboard</h1>

          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`md:px-4 px-1 py-2 rounded-md transition-all font-medium cursor-pointer border-b-2 ${
                  activeTab === tab.key
                    ? "text-[#773fe7] border-[#773fe7] bg-[#f3e8ff]"
                    : "text-gray-500 border-transparent hover:text-[#773fe7]/80 hover:bg-gray-100"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    
      <div className="h-screen w-full mx-auto px-6 py-8">
        {activeTab === "Overview" && <Overview />}
        {activeTab === "RatingAnalysis" && <RatingAnalysis />}
        {activeTab === "SentimentAnalysis" && <SentimentAnalysis />}
      </div>
    </div>
  );
};

export default Analytics;
