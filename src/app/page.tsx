import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <Link href="/auth/login">Login</Link>
    </main>
  );
}
