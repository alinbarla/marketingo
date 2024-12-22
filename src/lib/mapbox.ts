import mapboxgl from 'mapbox-gl';
import { debug } from './debug';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxpbmJhcmxhIiwiYSI6ImNtNHo2YXptOTBwNHUyanE2NmxhZmxpYXgifQ.O8CtH6zJivhvUly0LlaCNg';

if (!MAPBOX_TOKEN) {
  debug.log('error', 'Mapbox token not found in environment variables');
  throw new Error('Mapbox token is required');
}

// Configure Mapbox
mapboxgl.accessToken = MAPBOX_TOKEN;

// Configure default map options
const defaultMapOptions: Partial<mapboxgl.MapOptions> = {
  style: 'mapbox://styles/mapbox/streets-v12',
  attributionControl: true,
  trackResize: true,
  cooperativeGestures: true,
  preserveDrawingBuffer: true
};

export { mapboxgl, defaultMapOptions };