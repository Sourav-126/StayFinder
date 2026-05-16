import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";
const saltRounds = 2;
export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password } = body;

  if (!name || typeof name !== "string" || !name.trim() ||
      !email || typeof email !== "string" || !email.trim() ||
      !password || typeof password !== "string" || !password.trim()) {
    return NextResponse.json({ message: "Missing or invalid fields." }, { status: 400 });
  }

  const hashedPass = await hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        hashedPassword: hashedPass,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Registration database error:", error);
    return NextResponse.json({ message: "A secure connection to the database could not be established. Please try again shortly." }, { status: 500 });
  }
}
