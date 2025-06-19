"use client";
import React from "react";
import { motion } from "framer-motion";
const Text = () => {
  return (
    <div>
      {"Faculty Feedback System".split("").map((item, i) => (
        <span
          key={i}
          className=" relative overflow-hidden h-fit py-2 text-white font-bold text-[22px] sm:text-5xl inline-block"
        >
          <motion.span
            animate={{ y: [60, 0]}}
            transition={{ duration: 0.6, delay:0.01*i,ease: "easeInOut" }}
            className="block"
          >
             {item === " " ? "\u00A0" : item}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

export default Text;
