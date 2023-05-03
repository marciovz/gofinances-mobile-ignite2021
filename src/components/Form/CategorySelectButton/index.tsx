import { Container, Category, Icon } from "./styles";
import { RectButtonProps } from 'react-native-gesture-handler';


interface Props extends RectButtonProps{
  title: string;
  onPress: () => void;
}


export function CategorySelectButton({ title, testID, onPress }: Props) {
  return(
    <Container testID={testID} onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />

    </Container>
  )
}