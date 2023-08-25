import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook for accessing the UserContext
export function useUser() {
  return useContext(UserContext);
}

export default UserContext;