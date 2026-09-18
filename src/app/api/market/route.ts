import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const marketData = {
    timestamp: new Date().toISOString(),
    // Standard indices
    indices: [
      { name: "BSE SENSEX", value: "82,450.25", change: "+345.10", percent: "+0.42%", isPositive: true },
      { name: "NSE NIFTY 50", value: "25,210.80", change: "+95.60", percent: "+0.38%", isPositive: true },
      { name: "NIFTY BANK", value: "51,840.15", change: "+182.40", percent: "+0.35%", isPositive: true },
      { name: "MCX GOLD", value: "₹76,420", change: "+₹275", percent: "+0.36%", isPositive: true },
      { name: "MCX SILVER", value: "₹89,180", change: "-₹140", percent: "-0.16%", isPositive: false },
    ],

    // Backward-compatible commodities array
    commodities: [
      { name: "GOLD (24K/10g)", value: "₹76,450", change: "+₹280", percent: "+0.37%", isPositive: true },
      { name: "GOLD (22K/10g)", value: "₹70,080", change: "+₹250", percent: "+0.36%", isPositive: true },
      { name: "SILVER (1kg)", value: "₹89,200", change: "-₹150", percent: "-0.17%", isPositive: false },
    ],

    // Backward-compatible forex array
    forex: [
      { pair: "USD / INR", rate: "₹83.92", change: "+0.04", isPositive: true },
      { pair: "EUR / INR", rate: "₹92.45", change: "-0.08", isPositive: false },
      { pair: "GBP / INR", rate: "₹109.80", change: "+0.12", isPositive: true },
    ],

    // Comprehensive Gold & Silver rates
    goldRates: {
      dateStrEn: "Today, September 17, 2026",
      dateStrHi: "आज, 17 सितम्बर 2026",
      purity24k: {
        per10g: "₹76,450",
        per1g: "₹7,645",
        num10g: 76450,
        change: "+₹280",
        percent: "+0.37%",
        isPositive: true,
        labelEn: "24 Karat Pure Gold",
        labelHi: "24 कैरेट शुद्ध सोना",
      },
      purity22k: {
        per10g: "₹70,080",
        per1g: "₹7,008",
        num10g: 70080,
        change: "+₹250",
        percent: "+0.36%",
        isPositive: true,
        labelEn: "22 Karat Standard Jewelry Gold",
        labelHi: "22 कैरेट जेवराती सोना",
      },
      purity18k: {
        per10g: "₹57,340",
        per1g: "₹5,734",
        num10g: 57340,
        change: "+₹210",
        percent: "+0.37%",
        isPositive: true,
        labelEn: "18 Karat Hallmarked Gold",
        labelHi: "18 कैरेट हॉलमार्क सोना",
      },
      silver: {
        per1kg: "₹89,200",
        per10g: "₹892",
        num1kg: 89200,
        change: "-₹150",
        percent: "-0.17%",
        isPositive: false,
        labelEn: "Silver (Fine)",
        labelHi: "शुद्ध चांदी",
      },
      cityRates: [
        { cityEn: "Jaipur", cityHi: "जयपुर", gold24k: "₹76,450", gold22k: "₹70,080", silver1kg: "₹89,200", state: "Rajasthan" },
        { cityEn: "Jodhpur", cityHi: "जोधपुर", gold24k: "₹76,480", gold22k: "₹70,110", silver1kg: "₹89,250", state: "Rajasthan" },
        { cityEn: "Udaipur", cityHi: "उदयपुर", gold24k: "₹76,460", gold22k: "₹70,090", silver1kg: "₹89,220", state: "Rajasthan" },
        { cityEn: "Kota", cityHi: "कोटा", gold24k: "₹76,470", gold22k: "₹70,100", silver1kg: "₹89,230", state: "Rajasthan" },
        { cityEn: "Delhi", cityHi: "दिल्ली", gold24k: "₹76,500", gold22k: "₹70,130", silver1kg: "₹89,200", state: "Delhi NCR" },
        { cityEn: "Mumbai", cityHi: "मुंबई", gold24k: "₹76,350", gold22k: "₹69,980", silver1kg: "₹89,100", state: "Maharashtra" },
        { cityEn: "Ahmedabad", cityHi: "अहमदाबाद", gold24k: "₹76,400", gold22k: "₹70,030", silver1kg: "₹89,150", state: "Gujarat" },
        { cityEn: "Kolkata", cityHi: "कोलकाता", gold24k: "₹76,350", gold22k: "₹69,980", silver1kg: "₹89,100", state: "West Bengal" },
      ],
    },

    // Comprehensive Foreign Exchange (Forex) Rates & Conversions
    currencies: [
      {
        code: "USD",
        symbol: "$",
        nameEn: "US Dollar",
        nameHi: "अमेरिकी डॉलर",
        flag: "🇺🇸",
        inrRate: 83.92,
        change: "+0.04",
        percent: "+0.05%",
        isPositive: true,
      },
      {
        code: "EUR",
        symbol: "€",
        nameEn: "Euro",
        nameHi: "यूरो",
        flag: "🇪🇺",
        inrRate: 92.45,
        change: "-0.08",
        percent: "-0.09%",
        isPositive: false,
      },
      {
        code: "GBP",
        symbol: "£",
        nameEn: "British Pound",
        nameHi: "ब्रिटिश पाउंड",
        flag: "🇬🇧",
        inrRate: 109.80,
        change: "+0.12",
        percent: "+0.11%",
        isPositive: true,
      },
      {
        code: "AED",
        symbol: "د.إ",
        nameEn: "UAE Dirham",
        nameHi: "यूएई दिरहम",
        flag: "🇦🇪",
        inrRate: 22.85,
        change: "+0.01",
        percent: "+0.04%",
        isPositive: true,
      },
      {
        code: "SAR",
        symbol: "﷼",
        nameEn: "Saudi Riyal",
        nameHi: "सऊदी रियाल",
        flag: "🇸🇦",
        inrRate: 22.38,
        change: "+0.02",
        percent: "+0.09%",
        isPositive: true,
      },
      {
        code: "CAD",
        symbol: "C$",
        nameEn: "Canadian Dollar",
        nameHi: "कनाडाई डॉलर",
        flag: "🇨🇦",
        inrRate: 62.15,
        change: "+0.05",
        percent: "+0.08%",
        isPositive: true,
      },
      {
        code: "AUD",
        symbol: "A$",
        nameEn: "Australian Dollar",
        nameHi: "ऑस्ट्रेलियाई डॉलर",
        flag: "🇦🇺",
        inrRate: 56.40,
        change: "-0.03",
        percent: "-0.05%",
        isPositive: false,
      },
      {
        code: "KWD",
        symbol: "KD",
        nameEn: "Kuwaiti Dinar",
        nameHi: "कुवैती दिनार",
        flag: "🇰🇼",
        inrRate: 274.50,
        change: "+0.40",
        percent: "+0.15%",
        isPositive: true,
      },
    ],
  };

  return NextResponse.json({ success: true, data: marketData });
}
