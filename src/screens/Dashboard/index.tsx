import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

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
  HighlightCards,
  TransactionList,
  Transactions,
  Title,
  LogoutButton,
  LoadContainer,
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData)

  const theme = useTheme();

  function getLastTransactinDate(
    collection: DataListProps[],
    type: 'positive' | 'negative',  
  ) {
    const lastTransaction = new Date(
      Math.max.apply(Math, 
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    )

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long'})}`
    
    Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(new Date(lastTransaction));
  }

  async function loadTransactions() {
    setIsLoading(true);

    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));
    
      return {
        id: item.id,
        name: item.name,
        type: item.type,
        category: item.category,
        amount,
        date,
      }
    });

    const total = entriesTotal - expensiveTotal;

    const lastTransactionEntries = getLastTransactinDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactinDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpensives}`;

    setTransactions(transactionsFormatted);
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval,
      }
    })

    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[] ));

  return (
    <Container>
      
      {
        isLoading ? (
          <LoadContainer>
            <ActivityIndicator 
              color={theme.colors.primary} 
              size="large"  
            />
          </LoadContainer>
        ) : (
          <>
            <Header>
              <UserWrapper>

                <UserInfo>
                  <Photo source={{ uri: 'http://github.com/marciovz.png'}} />
                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Rodrigo</UserName>
                  </User>
                </UserInfo>

                <LogoutButton onPress={() => {}}>
                  <Icon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard 
                type="up"
                title="Entradas" 
                amount={highLightData?.entries?.amount}
                lastTransaction={highLightData.entries.lastTransaction}
              />

              <HighlightCard 
                type="down"
                title="Saídas" 
                amount={highLightData?.expensives?.amount}
                lastTransaction={highLightData.expensives.lastTransaction}
              />

              <HighlightCard 
                type="total"
                title="Total" 
                amount={highLightData?.total?.amount}
                lastTransaction={highLightData.total.lastTransaction}
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList 
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>
        )
      }
    </Container>
  )
}
