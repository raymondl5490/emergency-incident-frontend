import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CENTER_LOCATION = [37.541885, -77.440624]; // Richmond, VA

const Map = () => {

  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/enriched-incidents')
      .then((response) => response.json())
      .then((data) => setIncidentData(data))
      .catch((error) => console.error('Error fetching incident data: ', error));
  }, [])

  return (
    <MapContainer center={CENTER_LOCATION} zoom={13} style={{ height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        incidentData.map((incident) => {
          const { incident_number, comments, event_opened, event_id, type } = incident.description;
          const { latitude, longitude, address_line1, city, state } = incident.address;
          const { temp, rhum, wspd, pres } = incident.weather;
          return <Marker key={incident_number} position={[latitude, longitude]}>
            <Popup>
              Address: {address_line1}
              <br />
              Event Opened: {event_opened}
              <br />
              Event ID: {event_id}
              <br />
              Type: {type}
              <br />
              Climate:
              <br />
              Air Temperature: {temp} °C,
              <br />
              Humidity: {rhum} %,
              <br />
              Wind Speed: {wspd} km/h,
              <br />
              Air pressure: {pres} hPa
            </Popup>
          </Marker>
        })
      }
    </MapContainer>
  );
};

export default Map;
