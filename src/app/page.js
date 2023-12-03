"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => router.push("/Login")}>go login</button>
      <button onClick={() => router.push("/Resgister")}>go Signup</button>
      <button onClick={()=>router.push("/Main")}>Go to MAin</button>
    </main>
  );
}
