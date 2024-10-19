import React, { useState, useEffect } from 'react';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const fetchUserInfo = async () => {
    const loggedInUserEmail = localStorage.getItem('userEmail');
    if (!loggedInUserEmail) {
      console.error('User email not found in localStorage');
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`https://portal-lvi4.onrender.com/user-info/${loggedInUserEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const data = await response.json();
      console.log("🚀 ~ fetchUserInfo ~ data:", data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center mt-28">
      <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
    </div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-20">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">User Information</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">First Name:</label>
          <input
            type="text"
            name="firstname"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:border-blue-500"
            value={user?.firstName || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
          <input
            type="text"
            name="lastname"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:border-blue-500"
            value={user?.lastName || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:border-blue-500"
            value={user?.email || ''}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:border-blue-500"
            value={user?.phoneNumber || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
