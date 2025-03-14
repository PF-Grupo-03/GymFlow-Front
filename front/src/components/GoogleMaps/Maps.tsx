"use client";
import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

interface Location {
  lat: number;
  lng: number;
}

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const defaultLocation: Location = { lat: -34.587994, lng: -58.410568 };
  const [currentLocation] = useState<Location>(defaultLocation);
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <div style={{ width: "90%", maxWidth: "500px", height: "300px" }}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "10px" }}
          center={currentLocation}
          zoom={12}
        >
          <Marker position={currentLocation} onClick={() => setShowInfoWindow(true)} />

          {showInfoWindow && (
            <InfoWindow position={currentLocation} onCloseClick={() => setShowInfoWindow(false)}>
              <div>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>GymFlow</h3>
                <p style={{ margin: 0, fontSize: "12px" }}>Gimnasio en Buenos Aires</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
