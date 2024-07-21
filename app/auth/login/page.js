"use client";
import React, { useState, useEffect } from "react";
import { Button, Space, Form, Input, message } from "antd";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);
  
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleFacebookLogin = () => {
    signIn("facebook");
  };

  const handleEmailLogin = async (values) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (result.error) {
      message.error("Invalid email or password");
    } else {
      message.success("Logged in successfully!");
      if (isClient) {
        router.push("/"); // Redirect to homepage after successful login
      }
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
          Login to Nishan's eCommerce Platform
        </h1>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleEmailLogin}
          className="w-full"
          autoComplete="off" // Disable form autocomplete
        >
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
              autoComplete="off" // Disable input autocomplete
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
              autoComplete="new-password" // Set autocomplete to new-password
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 bg-button-background-color text-button-text-color text-xl"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Space direction="horizontal" size="large">
          <Button
            type="default"
            size="large"
            onClick={handleGoogleLogin}
            icon={
              <img
                src="/Google_Logo.svg"
                alt="Google"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            }
          >
            Login with Google
          </Button>
          <Button
            type="default"
            size="large"
            onClick={handleFacebookLogin}
            icon={
              <img
                src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
                alt="Facebook"
                style={{ width: "1.5em", height: "1.5em" }}
              />
            }
          >
            Login with Facebook
          </Button>
        </Space>
        <div className="mt-4">
          <h1 className="text-foreground-color">
            Don't have an account?{" "}
            <Link className="text-blue-500 underline" href="/auth/signup">
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
