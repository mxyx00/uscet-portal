import Link from "next/link";

export default function CalendarPage() {
  return (
    <main className="calendarPage">
      <header className="dashboardHeader calendarHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <Link href="/dashboard" className="backButton">
          ← Back to Dashboard
        </Link>
      </header>

      <div className="calendarContent">
        <h2>Team Calendar</h2>

        <div className="calendarContainer">
          <iframe
            src= "https://calendar.google.com/calendar/embed?src=d382a39c1367d10b5afe9f3f6c08c9bc80bf0fbc6bc2036ddf31e17cf588ebc6%40group.calendar.google.com&ctz=America%2FToronto"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="USC Equestrian Team Calendar"
          />
        </div>
      </div>
    </main>
  );
}



