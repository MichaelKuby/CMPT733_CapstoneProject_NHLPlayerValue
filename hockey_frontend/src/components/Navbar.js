import React from 'react';

const NavBar = () => {
  const navStyle = {
    backgroundColor: 'navy', // This should be the color of your navbar background
    color: 'white', // This is the text color
    display: 'flex',
    justifyContent: 'space-evenly', // This spreads out the nav items evenly
    alignItems: 'center',
    padding: '10px', // Adjust padding as needed
    listStyle: 'none', // This removes bullet points from the list items
    height: '50px', // Adjust height as needed
  };

  const linkStyle = {
    textDecoration: 'none', // This removes underline from links
    color: 'white', // This sets the link text color
    fontSize: '18px', // Adjust font size as needed
  };

  return (
    <nav style={navStyle}>
      <a href="/playerStatsAll" style={linkStyle}>Home</a>
      <a href="/premium" style={linkStyle}>Teams</a>
      <a href="https://www.nhl.com" style={linkStyle}>Players</a>
    </nav>
  );
};

export default NavBar;
