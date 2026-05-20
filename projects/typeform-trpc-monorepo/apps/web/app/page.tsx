"use client";
// import { api } from "../trpc/server";
import { trpc } from "../trpc/client";

export default function Home() {
  // const { data } = trpc.useQuery({ email: "hello@gmail.com" });
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">TypeForm</h1>
        <h2>Server Message</h2>
      </div>
    </main>
  );
}
