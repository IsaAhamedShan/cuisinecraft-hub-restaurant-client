import React from "react";
import Sun from "./Sun.svg"; // Import Sun.svg as an image
import Moon from "./Moon.svg"; // Import Moon.svg as an image
import "./DarkMode.css";

const DarkMode = () => {
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'> {/* Use htmlFor instead of for */}
                <img src={Sun} alt="Sun" className="w[40px]" /> {/* Use the imported SVG files as images */}
                <img src={Moon} alt="Moon" className="w[40px]" /> {/* Use the imported SVG files as images */}
            </label>
        </div>
    );
};

export default DarkMode;
