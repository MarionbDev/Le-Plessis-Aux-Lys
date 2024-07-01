let isAuthenticated = false;

// Ajouté dans auth.services.js
export const setIsAuthenticated = (value: boolean) => {
  isAuthenticated = value;
};

// Ajouté dans layout.jsx
export const getIsAuthenticated = () => {
  return isAuthenticated;
};

