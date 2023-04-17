import { ReactNode, createContext, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { Alert } from 'react-native';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const { CLIENT_ID, REDIRECT_URI } = process.env;

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    try {
        // burlando o bug do auth google
        setUser({
          id: '125684455124514546454',
          email: 'lico@email.com',
          name: 'Lico',
          photo: 'https://github.com/marciovz.png',
        })

        return

      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;

      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        console.log(userInfo);

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        })
      } else {

        console.log(type);
        Alert.alert('Ops, houve um problema no google');
      }
      
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
    }}>
    { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {AuthProvider, useAuth }