"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");
  const hasVerified = useRef(false); // Ref to track if the verification request has been made

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const result = await response.json();

        if (result.success) {
          setStatus("Email verified successfully! Redirecting to login page...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 5000);
        } else {
          setStatus("Invalid or expired token.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("An error occurred. Please try again later.");
      }
    };

    if (token && !hasVerified.current) {
      verifyEmail();
      hasVerified.current = true; // Set the ref to true after the first request
    } else if (!token) {
      setStatus("No token provided.");
    }
  }, [token, router]);

  return (
    <div>
      <h1>{status}</h1>
    </div>
  );
}
