import { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function UseProvider({children}) {
  const { register, authenticate, logout } = useAuth();

  return(
    <Context.Provider value={{ register, authenticate, logout }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UseProvider };