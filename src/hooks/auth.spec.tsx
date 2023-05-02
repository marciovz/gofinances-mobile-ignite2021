import  { renderHook, act} from '@testing-library/react-native';

import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_Token: 'google-token'
        }
      }
    }
  }
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getItem: jest.fn(),
  }
});

describe('Auth Hook', () => {
  it('should be able to sign in with an existing Google account', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: `userInfo.id`,
        email: `userInfo.email`,
        name: `userInfo.given_name`,
        photo: `userInfo.picture`,
        locale: `userInfo.locale`,
        verified_email: `userInfo.verified_email`
      })
    })) as jest.Mock;

    const { result } = renderHook(() => useAuth(), { 
      wrapper: AuthProvider 
    });
    
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
    
  });
});

