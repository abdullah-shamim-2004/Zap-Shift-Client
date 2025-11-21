import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Covarage = () => {
  const position = [23.687639500000003, 90.351002];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-black ">
        We Are Available in <span >64 Districts</span>
      </h2>

      {/* Search Box */}
      <div className="flex justify-center">
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <label className="flex items-center gap-3 bg-gray-400 dark:bg-gray-800 border rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#caeb66] transition">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              name="location"
              placeholder="Search district..."
              className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-200"
            />
            <button
              type="submit"
              className="px-4 py-2 flex items-center gap-2 bg-[#caeb66] text-black rounded-xl font-medium hover:bg-green-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              Search
            </button>
          </label>
        </form>
      </div>

      {/* Map */}
      <div className="border rounded-xl overflow-hidden shadow-md w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Covarage;
