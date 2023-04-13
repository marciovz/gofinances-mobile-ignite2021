import { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeBotton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from "../CategorySelect";

import { 
  Container,
  Header,
  Form,
  Fields,
  Title,
  TransactionsTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOnpe] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOnpe(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOnpe(false);
  }

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

          <TransactionsTypes>
            <TransactionTypeBotton
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />

            <TransactionTypeBotton
              type="up"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />

        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
      
    </Container>
  )
}