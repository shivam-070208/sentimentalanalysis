"use client";
import Dashboardlayout from "@/components/layout/Dashboardlayout";
import React, { useEffect, useState } from "react";
import { Star, Users, ExternalLink } from "lucide-react";
import Card from "@/components/layout/Card";
import Link from "next/link";

const Page = () => {
  const [feedbackStats, setFeedbackStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [user, setUser] = useState(null);

 useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/Student", { method: "POST", credentials: "include" });
    const data = await res.json();
    setUser(data);

    // Stats
    setFeedbackStats([
      {
        tittle: "Total Feedbacks Given",
        Icon: <Users className="h-4 w-4 text-neutral-400" />,
        No: data.Feedbackgiven?.length || 0,
        Comment: `Across ${new Set(data.Feedbackgiven?.map(f => f.course)).size || 0} different courses`,
      },
      {
        tittle: "Section",
        Icon: <Users className="h-4 w-4 text-neutral-400" />,
        No: data.Section,
        Comment: "Current academic section",
      },
    ]);

    // Recent
    setRecentActivity(
      data.Feedbackgiven?.slice(-5).reverse().map((entry, i) => ({
        id: i,
        action: `Submitted feedback for ${entry.teacherName}`,
        date: entry.date,
        course: entry.course,
      })) || []
    );

    // Pending
    const res2 = await fetch("/api/Feedback/pending", {
      method: "POST",
      credentials: "include",
    });
    const pending = await res2.json();

    setPendingFeedbacks(
      pending.map((item, i) => ({
        teacher: item.Name,
        course: item.Department || "Unknown Course",
        id: i,
      }))
    );
  }

  fetchData();
}, []);
  return (
    <Dashboardlayout role="Student" index={0}>
      <div className="w-full flex justify-between flex-wrap">
        <span className="w-fit whitespace-nowrap text-2xl font-bold">
          {user ? `Welcome Back, ${user.Name.split(" ")[0]}!` : "Welcome Back!"}
        </span>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/Student/rate">
            <button className="hover:shadow-md shadow-neutral-600 hover:px-4 transition-all duration-400  rounded px-3 py-1 gap-2 flex bg-blue-600 hover:bg-blue-500 cursor-pointer text-white  items-center">
              <span className="text-xl">☆ </span>
              <span className="text-sm font-semibold">Rate Teachers</span>
            </button>
          </Link>
          <button className="hover:shadow-md shadow-neutral-600 hover:px-4 transition-all duration-400 rounded px-3 py-2 bg-white border border-neutral-300 text-sm cursor-pointer font-semibold hover:bg-green-500 hover:text-white">
            Provide Suggestion
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-7 mt-4">
        {feedbackStats.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>

      {/* Recent and Pending */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-full mt-6">
        {/* Recent */}
        <div className="w-full p-4 flex flex-col gap-1 bg-white rounded-xl hover:shadow-xl transition-all border border-neutral-200">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <p className="text-xs text-zinc-400">Your Recent Feedback Submissions</p>

          <div className="space-y-4 mt-7 h-60 snap-y overflow-auto">
            {recentActivity.length === 0 && (
              <p className="text-sm text-muted-foreground">No feedback submitted yet.</p>
            )}
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start pb-4 border-b border-gray-100 snap-start"
              >
                <div className="w-full">
                  <p className="font-medium">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                    {activity.course && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {activity.course}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="w-full p-4 flex flex-col gap-1 bg-white rounded-xl hover:shadow-xl transition-all border border-neutral-200">
          <h2 className="text-2xl font-semibold">Pending Feedbacks</h2>
          <p className="text-xs text-zinc-400">Teachers you still need to rate</p>

          <div className="space-y-4 mt-7 h-60 snap-y overflow-auto">
            {pendingFeedbacks.length === 0 && (
              <p className="text-sm text-muted-foreground">You’ve completed all feedbacks.</p>
            )}
            {pendingFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="pb-4 border-b border-gray-100 snap-start"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{feedback.teacher}</p>
                  <Link href="/Student/rate">
                    <ExternalLink className="h-4 w-4 cursor-pointer" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{feedback.course}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Page;
