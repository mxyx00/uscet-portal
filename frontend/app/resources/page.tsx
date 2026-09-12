import Link from "next/link";

export default function ResourcesPage() {
  return (
    <main className="resourcesPage">
      <header className="dashboardHeader resourcesHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <Link href="/dashboard" className="backButton">
          ← Back to Dashboard
        </Link>
      </header>

      <div className="resourcesContent">
        <h2>Team Resources</h2>

        <p className="resourcesIntro">
          Welcome to the Team Resources page.
        </p>

        <div className="resourcesGrid">
          <div className="resourceCard">
            <h3>USC Student Resources</h3>

            <p>
              For IMLeagues Registration and RCC Info
            </p>

            <a
              href="https://recsports.usc.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="resourceLink"
            >
              Rec Sports
            </a>
          </div>

          <div className="resourceCard">
            <h3>IHSA</h3>

            <p>
              For schedules, rules, and IHSA registration.
            </p>

            <a
              href="https://www.ihsainc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="resourceLink"
            >
              IHSA
            </a>
          </div>

          <div className="resourceCard">
            <h3>US Equestrian</h3>

            <p>
              Tutorials, horsemanship info, general resources
            </p>

            <a
              href="https://www.usef.org"
              target="_blank"
              rel="noopener noreferrer"
              className="resourceLink"
            >
               US Equestrian
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}