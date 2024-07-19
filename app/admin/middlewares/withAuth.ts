let isAuthenticated = false;

// Ajouté dans auth.services.js
export const setIsAuthenticated = (value: boolean) => {
  isAuthenticated = value;
};

export const getIsAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return isAuthenticated && !!token;
};

