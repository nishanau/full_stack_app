"use client";
import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import Link from "next/link";
import { Button, ConfigProvider, Space } from "antd";
import { useSession,  signOut } from "next-auth/react";

// Colors for buttons
const colors1 = ["#6253E1", "#04BEFE"];
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Page = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center min-h-screen text-center p-4">
      {session ? (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">
            Welcome back to Nishan's eCommerce Platform!
          </h1>
          <p>You are now logged in. Enjoy your shopping!</p>
          <Space direction="vertical" size="large">
            <Link href="/shop">
              <Button type="primary" size="large">
                Go to Shop
              </Button>
            </Link>
            <Link href="/user/profile">
              <Button type="default" size="large">
                View Profile
              </Button>
            </Link>
            <Button type="default" size="large" onClick={() => signOut()}>
              Logout
            </Button>
          </Space>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold">
            Welcome to Nishan's eCommerce Platform!
          </h1>
          <Space direction="horizontal" size="large">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(135deg, ${colors1.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                      colors1
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                      colors1
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link href="/auth/login">
                <Button type="primary" size="large">
                  Login
                </Button>
              </Link>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(90deg, ${colors2.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                      colors2
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                      colors2
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Link href="/auth/signup">
                <Button type="primary" size="large">
                  Sign Up
                </Button>
              </Link>
            </ConfigProvider>
          </Space>
        </div>
      )}
    </div>
  );
};

export default Page;
