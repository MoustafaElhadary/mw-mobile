import React, { useState, createContext } from 'react';
import firebase from 'firebase/app';


interface AppContextInterface {
  user: firebase.User | null;
  setUser: React.Dispatch<React.SetStateAction<firebase.User>>;
}

export const AuthenticatedUserContext = createContext<AppContextInterface | null>(null);

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};