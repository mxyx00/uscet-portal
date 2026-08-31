import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Image
        src="/usc-equestrian-logo.png"
        alt="USC Equestrian logo"
        width={220}
        height={220}
        className="logo"
      />

      <h1>USC Equestrian</h1>
      <p>Team Member Portal</p>

      <button>Sign In</button>
    </main>
  );
}