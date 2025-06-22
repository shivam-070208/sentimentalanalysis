import { motion } from "framer-motion";
import React, { useState } from "react";
import Inputfield from "./Inputfield";
const Form = ({ board,sboard }) => {
  const Student = {
    Label: "Section",
    Placeholder: "Select your section",
    Option: ["EA", "EB", "EC", "FA", "FB"],
  };
  const Teacher = {
    Label: "Department",
    Placeholder: "Select your department",
    Option: [
      "Computer Science",
      "Mechanical Enginnering",
      "Electrical Enginnering",
      "Civil Engineering",
      "Mathmatics",
      "Physics",
    ],
  };
  const FormItem = {
    Login: [
      {
        Label: "Email",
        Placeholder: "your@gmail.com",
      },
      {
        Label: "Password",
        Placeholder: "",
        forgot: true,
      },
    ],
    Signin: [
      {
        Label: "Full Name",
        Placeholder: "Harsh Gupta",
      },
      {
        Label: "Email",
        Placeholder: "your@gmail.com",
      },

      board == "Student" ? { ...Student } : { ...Teacher },
      {
        Label: "Password",
        Placeholder: "",
      },
      {
        Label: "Confirm Password",
        Placeholder: "",
      },
    ],
  };

  const [index, sindex] = useState(0);

  return (
    <div className="w-full max-w-md m-auto bg-white flex mt-4 rounded flex-col py-3 px-2 items-center">
      <h1 className="text-2xl font-semibold">{board} Access</h1>
      <p className="text-zinc-400 text-sm ">Login or create a new account</p>
      <div className="px-2 py-1 rounded bg-zinc-100 flex mt-7 w-full text-center">
        {["Login", "Signup"].map((item, i) => (
          <div
            onClick={() => sindex(i)}
            key={i}
            className={`text-center z-1 w-1/2 relative text-sm ${
              index == i ? "text-black" : "text-zinc-500"
            } cursor-pointer font-semibold py-2`}
          >
            {item}
            {i == index && (
              <motion.div
                layoutId="movable-span"
                initial={{ width: "100%", height: "100%" }}
                className="absolute top-0 left-0 -z-1 rounded bg-white"
              />
            )}
          </div>
        ))}
      </div>
      <form className="w-full flex flex-col gap-3 px-2 mb-4 mt-10">
        {FormItem[index ? "Signin" : "Login"].map((data, i) => (
          <Inputfield data={data} key={data.Label} />
        ))}
        <button
          type="submit"
          value="submit"
          className="w-full bg-blue-600 py-2 text-white font-semibold hover:bg-blue-500 rounded cursor-pointer"
        >
          {index == 0 ? "Login" : "Create Account"}
        </button>
        <button
         type="button"
           onClick={()=>sboard(null)}
          className="w-full text-sm border-1 border-[#8f8d8d6d] py-2 font-[600] rounded cursor-pointer hover:bg-green-400 hover:text-white"
        >
        Go Back
        </button>
      </form>
    </div>
  );
};

export default Form;
