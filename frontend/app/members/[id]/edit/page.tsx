"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5091/api/members/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then((member) => {
        setFirstName(member.firstName);
        setLastName(member.lastName);
        setPosition(member.position);
        setYear(String(member.year));

        setLoading(false);
      })
      .catch((error) => {
        console.log("Unable to load member:", error);
        setError("Unable to load member.");
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch(
        `http://localhost:5091/api/members/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            firstName,
            lastName,
            position,
            year: Number(year),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      router.push("/members");
    } catch (error) {
      console.log("Unable to update member:", error);
      setError("Unable to update member.");
    }
  }

  if (loading) {
    return <p>Loading member...</p>;
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
        <h2>Edit Team Member</h2>

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
            Position
            <input
              type="text"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              required
            />
          </label>

          <label>
            Year
            <input
              type="number"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              required
            />
          </label>

          {error && <p className="formError">{error}</p>}

          <button type="submit" className="submitMemberButton">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}