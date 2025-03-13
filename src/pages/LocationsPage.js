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
    people: '',
  });

  const sampleLocations = [
    { name: 'King Hall', coords: [42.36935125414417, -72.51306479508955] },
    { name: 'Frost Library', coords: [42.371825118927525, -72.51699544261398] },
    // ... more locations ...
    { name: 'Seeley Mudd', coords: [42.36974472810023, -72.51628836758711] },
    { name: 'Webster', coords: [42.369793964774196, -72.51763511410714] },
    { name: 'Appleton', coords: [42.3702535052077, -72.51794889216279] },
    { name: 'South', coords: [42.37058379781472, -72.5181377143553] },
    { name: 'Science Center', coords: [42.37100061398313, -72.51329429368063] },
  ];
  
  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = ["Event Name", "Location", "Floor", "Food Description", "People", "Time Elapsed"];
    csvContent += headers.join(",") + "\r\n";
    posts.forEach(post => {
      const row = [
        post.eventName,
        post.location,
        post.floor,
        post.foodDescription,
        post.people || 'N/A',  // Assuming 'people' can be optional
        Math.min(Math.floor((Date.now() - post.timestamp) / 60000), 120) + " minutes"
      ];
      csvContent += row.join(",") + "\r\n";
    });
  
    // Create a link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "posts_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }
  

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
    setFormData({ eventName: '', location: '', foodDescription: '', people: ''});
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
      setFormData({ eventName: '', location: '', floor: '', foodDescription: '', people: ''});
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
      <div class="bg-white p-4" style={{ height: '700px' }}>
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
        placeholder="Floor/Room Number"
        value={formData.floor}
        onChange={handleInputChange}
        required
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />

      <textarea
        name="foodDescription"
        placeholder="Description"
        value={formData.foodDescription}
        onChange={handleInputChange}
        required
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />

      <input
        type="text"
        name="people"
        placeholder="Number of People (Optional: we are gathering data!)"
        value={formData.people}
        onChange={handleInputChange}
        class="w-full p-2 mb-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        class="mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Post
      </button>
    </form>

    <h1 class="text-xl mt-4 mb-4 font-semibold text-gray-700">Posted Events</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Event Name</th>
        <th scope="col" class="px-6 py-3">Location</th>
        <th scope="col" class="px-6 py-3">Floor</th>
        <th scope="col" class="px-6 py-3">Food Description</th>
        <th scope="col" class="px-6 py-3">Time Elapsed</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post, index) => (
        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {post.eventName}
          </th>
          <td class="px-6 py-4">
            {post.location}
          </td>
          <td class="px-6 py-4">
            {post.floor}
          </td>
          <td class="px-6 py-4">
            {post.foodDescription}
          </td>
          <td class="px-6 py-4">
            {Math.min(Math.floor((Date.now() - post.timestamp) / 60000), 120)} minutes
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<button onClick={exportToCSV} class="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none">
  Export to CSV
</button>
  </div>
</div>

    </div>
    </div>
  );
}

export default LocationsPage;
