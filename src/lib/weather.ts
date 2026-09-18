export interface CityWeather {
  cityKey: string;
  cityNameEn: string;
  cityNameHi: string;
  temp: number;
  conditionEn: string;
  conditionHi: string;
  weatherCode: number;
  humidity: number;
  icon: "sun" | "cloud-sun" | "cloud-fog" | "cloud-rain" | "cloud-drizzle" | "cloud-lightning";
  updatedAt: string;
}

export const CITIES_DATA: Record<string, { hi: string; en: string; lat: number; lon: number }> = {
  jaipur: { hi: "जयपुर", en: "Jaipur", lat: 26.9124, lon: 75.7873 },
  jodhpur: { hi: "जोधपुर", en: "Jodhpur", lat: 26.2389, lon: 73.0243 },
  udaipur: { hi: "उदयपुर", en: "Udaipur", lat: 24.5854, lon: 73.7125 },
  kota: { hi: "कोटा", en: "Kota", lat: 25.2138, lon: 75.8648 },
  ajmer: { hi: "अजमेर", en: "Ajmer", lat: 26.4499, lon: 74.6399 },
  bikaner: { hi: "बीकानेर", en: "Bikaner", lat: 28.0229, lon: 73.3119 },
  delhi: { hi: "नई दिल्ली", en: "New Delhi", lat: 28.6139, lon: 77.2090 },
  mumbai: { hi: "मुंबई", en: "Mumbai", lat: 19.0760, lon: 72.8777 },
  bengaluru: { hi: "बेंगलुरु", en: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  kolkata: { hi: "कोलकाता", en: "Kolkata", lat: 22.5726, lon: 88.3639 },
  ahmedabad: { hi: "अहमदाबाद", en: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  lucknow: { hi: "लखनऊ", en: "Lucknow", lat: 26.8467, lon: 80.9462 },
};

export function resolveCityKey(input: string): string {
  const normalized = (input || "").toLowerCase().trim();
  for (const [key, val] of Object.entries(CITIES_DATA)) {
    if (
      key === normalized ||
      val.en.toLowerCase() === normalized ||
      val.hi === input ||
      normalized.includes(val.en.toLowerCase()) ||
      input.includes(val.hi)
    ) {
      return key;
    }
  }
  return "jaipur";
}

function parseWmoCode(code: number): {
  en: string;
  hi: string;
  icon: "sun" | "cloud-sun" | "cloud-fog" | "cloud-rain" | "cloud-drizzle" | "cloud-lightning";
} {
  if (code === 0) return { en: "Sunny", hi: "साफ आसमान", icon: "sun" };
  if (code <= 3) return { en: "Partly Cloudy", hi: "आंशिक बादल", icon: "cloud-sun" };
  if (code === 45 || code === 48) return { en: "Foggy", hi: "कोहरा", icon: "cloud-fog" };
  if (code >= 51 && code <= 55) return { en: "Light Drizzle", hi: "बूंदाबांदी", icon: "cloud-drizzle" };
  if (code >= 61 && code <= 67) return { en: "Rainy", hi: "बारिश", icon: "cloud-rain" };
  if (code >= 80 && code <= 82) return { en: "Rain Showers", hi: "तेज़ फुहारें", icon: "cloud-rain" };
  if (code >= 95) return { en: "Thunderstorm", hi: "गरज के साथ बारिश", icon: "cloud-lightning" };
  return { en: "Clear", hi: "साफ मौसम", icon: "sun" };
}

export async function fetchLiveCityWeather(cityInput: string): Promise<CityWeather> {
  const cityKey = resolveCityKey(cityInput);
  const cityInfo = CITIES_DATA[cityKey];

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.lat}&longitude=${cityInfo.lon}&current=temperature_2m,weather_code,relative_humidity_2m&timezone=Asia%2FKolkata`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // 5 min cache
      headers: { "User-Agent": "NewsMediaKiran-WeatherEngine/1.0" },
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const temp = Math.round(current.temperature_2m ?? 31);
    const weatherCode = current.weather_code ?? 0;
    const humidity = Math.round(current.relative_humidity_2m ?? 45);
    const parsed = parseWmoCode(weatherCode);

    return {
      cityKey,
      cityNameEn: cityInfo.en,
      cityNameHi: cityInfo.hi,
      temp,
      conditionEn: parsed.en,
      conditionHi: parsed.hi,
      weatherCode,
      humidity,
      icon: parsed.icon,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(`Weather fetch failed for ${cityInput}, using seasonal fallback:`, error);
    return {
      cityKey,
      cityNameEn: cityInfo.en,
      cityNameHi: cityInfo.hi,
      temp: 31,
      conditionEn: "Clear Sky",
      conditionHi: "साफ आसमान",
      weatherCode: 0,
      humidity: 42,
      icon: "sun",
      updatedAt: new Date().toISOString(),
    };
  }
}
