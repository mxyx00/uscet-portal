"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddMemberPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setRole] = useState("Member");
  const [year, setGraduationYear] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:5091/api/members", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName,
          lastName,
          position,
          year: Number(year),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      router.push("/members");
    } catch (error) {
      console.log("Unable to add member:", error);
      setError("Unable to add member.");
    }
  }

  return (
    <main className="addMemberPage">
      <header className="dashboardHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <Link href="/members" className="backButton">
          Back to Members
        </Link>
      </header>

      <div className="addMemberContent">
        <h2>Add Team Member</h2>
        <p>Add a new member to the USC Equestrian directory.</p>

        

        <form className="memberForm" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </label>

          <label>
            Role
            <input
              type="text"
              value={position}
              onChange={(event) => setRole(event.target.value)}
              required
            />
          </label>

          <label>
            Graduation Year
            <input
              type="number"
              value={year}
              onChange={(event) => setGraduationYear(event.target.value)}
              required
            />
          </label>

          {error && <p className="formError">{error}</p>}

          <button type="submit" className="submitMemberButton">
            Add Member
          </button>
        </form>
      </div>
    </main>
  );
}