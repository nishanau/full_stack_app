"use client";
import React, { useState } from "react";
import { Button, Space, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

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

      // Directly parse the JSON response
      const result = await response.json();
      if (!response.ok && result.message === "User already exists") {
        throw new Error(result.error || "User already exists");
      }
      if (!response.ok) {
        throw new Error(result.error || "SignUp failed");
      }


      // Display success message from the response
      message.success(result.message);

      // Clear the form fields
      form.resetFields();

      // Optionally, log the user in after signup
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      // Display error message from the response
      console.error("Signup error:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center p-4 bg-background-color text-foreground-color">
      <div className="absolute top-4 left-4">
        <Button type="link" onClick={() => router.push("/")}>
         Go back to Home
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground-color">
          Sign Up for Nishan's eCommerce Platform
        </h1>
        <Form
          form={form}
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
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 bg-button-background-color text-button-text-color text-xl"
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
            <Link className="text-blue-500 underline" href="/auth/login">
              Log In
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
