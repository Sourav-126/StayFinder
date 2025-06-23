import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";
const saltRounds = 2;
export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, password } = body;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return NextResponse.json({ message: "fields are empty" }, { status: 500 });
  }

  const hashedPass = await hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPass,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed", { status: 500 });
  }
}
