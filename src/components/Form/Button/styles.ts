import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 18px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;

  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.shape};

`;
