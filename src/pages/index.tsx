import { useState } from "react";
import { validateUEN } from "@/utils/validateUEN";


export default function Home() {
  const [uen, setUen] = useState("");
  const [uenResult, setUenResult] = useState("");

  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState("");

  const handleValidateUEN = () => {
    const message = validateUEN(uen.trim());
    setUenResult(message);
  };

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
      );
      const data = await res.json();
      const forecasts = data.items[0].forecasts;

      const match = forecasts.find(
        (f: any) => f.area.toLowerCase() === location.trim().toLowerCase()
      );

      if (match) {
        setForecast(`${match.area}: ${match.forecast}`);
      } else {
        setForecast("❌ Location not found in forecast data.");
      }
    } catch (err) {
      console.error(err);
      setForecast("❌ Error fetching weather data.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          OneST Portal
        </h1>

        {/* UEN Validator utilizing Regex */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            UEN Validator
            <span
              title={`Valid UEN formats:
                    • A: nnnnnnnnX — 9-digit (Businesses via ACRA)
                    • B: yyyynnnnnX — 10-digit (Local companies via ACRA)
                    • C: TyyPQnnnnX — 10-digit (Other entities)
                    Where:
                    - n = number
                    - y = year of issuance
                    - P/Q = entity type
                    - X = check letter`}
              style={{
                cursor: "help",
                fontSize: "1rem",
                color: "#888",
            
              }}
            >
              ⓘ
            </span>
          </h2>

          <input
            type="text"
            value={uen}
            onChange={(e) => setUen(e.target.value)}
            placeholder="Enter UEN (e.g., T09LL001B)"
            style={{ padding: "5px", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={handleValidateUEN}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Validate UEN
          </button>
          {uenResult && (
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>{uenResult}</p>
          )}
        </section>

        {/* Weather Forecast Section*/}
        <section>
          <h2>2-Hour Weather Forecast</h2>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "5px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select a location</option>
            <option>Ang Mo Kio</option>
            <option>Bedok</option>
            <option>Bishan</option>
            <option>Bukit Batok</option>
            <option>Bukit Merah</option>
            <option>Bukit Timah</option>
            <option>Changi</option>
            <option>Choa Chu Kang</option>
            <option>Clementi</option>
            <option>Geylang</option>
            <option>Hougang</option>
            <option>Jurong East</option>
            <option>Jurong West</option>
            <option>Kallang</option>
            <option>Marine Parade</option>
            <option>Pasir Ris</option>
            <option>Punggol</option>
            <option>Queenstown</option>
            <option>Sembawang</option>
            <option>Sengkang</option>
            <option>Serangoon</option>
            <option>Tampines</option>
            <option>Toa Payoh</option>
            <option>Woodlands</option>
            <option>Yishun</option>
          </select>
          <button
            onClick={fetchWeather}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Get Forecast
          </button>
          {forecast && (
            <p style={{ marginTop: "15px", fontWeight: "bold" }}>{forecast}</p>
          )}
        </section>
      </div>
    </div>
  );
}
