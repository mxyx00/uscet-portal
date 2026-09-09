import Link from "next/link";

export default function AnnouncementsPage() {
  return (
    <main className="announcementsPage">
      <header className="dashboardHeader announcementsHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <Link href="/dashboard" className="backButton">
          Back to Dashboard
        </Link>
      </header>

      <div className="announcementsContent">
        <h2>Announcements</h2>

        <div className="announcementBox">
          <h3>Team Update</h3>

          <p>
            Reminder: Please submit your IHSA registration forms by 01/16 at the latest!
          </p>


          <p>
            RecFest is on Wednesday at 7PM at the Lyon Center
          </p>
        </div>
      </div>
    </main>
  );
}