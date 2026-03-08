import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import process from 'process';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Google Maps API Key from .env.local
const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

app.get('/api/hospitals', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  // Check if we have a valid Google Maps API Key
  const hasGoogleKey = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'your-google-maps-api-key';

  if (hasGoogleKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json() as any;

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error('Google API Error:', data);
        return res.status(500).json({ error: data.error_message || 'Error from Google Maps API' });
      }

      return res.json(data);
    } catch (err) {
      console.error('Google Fetch Error:', err);
      // Fallback to OSM if Google fails
    }
  }

  // Fallback: Use OpenStreetMap Nominatim API (Free, no key required)
  console.log('Using OpenStreetMap Nominatim fallback...');
  try {
    // Search for hospitals in a bounding box around the coordinates
    const delta = 0.1; // roughly 10km
    const minLat = parseFloat(lat as string) - delta;
    const maxLat = parseFloat(lat as string) + delta;
    const minLng = parseFloat(lng as string) - delta;
    const maxLng = parseFloat(lng as string) + delta;

    const url = `https://nominatim.openstreetmap.org/search?amenity=hospital&format=json&viewbox=${minLng},${minLat},${maxLng},${maxLat}&bounded=1&limit=10`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ASHA-AI-Health-Assistant/1.0'
      }
    });
    const osmData = await response.json() as any[];

    // Map OSM data to Google Places format for the frontend
    const results = osmData.map((item: any) => ({
      place_id: item.place_id.toString(),
      name: item.display_name.split(',')[0],
      types: ['hospital'],
      geometry: {
        location: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon)
        }
      },
      vicinity: item.display_name,
      opening_hours: { open_now: true } // OSM doesn't always provide this easily, default to true
    }));

    res.json({ results });
  } catch (err) {
    console.error('OSM Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch hospital data from both Google and OSM' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'your-google-maps-api-key') {
    console.warn('WARNING: VITE_GOOGLE_MAPS_API_KEY is not set in .env.local!');
  }
});
