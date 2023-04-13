import { Input } from "../../components/Form/Input";

import { 
  Container,
  Header,
  Form,
  Title,
} from "./styles";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Title</Title>
      </Header>

      <Form>
        <Input 
          placeholder="Nome"
        />

        <Input 
          placeholder="Preço"
        />
      </Form>
      
    </Container>
  )
}