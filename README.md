# 🌐 IoT Monitoring Dashboard - Frontend

Dashboard monitoring lingkungan berbasis web untuk sistem IoT dengan ESP32. Menampilkan data sensor real-time (suhu, kelembapan, cahaya) dengan parsing data JSON, visualisasi chart, dan kontrol relay/pompa.

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React Components
- **Chart**: Canvas-based custom chart
- **HTTP Client**: Fetch API
- **Real-time Updates**: Polling (2s untuk metric cards, 10s untuk tabel)

---

## 🎯 Fitur Utama

### 1. **Real-time Monitoring**

- 4 Metric Cards (Temperature, Humidity, Light, Air Quality)
- Auto-refresh setiap 2 detik
- Live indicator dengan animation pulse
- Canvas-based line chart untuk temperature trends

### 2. **Data Table**

- Menampilkan semua data sensor terbaru
- Highlight data terbaru (hijau)
- Pilihan limit: 20, 50, 100, 200 records
- Auto-refresh setiap 10 detik
- Summary statistics (average temperature, humidity, light)

### 3. **Historical Summary**

- Max/Min/Average temperature
- Max humidity
- Tabel records dengan nilai maksimal
- Month-year tags dari data maksimal

### 4. **Pump Control**

- Control relay/pompa ON/OFF via MQTT
- Status indicator (Running/Stopped)
- Visual feedback dengan color changes

### 5. **Parsing Data**

- **response.json()** - Parse HTTP response
- **toFixed()** - Format decimal numbers
- **parseMonthYear()** - Parse "11-2024" → "November 2024"
- **formatTimestamp()** - Format ISO timestamp → readable date

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm atau yarn
- Backend server running di http://localhost:3000

### Steps

1. **Clone repository**

```bash
git clone https://github.com/Notnoir/uts_iot_fe.git
cd uts_iot_fe
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup environment (opsional)**

Frontend akan connect ke backend di `http://localhost:3000` secara default.
Jika backend di port lain, edit file API routes di `app/api/`.

4. **Run development server**

```bash
npm run dev
# atau
yarn dev
```

5. **Open browser**

```
http://localhost:3001
```

**Note**: Frontend berjalan di port 3001, backend di port 3000.

---

## 🗂️ Struktur Project

```
frontend/
├── app/
│   ├── api/                      # API Route Handlers (proxy ke backend)
│   │   ├── sensor/
│   │   │   ├── route.ts         # GET /api/sensor (summary)
│   │   │   ├── latest/
│   │   │   │   └── route.ts     # GET /api/sensor/latest
│   │   │   └── all/
│   │   │       └── route.ts     # GET /api/sensor/all
│   │   └── pompa/
│   │       └── route.ts         # POST /api/pompa
│   ├── components/               # React Components
│   │   ├── Navbar.tsx           # Navigation header dengan tabs
│   │   ├── MetricCard.tsx       # Metric display cards
│   │   ├── SensorChart.tsx      # Canvas-based line chart
│   │   ├── RealtimeMonitor.tsx  # Real-time data & pump control
│   │   ├── AllDataTable.tsx     # Tabel semua data terbaru
│   │   ├── SensorDashboard.tsx  # Historical summary
│   │   ├── StatCard.tsx         # Statistics cards
│   │   ├── LoadingSpinner.tsx   # Loading indicator
│   │   └── ErrorMessage.tsx     # Error display
│   ├── types/
│   │   └── sensor.ts            # TypeScript interfaces
│   ├── utils/
│   │   └── format.ts            # Utility functions untuk parsing
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── public/                       # Static assets
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🔌 API Endpoints (Frontend Routes)

Frontend menyediakan API routes yang bertindak sebagai proxy ke backend:

### 1. Get Latest Sensor Data

```
GET /api/sensor/latest
```

Response:

```json
{
  "suhu": 28.5,
  "kelembapan": 65.2,
  "cahaya": 75.0,
  "timestamp": "2024-11-11T10:30:00.000Z"
}
```

### 2. Get All Latest Records

```
GET /api/sensor/all?limit=50
```

Response:

```json
{
  "count": 50,
  "data": [
    {
      "idx": 123,
      "suhu": 28.5,
      "humid": 65.2,
      "kecerahan": 75.0,
      "timestamp": "2024-11-11T10:30:00.000Z"
    }
  ]
}
```

### 3. Get Historical Summary

```
GET /api/sensor
```

Response:

```json
{
  "suhumax": 36,
  "suhumin": 21,
  "suhurata": 28.35,
  "humidmax": 36,
  "nilai_suhu_max_humid_max": [...],
  "month_year_max": [...]
}
```

### 4. Control Pump

```
POST /api/pompa
Content-Type: application/json

{
  "status": "ON"  // or "OFF"
}
```

---

## 🎨 Components

### **Navbar**

- Logo dengan chart icon
- 4 tabs: Dashboard, Devices, Alerts, Settings
- User avatar button

### **MetricCard**

- Customizable icon, label, value, unit
- Background color variants
- Responsive design

### **SensorChart**

- Canvas-based line chart
- Auto-scaling axes
- Smooth bezier curves
- Gradient fill
- Grid lines
- Time-based labels

### **RealtimeMonitor**

- Fetch data every 2 seconds
- Display 4 metric cards
- Chart dengan 50 data points
- Pump control button

### **AllDataTable**

- Display all latest records
- Highlight newest record
- Sortable & scrollable
- Average calculations

### **SensorDashboard**

- Statistics cards (max/min/avg)
- Data table dengan highlighting
- Month-year tags
- Manual refresh button

---

## 🔧 Parsing Data di Frontend

### 1. **HTTP Response Parsing**

```typescript
const response = await fetch("/api/sensor/latest");
const result = await response.json(); // Parse JSON response
```

### 2. **Number Formatting**

```typescript
<MetricCard value={data.suhu.toFixed(0)} unit="°C" />
// 28.456 → "28°C"
```

### 3. **Month-Year Parsing**

```typescript
parseMonthYear("11-2024"); // → "November 2024"
```

### 4. **Timestamp Formatting**

```typescript
formatTimestamp("2024-11-11T10:30:00.000Z");
// → "11 Nov 2024, 10:30"
```

### 5. **User Input Parsing**

```typescript
setLimit(parseInt(e.target.value)); // "100" → 100
```

---

## 🎯 Usage

### Start Development Server

```bash
npm run dev
```

Dashboard akan tersedia di `http://localhost:3001`

### Build for Production

```bash
npm run build
npm start
```

### Lint Code

```bash
npm run lint
```

---

## 🌐 Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Configure environment variables (jika perlu)
4. Deploy

### Deploy ke Netlify

1. Build project: `npm run build`
2. Upload folder `out/` ke Netlify
3. Configure backend URL

---

## 🔗 Integration dengan Backend

Frontend berkomunikasi dengan backend melalui API routes yang bertindak sebagai proxy:

```
Frontend (localhost:3001)
    ↓ fetch
API Routes (/api/sensor/*)
    ↓ fetch
Backend (localhost:3000)
    ↓ MQTT
ESP32 (Wokwi)
```

**Pastikan backend sudah running sebelum start frontend!**

---

## 🐛 Troubleshooting

### Port 3001 sudah digunakan

```bash
# Edit package.json, ubah port di script "dev"
"dev": "next dev -p 3002"
```

### Error fetch API

- Pastikan backend running di `http://localhost:3000`
- Check CORS configuration di backend
- Lihat Network tab di DevTools

### Data tidak muncul

- Check backend logs
- Verify ESP32 mengirim data ke MQTT
- Refresh browser dengan Ctrl+Shift+R

### Chart tidak render

- Check browser console untuk errors
- Verify data format dari API
- Pastikan ada minimal 2 data points

---

## 📝 Environment Variables (Optional)

Create `.env.local` file jika perlu custom configuration:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

Lalu update API routes untuk menggunakan environment variable ini.

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Created for IoT UTS Project - Semester 5

---

## 🔗 Related Links

- **Backend Repository**: https://github.com/Notnoir/uts_iot_be
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 📸 Screenshots

### Dashboard View

- Real-time metric cards dengan live data
- Temperature trend chart
- Latest data table dengan highlight

### Pump Control

- ON/OFF toggle button
- Status indicator
- Real-time feedback

### Historical Summary

- Statistics cards (max/min/avg)
- Data records table
- Month-year tags

---

## ✅ Features Checklist

- [x] Real-time data monitoring
- [x] Canvas-based chart visualization
- [x] Data table dengan sorting & filtering
- [x] Pump control via MQTT
- [x] Parsing JSON data
- [x] Responsive design
- [x] Auto-refresh mechanism
- [x] Error handling
- [x] Loading states
- [x] TypeScript support

---

**Happy Coding! 🚀**
