import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>User is not authenticated</div>;
  }

  console.log("User object:", user); // Debugging
  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <img src={user?.picture} alt="User Profile" />
    </div>
  );
};

export default UserProfile;