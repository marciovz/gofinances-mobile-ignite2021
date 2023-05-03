import { ReactNode } from 'react';
import  { render, fireEvent } from '@testing-library/react-native';

import { Register } from './';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

interface Props {
  children: ReactNode;
}

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    removeItem: jest.fn(),
    getItem: jest.fn(),
  }
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  }
})

const Providers = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Register Screen', () => {
  it('should be open category modal when user click button', () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);
    
    expect(categoryModal.props.visible).toBeTruthy();
  })
});