import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the NewProjectContext
const NewProjectContext = createContext();

// Custom hook for accessing the NewProjectContext
export function useNewProject() {
  return useContext(NewProjectContext);
}

export default NewProjectContext;