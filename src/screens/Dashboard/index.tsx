import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>

          <UserInfo>
            <Photo source={{ uri: 'http://github.com/marciovz.png'}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

    </Container>
  )
}
