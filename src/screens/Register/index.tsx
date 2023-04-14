import { useState } from "react";
import { Modal } from "react-native";
import { useForm } from 'react-hook-form';

import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
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

interface FormData {
  [name: string]: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOnpe] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOnpe(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOnpe(false);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data) ;
  }

  return (
    <Container>
      <Header>
        <Title>Title</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            name="name"
            control={control}
            placeholder="Nome"
          />

          <InputForm 
            name="amount"
            control={control}
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

        <Button 
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
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