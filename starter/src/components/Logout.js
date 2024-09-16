import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fakeAuthProvider from './fakeAuthProvider';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await fakeAuthProvider.logout(); // Call the logout method
        navigate('/login'); // Redirect to the login page
      } catch (error) {
        console.error('Logout failed', error);
        // Handle any errors that occur during logout
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
