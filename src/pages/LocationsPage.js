import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';

import customPinImg from '../newmammothpointer.png';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: customPinImg,
  iconSize: [45,45], // Size of the icon
  iconAnchor: [34, 30], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

function LocationsPage() {
  // State for storing event posts
  const [posts, setPosts] = useState([]);

  // State for form inputs
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    floor: '',
    foodDescription: '',
  });

  const sampleLocations = [
    { name: 'King Hall', coords: [42.36935125414417, -72.51306479508955] },
    { name: 'Frost Library', coords: [42.371825118927525, -72.51699544261398] },
    // ... more locations ...
    { name: 'Seeley Mudd', coords: [42.36974472810023, -72.51628836758711] },
    { name: 'Webster', coords: [42.369793964774196, -72.51763511410714] },
    { name: 'Appleton', coords: [42.3702535052077, -72.51794889216279] },
    { name: 'South', coords: [42.37058379781472, -72.5181377143553] },
    { name: 'Science Centre', coords: [42.37100061398313, -72.51329429368063] },
  ];
  

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new post to posts array
    setPosts([...posts, formData]);
    // Reset form
    setFormData({ eventName: '', location: '', foodDescription: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedLocation = sampleLocations.find(loc => loc.name === formData.location);
    if (selectedLocation) {
      const newPost = {
        ...formData, 
        coords: selectedLocation.coords,
        timestamp: Date.now()  // Record the current time
      };
      setPosts([...posts, newPost]);
      setFormData({ eventName: '', location: '', floor: '', foodDescription: '' });
    } else {
      console.error("Location is not selected or invalid");
    }
  };

   // Update posts every second to refresh the stopwatch
   useEffect(() => {
    const interval = setInterval(() => {
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (Date.now() - post.timestamp < 2 * 3600 * 1000) {  // Less than 2 hours
            return { ...post };
          }
          return post;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <Header title="Main Page" />
      <div class="grid grid-cols-2">
      <div class="bg-white p-4" style={{ height: '400px' }}>
        <MapContainer center={[42.370953284987834, -72.51685520456492]} zoom={17} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {posts.map((post, index) => {
            return post.coords && (
              <Marker key={index} position={post.coords} icon={customIcon}>
                <Popup>
                  <strong>{post.eventName}</strong><br />
                  {post.foodDescription}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Right column - Form and Table */}
      <div class="bg-white p-4">
  {/* Form */}
  {/* ... existing form code here ... */}
  {/* Replace the location input with a select */}

  {/* ... rest of the form ... */}

  {/* Table/List of Posts */}
  <div>
    <h1 class="text-xl font-semibold text-gray-700">Food Leftover Posts</h1>
    <form onSubmit={handleFormSubmit} class="mt-4">
      <input
        type="text"
        name="eventName"
        placeholder="Event Name"
        value={formData.eventName}
        onChange={handleInputChange}
        required
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />

      {/* Replace the location text input with a select */}
      <select
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        required
        class="block w-full p-2 mb-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Select Location</option>
        {sampleLocations.map((loc, index) => (
          <option key={index} value={loc.name}>{loc.name}</option>
        ))}
      </select>

      <input
        type="text"
        name="floor"
        placeholder="Floor"
        value={formData.floor}
        onChange={handleInputChange}
        required
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />

      <textarea
        name="foodDescription"
        placeholder="Food Description"
        value={formData.foodDescription}
        onChange={handleInputChange}
        required
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Post
      </button>
    </form>

    <h2 class="mt-6 text-lg font-semibold text-gray-700">Posted Events</h2>
    <ul class="list-disc pl-5 mt-2">
      {posts.map((post, index) => (
        <li key={index} class="mt-1">
          <strong>{post.eventName}</strong> at {post.location} Floor: {post.floor} - {post.foodDescription}
          <br />
          <span class="text-sm text-gray-600">
            Time Elapsed: {Math.min(Math.floor((Date.now() - post.timestamp) / 60000), 120)} minutes
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>

    </div>
    </div>
  );
}

export default LocationsPage;
