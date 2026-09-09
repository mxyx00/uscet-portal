"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "http://localhost:5091/auth/login?useCookies=true",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("Login failed:", error);
      setError("Invalid email or password.");
    }
  }

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

      <form className="loginForm" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="formError">{error}</p>}

        <button type="submit" className="signInButton">
          Sign In
        </button>
      </form>
    </main>
  );
}