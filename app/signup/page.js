"use client";
import React, { useState } from "react";
import { Button, Space, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = () => {
    signIn("google");
  };

  const handleFacebookSignup = () => {
    signIn("facebook");
  };

  const handleEmailSignup = async (values) => {
    setLoading(true);

    try {
      const response = await fetch("/api/signupAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const text = await response.text(); // Get the response as text
      console.log("Response text:", text); // Log the response text

      try {
        const result = JSON.parse(text); // Try to parse the response as JSON
        if (!response.ok) {
          throw new Error(result.error || "Signup failed");
        }
        message.success("Signed up successfully!");
        // Optionally, log the user in after signup
        signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        console.error("Failed to parse JSON response:", text);
        throw new Error("Failed to parse JSON response");
      }
    } catch (error) {
      console.error("Signup error:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center p-4 bg-background-color text-foreground-color">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground-color">
          Sign Up for Nishan's eCommerce Platform
        </h1>
        <Form
          name="signup"
          layout="vertical"
          onFinish={handleEmailSignup}
          className="w-full"
        >
          <Form.Item
            label={
              <span style={{ color: "var(--foreground-color)" }}>Name</span>
            }
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              style={{ height: "50px" }}
              className="bg-input-background-color text-input-text-color"
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "var(--foreground-color)" }}>Email</span>
            }
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              className="bg-input-background-color text-input-text-color"
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "var(--foreground-color)" }}>Password</span>
            }
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              style={{ height: "50px" }}
              className="bg-input-background-color text-input-text-color"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-button-background-color text-button-text-color"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Space direction="horizontal" size="large">
          <Button
            type="default"
            size="large"
            onClick={handleGoogleSignup}
            icon={
              <img
                src="/Google_Logo.svg"
                alt="Google"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            }
          >
            Sign Up with Google
          </Button>
          <Button
            type="default"
            size="large"
            onClick={handleFacebookSignup}
            icon={
              <img
                src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                alt="Facebook"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            }
          >
            Sign Up with Facebook
          </Button>
        </Space>
        <div className="mt-4">
          <h1 className="text-foreground-color">
            Already have an account?{" "}
            <Link className="text-blue-500 underline" href="/login">
              Log In
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
