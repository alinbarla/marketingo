import { mapboxgl } from './mapbox';
import { debug } from './debug';

const GEOCODING_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export async function getAddressFromCoordinates(lng: number, lat: number): Promise<string> {
  try {
    debug.log('info', 'Fetching address for coordinates', { lng, lat });
    
    const response = await fetch(
      `${GEOCODING_API_URL}/${lng},${lat}.json?${new URLSearchParams({
        access_token: mapboxgl.accessToken,
        types: 'address,place',
        limit: '1'
      }).toString()}`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      debug.log('error', 'Geocoding API error', { 
        status: response.status, 
        statusText: response.statusText,
        error: errorText 
      });
      throw new Error('Could not retrieve address');
    }
    
    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      debug.log('warn', 'No address found for coordinates', { lng, lat });
      return 'Address not found';
    }
    
    // Get the most relevant feature
    const feature = data.features[0];
    
    // Get the full street address or place name
    const address = feature.place_type.includes('address') 
      ? feature.place_name.split(',')[0]  // Use just the street address
      : feature.place_name;  // Use the full place name for non-address results
    
    debug.log('info', 'Address found successfully');
    return address;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    debug.log('error', 'Geocoding error', { error: errorMessage });
    return 'Address not found';
  }
}