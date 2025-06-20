import Link from "next/link";

export default function Custom404Page() {
  return (
    <section className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-bold text-xl sm:text-2xl md:text-5xl lg:text-7xl">
          404
        </h1>
        <Link href={"/"} className="underline">
          Go to the Homepage
        </Link>
      </div>
    </section>
  );
}
