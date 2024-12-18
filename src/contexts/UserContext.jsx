import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("jwt", JSON.stringify(userData.token));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use context
export function useAuth() {
  return useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

