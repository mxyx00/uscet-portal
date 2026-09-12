"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type WeatherData = {
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  windSpeed: number;
};

export default function Dashboard() {


  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState("");


  const [apiMessage, setApiMessage] = useState("Connecting to API...");
  const router = useRouter();
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

  useEffect(() => {
    fetch("http://localhost:5091/api/auth/me", {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log("Authentication check failed:", error);
        router.push("/");
      });
  }, [router]);

  useEffect(() => {
  fetch("http://localhost:5091/api/weather")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      setWeather(data);
    })
    .catch((error) => {
      console.log("Unable to load weather:", error);
      setWeatherError("Weather unavailable");
    });
}, []);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:5091/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      router.push("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  }

function getWeatherDescription(code: number) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain Showers";
  if (code <= 86) return "Snow Showers";
  if (code <= 99) return "Thunderstorms";

  return "Unknown";
}


  return (
    <main className="dashboardPage">
      <header className="dashboardHeader">
        <h1 className="dashboardTitle">USC Equestrian</h1>

        <div className="userInfo">
          <button className="logoutButton" onClick={handleLogout}>
          Sign Out
          </button>
        </div>
      </header>

      <div className="dashboardContent">
        <h2>Welcome to the Team Portal</h2>
        <p className="dashboardIntro">
          Access team information, events, announcements, and resources.
        </p>



      <div className="weatherBar">
        {weather ? (
          <>
            <span>Los Angeles</span>
            <span>{getWeatherDescription(weather.weatherCode)}</span>
            <span className="weatherTemperature">
              {Math.round(weather.temperature)}°F
            </span>
            <span>Feels like {Math.round(weather.feelsLike)}°F</span>
            <span>Wind {Math.round(weather.windSpeed)} mph</span>
          </>
        ) : weatherError ? (
          <span>{weatherError}</span>
        ) : (
          <span>Loading weather...</span>
        )}
      </div>




        <div className="dashboardGrid">

          <Link href="/members" className="dashboardCard">
            <h3>Team Members</h3>
            <p>View the USC Equestrian team directory.</p>
          </Link>

          <Link href="/calendar" className="dashboardCard">
          <h3>Calendar</h3>
          <p>View upcoming practices, lessons, meetings, and competitions.</p>
        </Link>

          <Link href="/announcements" className="dashboardCard">
          <h3>Announcements</h3>
          <p>Keep up with important team updates.</p>
        </Link>

          <div className="dashboardCard">
            <h3>Team Resources</h3>
            <p>Access documents and other member resources.</p>
          </div>
        </div>
      </div>
    </main>
  );
}