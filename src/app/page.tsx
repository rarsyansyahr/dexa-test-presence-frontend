import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      <Link href="/auth/login">Login</Link>
    </main>
  );
}
