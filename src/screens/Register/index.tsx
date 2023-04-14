import { useState } from "react";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert, 
} from "react-native";

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

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOnpe] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  });

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
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

  function handleRegister(form: FormData) {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data) ;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors?.name.message}
            />

            <InputForm 
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors?.amount.message}
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
    </TouchableWithoutFeedback>
  )
}