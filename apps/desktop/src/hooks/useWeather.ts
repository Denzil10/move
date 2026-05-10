import { useState, useEffect } from "react";

export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "snowy" | "unknown";

interface WeatherData {
  condition: WeatherCondition;
  temp: number;
  location: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Step 1: Get location from IP (ipapi.co)
        const geoResponse = await fetch("https://ipapi.co/json/");
        const geoData = await geoResponse.json();
        const { latitude, longitude, city } = geoData;

        // Step 2: Get weather from Open-Meteo
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();
        const current = weatherData.current_weather;

        // Map WMO Weather interpretation codes
        // https://open-meteo.com/en/docs
        const code = current.weathercode;
        let condition: WeatherCondition = "unknown";

        if (code === 0) condition = "sunny"; // Clear sky
        else if (code >= 1 && code <= 3) condition = "cloudy"; // Mainly clear, partly cloudy, and overcast
        else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = "rainy"; // Drizzle, Rain, Rain showers
        else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) condition = "snowy"; // Snow fall, Snow grains, Snow showers
        else if (code >= 95) condition = "rainy"; // Thunderstorm

        setWeather({
          condition,
          temp: current.temperature,
          location: city || "Unknown"
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every hour
    const interval = setInterval(fetchWeather, 3600000);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading };
};
