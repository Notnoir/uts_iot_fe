# Sensor Data Dashboard - Frontend

Next.js frontend dengan TypeScript untuk parsing dan menampilkan data sensor dari backend API.

## 🚀 Quick Start

1. **Install dependencies** (sudah dilakukan):

```powershell
npm install
```

2. **Konfigurasi environment**:
   File `.env.local` sudah dibuat dengan konfigurasi:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

3. **Jalankan development server**:

```powershell
npm run dev
```

4. **Akses aplikasi**: [http://localhost:3001](http://localhost:3001)

## 📋 Fitur

✅ **Dashboard Real-time** - Menampilkan data sensor secara real-time  
✅ **Auto-refresh** - Data otomatis refresh setiap 30 detik  
✅ **Manual Refresh** - Tombol refresh untuk update manual  
✅ **Statistik Summary** - Max, min, rata-rata suhu & max humidity  
✅ **Tabel Data** - Detail record dengan highlighting  
✅ **Month-Year Display** - Tampilan periode bulan-tahun  
✅ **Responsive Design** - Mobile-friendly  
✅ **Loading States** - Indikator loading yang jelas  
✅ **Error Handling** - Penanganan error dengan retry  
✅ **Type-safe** - Full TypeScript support

## 📁 Struktur Project

```
frontend/
├── app/
│   ├── api/
│   │   └── sensor/
│   │       └── route.ts          # Proxy API route
│   ├── components/
│   │   └── SensorDashboard.tsx   # Main dashboard component
│   ├── types/
│   │   └── sensor.ts             # TypeScript type definitions
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── .env.local                     # Environment variables
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

## 🎨 Komponen UI

### SensorDashboard

Komponen utama yang menampilkan:

- **Summary Cards**: 4 kartu statistik dengan warna gradient
  - Max Temperature (merah)
  - Min Temperature (biru)
  - Avg Temperature (hijau)
  - Max Humidity (ungu)
- **Data Table**: Tabel responsif dengan kolom:

  - ID
  - Temperature (dengan highlight untuk nilai max)
  - Humidity (dengan highlight untuk nilai max)
  - Brightness
  - Timestamp (format lokal)

- **Month-Year Tags**: Pill-style tags untuk periode data

## 🔌 API Integration

### Frontend API Route

- **Endpoint**: `/api/sensor`
- **Method**: GET
- **Response**: JSON data dari backend

### Backend Connection

- **URL**: `http://localhost:3000/api/sensor/summary`
- **CORS**: Enabled di backend

## 🎯 Type Definitions

```typescript
interface SensorRecord {
  idx: number;
  suhu: number;
  humid: number;
  kecerahan: number;
  timestamp: string;
}

interface SensorData {
  suhumax: number;
  suhumin: number;
  suhurata: number;
  humidmax: number;
  nilai_suhu_max_humid_max: SensorRecord[];
  month_year_max: MonthYear[];
}
```

## 🛠️ Scripts

```powershell
# Development (port 3001)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 🎨 Styling

Menggunakan **Tailwind CSS** dengan konfigurasi custom:

- Gradient backgrounds
- Hover effects
- Responsive breakpoints
- Custom color palette
- Shadow utilities

## 🔄 Data Flow

1. User membuka dashboard
2. `SensorDashboard` component fetch data dari `/api/sensor`
3. Frontend API route proxy request ke backend
4. Backend query database dan return JSON
5. Frontend parse dan display data
6. Auto-refresh setiap 30 detik

## 📱 Responsive Design

- **Mobile** (< 640px): Single column layout
- **Tablet** (640px - 1024px): 2 column grid
- **Desktop** (> 1024px): 4 column grid

## 🐛 Debugging

### Check if backend is running

```powershell
curl http://localhost:3000/api/sensor/summary
```

### Check frontend logs

Buka DevTools Console di browser untuk melihat error logs

### Common Issues

**Data tidak muncul:**

- Pastikan backend berjalan di port 3000
- Cek `.env.local` konfigurasi
- Periksa CORS settings di backend

**Build errors:**

- Jalankan `npm install` ulang
- Delete folder `.next` dan build ulang

## 🚀 Deployment

### Vercel (Recommended)

```powershell
npm run build
vercel --prod
```

### Manual Deployment

```powershell
npm run build
npm start
```

Set environment variable:

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

## 📚 Technologies

- **Next.js 16**: React framework dengan App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features
- **Turbopack**: Fast bundler untuk development

## 🤝 Development Tips

1. **Hot Reload**: Perubahan code otomatis ter-reload
2. **Type Checking**: TypeScript akan warning jika ada type error
3. **ESLint**: Code linting untuk code quality
4. **Auto-format**: Gunakan Prettier untuk formatting

---

**Status**: ✅ Ready untuk development dan testing  
**Port**: 3001  
**Backend**: http://localhost:3000  
**Docs**: [Next.js Documentation](https://nextjs.org/docs)
