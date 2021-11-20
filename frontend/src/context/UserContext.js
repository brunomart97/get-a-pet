import { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function UseProvider({children}) {
  const { register, authenticate, logout, login } = useAuth();

  return(
    <Context.Provider value={{ register, authenticate, logout, login }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UseProvider };