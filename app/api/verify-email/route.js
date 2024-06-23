import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  const user = await prisma.user.findFirst({
    where: { emailVerificationToken: token },
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, error: "Invalid or expired token" }), { status: 200 });
  }
}
