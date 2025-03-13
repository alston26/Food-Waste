import React, { useState } from 'react';
import Header from '../components/Header';
import ListComponent from '../components/ListComponent';

const MainPage = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]); // Example list items

  // Function to modify the list (add, remove, etc.)
  const modifyList = () => {
    // Example modification
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <div>
      <Header title="Main Page" />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <h2>Welcome to the Main Page</h2>
        <p>This is the main page of our React app.</p>
        <ListComponent items={items} />
        <button onClick={modifyList}>Add Item</button>
      </div>
    </div>
  );
}

export default MainPage;
