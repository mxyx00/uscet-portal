export default function Dashboard() {
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

        <div className="dashboardGrid">
          <div className="dashboardCard">
            <h3>Team Members</h3>
            <p>View the USC Equestrian team directory.</p>
          </div>

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