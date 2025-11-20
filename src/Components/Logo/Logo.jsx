import React from 'react';
import logo from "../../assets/logo.png"

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="Logo" />
            <h3 className="text-3xl font-bold -mx-2">ZapShift</h3>
        </div>
    );
};

export default Logo;