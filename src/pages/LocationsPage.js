import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';

import customPinImg from '../icon.jpeg';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: customPinImg,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
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
        <select name="location" value={formData.location} onChange={handleInputChange} required>
          <option value="">Select Location</option>
          {sampleLocations.map((loc, index) => (
            <option key={index} value={loc.name}>{loc.name}</option>
          ))}
        </select>
        {/* ... rest of the form ... */}

        {/* Table/List of Posts */}
        {/* ... existing list/table code here ... */}
        <div>
          <h1>Food Leftover Posts</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="floor"
              placeholder="Floor"
              value={formData.floor}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="foodDescription"
              placeholder="Food Description"
              value={formData.foodDescription}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Post</button>
          </form>

          <h2>Posted Events</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <strong>{post.eventName}</strong> at {post.location} Floor: {post.floor} - {post.foodDescription}
                <br />
                Time Elapsed: {Math.min(Math.floor((Date.now() - post.timestamp) / 60000), 120)} minutes
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
