import React, { useState, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
const apiKey = 'AIzaSyCorstFp2YUZ7n4oNIZcteSKMHhbUiqftU';
const MapComponent = () => {
  const [center, setCenter] = useState({ lat: 25.021815462501728, lng: 121.53512692448075 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("無法獲取您的位置。使用預設位置。");
          setLoading(false);
        }
      );
    } else {
      setError("您的瀏覽器不支持地理定位。使用預設位置。");
      setLoading(false);
    }
  }, []);

  const handleCameraChange = (ev) => {
    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom);
  };

  if (loading) return <div>正在載入地圖...</div>;

  return (
    <APIProvider apiKey={apiKey}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ width: '100%', height: '400px' }}>
        <Map
          defaultZoom={13}
          center={center}
          onCameraChanged={handleCameraChange}
        />
      </div>
    </APIProvider>
  );
};

export default MapComponent;