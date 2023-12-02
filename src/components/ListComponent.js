// src/components/ListComponent.js

import React from 'react';

const ListComponent = ({ items }) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}

export default ListComponent;
