import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';


test('checks if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />);

  const inputName = getByTestId('input-name');
  const inputSurname = getByTestId('input-surname');

  expect(inputName.props.value).toEqual('Rodrigo');
  expect(inputSurname.props.value).toEqual('Gonçalves');
})

test('checks if title render correctly', () => {
  const { getByTestId } = render(<Profile />);

  const textTitle = getByTestId('text-title');

  expect(textTitle.props.children).toContain('Perfil');

});

test('check if show correctly user input name placeholder', async () => {
  const { getByPlaceholderText } = render(<Profile />)

  const inputName = getByPlaceholderText('Nome');

  expect(inputName).toBeTruthy();
  expect(inputName.props.placeholder).toBeTruthy();
  expect(inputName.props.placeholder).toBe('Nome');

});
