import { createContext, ReactNode } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

//Cria contexto
export const AuthContext = createContext({} as AuthContextDataProps);


//Cria a função para prover o contexto
export function AuthContextProvider({ children }: AuthProviderProps) {

  async function signIn() {
    console.log("Vamos logar!")
  }

  return (
    <AuthContext.Provider value={{
      user: {
        name: 'Iann',
        avatarUrl: 'https://www.github.com/Iann-rst.png',
      },
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}