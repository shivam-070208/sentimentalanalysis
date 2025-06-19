
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
            transition={{ duration: 0.6, delay:0.015*i,ease: "easeInOut" }}
            className="block"
          >
             {item === " " ? "\u00A0" : item}
          </motion.span>
        </span>
      ))}
      <motion.p className="text-white text-xl max-w-xl m-auto mt-2">Improving education through constructive feedback and data-driven insights</motion.p>
    </div>
  );
};

export default Text;
