import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/ui/Toaster';
import { Button } from '../components/ui/Button';
import { MapPin, Crosshair } from 'lucide-react';
import { mapboxgl, defaultMapOptions } from '../lib/mapbox';
import { ServiceFlow } from '../components/ServiceFlow';
import { LocationIndicator } from '../components/LocationIndicator';
import { getAddressFromCoordinates } from '../lib/geocoding';
import { debug } from '../lib/debug';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  lat: number;
  lng: number;
  address: string;
  type: 'pickup' | 'dropoff';
}

export default function LocationSelect() {
  const { serviceTypeId } = useParams<{ serviceTypeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [selectingDropoff, setSelectingDropoff] = useState(false);
  const [nearestDriver, setNearestDriver] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(true);
  const [showPriceModal, setShowPriceModal] = useState(false);

  useEffect(() => {
    // Fetch service type name
    const fetchServiceType = async () => {
      const { data } = await supabase
        .from('service_types')
        .select('name')
        .eq('id', serviceTypeId)
        .single();
      
      if (data) {
        setServiceType(data.name);
      }
    };
    
    fetchServiceType();
  }, [serviceTypeId]);

  const initializeLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: 'Getting your location',
        description: 'Please wait while we locate you...',
      });
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Locating address...',
            type: 'pickup' as const
          };
          setPickup(newLocation);
          initializeMap(newLocation);
          
          // Get address after map is initialized
          const address = await getAddressFromCoordinates(position.coords.longitude, position.coords.latitude);
          setPickup(prev => prev ? { ...prev, address } : null);
        },
        async () => {
          // Default to a central location if geolocation fails
          const defaultLocation = {
            lat: 40.7128,
            lng: -74.0060,
            address: 'Location access denied',
            type: 'pickup' as const
          };
          setPickup(defaultLocation);
          initializeMap(defaultLocation);
          toast({
            title: 'Location access denied',
            description: 'Using default location. Please enable location services for better accuracy.',
            variant: 'error'
          });
        }
      );
    }
  };

  const initializeMap = (initialLocation: { lat: number; lng: number }) => {
    if (!mapContainer.current) return;

    const createLocationMarker = (coords: [number, number]) => {
      const marker = new mapboxgl.Marker({
        color: '#4F46E5', // Indigo color
      })
        .setLngLat(coords)
        .addTo(map.current!);
      return marker;
    };

    try {
      debug.log('info', 'Initializing map', { location: initialLocation });
      
      // Remove existing map instance if it exists
      if (map.current) {
        map.current.remove();
      }

      map.current = new mapboxgl.Map({
        ...defaultMapOptions,
        container: mapContainer.current,
        center: [initialLocation.lng, initialLocation.lat],
        zoom: 15,
        dragRotate: false // Disable rotation for better UX
      });

      // Handle map load errors
      map.current.on('error', (e) => {
        debug.log('error', 'Mapbox map error', e);
        toast({
          title: 'Map error',
          description: 'There was an error loading the map. Please try refreshing the page.',
          variant: 'error'
        });
      });

      // Wait for map to load before adding marker
      map.current.on('load', () => {
        debug.log('info', 'Map loaded successfully');

        // Add user's location marker
        const userMarker = createLocationMarker([initialLocation.lng, initialLocation.lat]);

        // Add user location control
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true,
            showAccuracyCircle: false,
            showUserLocation: false
          }),
          'top-right'
        );

        // Update location and address when map moves
        map.current.on('moveend', async () => {
          if (map.current) {
            const center = map.current.getCenter();
            setAddressLoading(true);
            try {
              const locationType = selectingDropoff ? 'dropoff' : 'pickup';
              const address = await getAddressFromCoordinates(center.lng, center.lat);
              const newLocation = {
                lat: center.lat,
                lng: center.lng,
                address,
                type: locationType as 'pickup' | 'dropoff'
              };
              
              if (selectingDropoff) {
                setDropoff(newLocation);
                setShowPriceModal(true);
              } else {
                setPickup(newLocation);
              }
            } catch (error) {
              debug.log('error', 'Error getting address after map move', error);
              toast({
                title: 'Error getting address',
                description: 'Could not retrieve address for selected location',
                variant: 'error'
              });
            } finally {
              setAddressLoading(false);
            }
          }
        });

        // Add navigation controls
        const nav = new mapboxgl.NavigationControl({
          visualizePitch: true
        });
        map.current.addControl(nav, 'top-right');
      });
    } catch (error) {
      debug.log('error', 'Map initialization error', error);
      toast({
        title: 'Map error',
        description: 'Could not initialize the map. Please try refreshing the page.',
        variant: 'error'
      });
    }

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  };

  const centerOnUserLocation = () => {
    if (!map.current) return;

    toast({
      title: 'Getting your location',
      description: 'Please wait...'
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        if (selectingDropoff) {
          setDropoff({ ...newLocation, address: '', type: 'dropoff' });
        } else {
          setPickup({ ...newLocation, address: '', type: 'pickup' });
        }
        
        map.current?.flyTo({
          center: [newLocation.lng, newLocation.lat],
          zoom: 16,
          duration: 2000
        });

        toast({
          title: 'Location updated',
          variant: 'success'
        });
      },
      () => {
        toast({
          title: 'Location error',
          description: 'Could not get your current location',
          variant: 'error'
        });
      }
    );
  };

  const findNearestDriver = async (pickupLat: number, pickupLng: number) => {
    if (!pickup || !dropoff) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('find_nearest_driver', {
        pickup_lat: pickupLat,
        pickup_lng: pickupLng,
        service_type_id: serviceTypeId
      });

      if (error) throw error;
      if (data && data.length > 0) {
        setNearestDriver(data[0]);
        toast({
          title: 'Driver Found!',
          description: `${data[0].name} is ${data[0].distance.toFixed(1)}km away`,
          variant: 'success'
        });
      } else {
        toast({
          title: 'No drivers found',
          description: 'No available drivers in your area',
          variant: 'error'
        });
      }
    } catch (error) {
      toast({
        title: 'Error finding driver',
        description: 'Please try again',
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceLocationSubmit = (location: string) => {
    setShowServiceModal(false);
    initializeLocation();
  };

  const handlePriceAccept = async () => {
    setShowPriceModal(false);
    setLoading(true);
    await findNearestDriver(pickup?.lat || 0, pickup?.lng || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {showFlow && (
        <ServiceFlow
          serviceType={serviceType}
          onLocationSubmit={handleServiceLocationSubmit}
          onPriceAccept={handlePriceAccept}
          onClose={() => navigate('/services')}
        />
      )}
      <div className="relative h-[70vh]">
        <div 
          ref={mapContainer}
          className="w-full h-full rounded-lg overflow-hidden shadow-lg relative"
          style={{ opacity: map.current ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
        >
          {/* Fixed location indicator in the center */}
          <LocationIndicator />
        </div>
        <button
          onClick={centerOnUserLocation}
          className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50"
          title="Center on my location"
        >
          <Crosshair className="h-6 w-6 text-indigo-600" />
        </button>
      </div>

      <div className="max-w-md mx-auto -mt-20 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 relative z-10">
          <div className="text-center mb-6">
            <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">
              {selectingDropoff ? 'Set Dropoff Location' : 'Set Pickup Location'}
            </h1>
            <p className="text-gray-600 mt-2">Move the map to adjust the location</p>
          </div>

          {(pickup || dropoff) && (
            <div className="space-y-4">
              {pickup && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pickup location:</p>
                  <p className="font-medium mt-1">
                    {!selectingDropoff && addressLoading ? (
                      <span className="flex items-center">
                        <span className="animate-pulse">Loading address...</span>
                      </span>
                    ) : (
                      pickup.address
                    )}
                  </p>
                </div>
              )}
              
              {dropoff && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Dropoff location:</p>
                  <p className="font-medium mt-1">
                    {selectingDropoff && addressLoading ? (
                      <span className="flex items-center">
                        <span className="animate-pulse">Loading address...</span>
                      </span>
                    ) : (
                      dropoff.address
                    )}
                  </p>
                </div>
              )}

              {nearestDriver ? (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900">Driver Found!</h3>
                    <p className="text-green-700">
                      {nearestDriver.name} is {nearestDriver.distance.toFixed(1)}km away
                    </p>
                    <p className="text-green-700">
                      Estimated arrival: {nearestDriver.eta} minutes
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/chat/${nearestDriver.id}`)}
                  >
                    Confirm & Chat with Driver
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    if (!selectingDropoff) {
                      setSelectingDropoff(true);
                    }
                  }}
                >
                  {selectingDropoff ? 'Finding Driver...' : 'Set Dropoff Location'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}