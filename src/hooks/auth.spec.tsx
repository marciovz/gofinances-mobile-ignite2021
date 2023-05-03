import  { renderHook, act} from '@testing-library/react-native';
import { mocked } from 'jest-mock';
import { startAsync } from 'expo-auth-session';

import { AuthProvider, useAuth } from './auth';

const fakeUser = {
  id: 'mock_id',
  email: 'john.due@email.com',
  name: 'John Due',
  photo: 'john-due.png',
}

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(fakeUser),
})) as jest.Mock;

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getItem: jest.fn(),
  }
});

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  it('should be able to sign in with an existing Google account', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'success',
      params: {
        access_Token: 'google-token'
      }
    })

     const { result } = renderHook(() => useAuth(), { 
      wrapper: AuthProvider 
    });
    
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(fakeUser.email);
  });


  it('not should connect if cancel authentication with Google account', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
    })

    const { result } = renderHook(() => useAuth(), { 
      wrapper: AuthProvider 
    });
    
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');   
  });
});

