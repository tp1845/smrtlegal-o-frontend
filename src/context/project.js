import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const ProjectContext = createContext();

// Custom hook for accessing the UserContext
export function useProject() {
  return useContext(ProjectContext);
}

export default ProjectContext;