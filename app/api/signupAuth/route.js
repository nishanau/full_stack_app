import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // You can use 'argon2' or 'crypto' if bcryptjs causes issues
import crypto from "crypto";
import { sendVerificationEmail } from "../../lib/email";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerificationToken,
      },
    });

    // Send verification email
    await sendVerificationEmail(user, emailVerificationToken);

    return new Response(JSON.stringify({ message: "User created successfully. Please verify your email to login.", user }), { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// This ensures that the route runs on the Node.js runtime
export const runtime = "nodejs";
