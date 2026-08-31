"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Member = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  year: number;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5091/api/members")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Unable to load members:", error);
        setLoading(false);
      });
  }, []);

async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to remove this member?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5091/api/members/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== id)
    );
  } catch (error) {
    console.log("Unable to delete member:", error);
  }
}

  return (
    <main className="membersPage">
      <header className="dashboardHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <Link href="/dashboard" className="backButton">
          Back to Dashboard
        </Link>
      </header>

      <div className="membersContent">
        <h2>Team Members</h2>
        <p className="membersIntro">
          USC Equestrian team directory
        </p>

      <Link href="/members/add" className="addMemberLink">
         Add Member
      </Link>

        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="memberList">
            {members.map((member) => (
             
             <div className="memberCard" key={member.id}>
              <div className="memberInfo">
                <h3>
                  {member.firstName} {member.lastName}
                </h3>

                <p>{member.position}</p>
              </div>

              <div className="memberRight">
                <span>Class of {member.year}</span>

                <div className="memberActions">
                  <Link
                    href={`/members/${member.id}/edit`}
                    className="editMemberButton"
                  >
                    Edit
                  </Link>

                  <button
                    className="deleteMemberButton"
                    onClick={() => handleDelete(member.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            ))}
          </div>
        )}
      </div>


    </main>
  );
}