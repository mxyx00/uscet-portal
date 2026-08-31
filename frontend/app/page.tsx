import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Image
        src="/logo.png"
        alt="USC Equestrian logo"
        width={360}
        height={220}
        className="logo"
      />

      <h1>USC Equestrian</h1>
      <p>Team Member Portal</p>

      <Link href="/dashboard" className="signInButton">
       Sign In
      </Link>
    </main>
  );
}