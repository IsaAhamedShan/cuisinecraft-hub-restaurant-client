import React from 'react';
import { useLocation } from 'react-router-dom';

const UpdateItem = () => {
    const location = useLocation();
    const { state: { itemData } } = location;
    console.log(location)
    return (
        <div>
            <h1>update item</h1>
        </div>
    );
};

export default UpdateItem;