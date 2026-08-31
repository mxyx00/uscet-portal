"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [apiMessage, setApiMessage] = useState("Connecting to API...");
  useEffect(() => {
  fetch("http://localhost:5091/api/hello")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      setApiMessage(data.message);
    })
    .catch((error) => {
      console.log("API request failed:", error);
      setApiMessage("Unable to connect to API");
    });
}, []);
  return (
    <main className="dashboardPage">
      <header className="dashboardHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <div className="userInfo">
          <span>Team Member</span>
          <button className="logoutButton">Sign Out</button>
        </div>
      </header>

      <div className="dashboardContent">
        <h2>Welcome to the Team Portal</h2>
        <p className="dashboardIntro">
          Access team information, events, announcements, and resources.
        </p>

      <div className="apiStatus">
         <strong>API Status:</strong> {apiMessage}
      </div>

        <div className="dashboardGrid">

          <Link href="/members" className="dashboardCard">
            <h3>Team Members</h3>
            <p>View the USC Equestrian team directory.</p>
          </Link>

          <div className="dashboardCard">
            <h3>Calendar</h3>
            <p>View upcoming practices, lessons, meetings, and competitions.</p>
          </div>

          <div className="dashboardCard">
            <h3>Announcements</h3>
            <p>Keep up with important team updates.</p>
          </div>

          <div className="dashboardCard">
            <h3>Team Resources</h3>
            <p>Access documents and other member resources.</p>
          </div>
        </div>
      </div>
    </main>
  );
}