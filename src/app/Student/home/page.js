import Dashboardlayout from "@/components/layout/Dashboardlayout";
import React from "react";
import {  Star, Users } from "lucide-react";
import Card from "@/components/layout/Card";
import { ExternalLink } from "lucide-react";
const page = () => {
  const cardData = [
    {
      tittle: "Total Feedbacks Given",
      Icon: < Users className="h-4 w-4 text-neutral-400" />,
      No: "7",
      Comment: "Across 4 different courses",
    },
    {
      tittle: "Pending Feedbacks",
      Icon: < Star className="h-4 w-4 text-neutral-400" />,
      No: "3",
      Comment: "For this semester",
    },
    {
      tittle: "Section",
      Icon: < Users className="h-4 w-4 text-neutral-400" />,
      No: "3",
      Comment: "Spring 2025",
    },
  ];
  const recentActivity = [
    {
      id: 1,
      action: "Submitted feedback for Dr. Jane Smith",
      date: "2025-04-15",
      course: "Database Systems",
    },
    {
      id: 2,
      action: "Submitted feedback for Prof. Michael Johnson",
      date: "2025-04-14",
      course: "Data Structures",
    },
    {
      id: 3,
      action: "Provided a suggestion for Computer Lab facilities",
      date: "2025-04-10",
      type: "Facility",
    },
  ];
  const pendingFeedbacks = [
    { id: 1, teacher: "Dr. Robert Williams", course: "Operating Systems" },
    { id: 2, teacher: "Prof. Sarah Thompson", course: "Computer Networks" },
    { id: 3, teacher: "Dr. David Clark", course: "Software Engineering" },
  ];
  return (
    <Dashboardlayout role={"Student"} index={0}>
      <div className="w-full flex justify-between flex-wrap">
        <span className="w-fit whitespace-nowrap text-2xl font-bold">
          Welcome Back, Student!
        </span>
        <div className="flex gap-3 flex-wrap justify-center">
          <button className="hover:shadow-md shadow-neutral-600 hover:px-4 transition-all duration-400  rounded px-3 py-1 gap-2 flex bg-blue-600 hover:bg-blue-500 cursor-pointer text-white  items-center">
            <span className="text-xl">☆ </span>
            <span className="text-sm font-semibold">Rate Teachers</span>
          </button>
          <button className="hover:shadow-md  shadow-neutral-600 hover:px-4 transition-all duration-400  rounded px-3 py-2   bg-white border-1 border-neutral-300 text-sm cursor-pointer font-semibold hover:bg-green-500 hover:text-white">
            Provide Suggestion
          </button>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-7 ">
        {cardData.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-full ">
        <div className="w-full p-4 flex flex-col gap-1 bg-white rounded-xl hover:shadow-xl transition-all border-1 hover:border-0 border-neutral-200">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <p className="text-xs text-zinc-400">
            Your Recent Feedback Submisions
          </p>

          <div className="space-y-4 mt-7 h-60 snap-y  overflow-auto ">
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
                    {activity.type && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {activity.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full p-4 flex flex-col gap-1 bg-white rounded-xl hover:shadow-xl transition-all border-1 hover:border-0 border-neutral-200">
          <h2 className="text-2xl font-semibold">Pending Feedbacks</h2>
          <p className="text-xs text-zinc-400">
            Teachers you still need to rate
          </p>

          <div className="space-y-4 mt-7 h-60 snap-y  overflow-auto ">
            {pendingFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="pb-4 border-b border-gray-100 snap-start"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{feedback.teacher}</p>

                  <ExternalLink className="h-4 w-4" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {feedback.course}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default page;
