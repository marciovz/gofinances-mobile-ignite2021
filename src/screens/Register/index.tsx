import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import { 
  Container,
  Header,
  Form,
  Fields,
  Title,
} from "./styles";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Title</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="Preço"
          />
        </Fields>

        <Button title="Enviar" />
      </Form>
      
    </Container>
  )
}