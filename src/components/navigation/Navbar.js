import React from 'react';
import { signOutUser } from '../../firebase'; // Adjust path based on your setup

const Navbar = () => {
    return (
        <nav>
            {/* Add links to your routes here. Assuming you'll use React Router, they'll be <Link> components */}
            <button onClick={signOutUser}>Sign Out</button>
        </nav>
    );
}

export default Navbar;
