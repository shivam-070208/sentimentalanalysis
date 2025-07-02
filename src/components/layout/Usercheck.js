"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Usercheck = ({ role }) => {
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`/api/Check/${role}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        });

        if (!res.ok) {
          // user not found or invalid
          router.push("/");
        }

        const data = await res.json();
        if (!data.exists) {
          router.push("/");
        }

        // else do nothing and allow page render
      } catch (err) {
        console.error("Verification error:", err);
        router.push("/");
      }
    };

    verifyUser();
  }, [role, router]);

  return null; // or loader if needed
};

export default Usercheck;
