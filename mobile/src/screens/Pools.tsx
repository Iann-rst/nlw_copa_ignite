import { useCallback, useEffect, useState } from "react";
import { VStack, Icon, FlatList, useToast } from "native-base";
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons';

import { api } from "../services/api";


import { Loading } from '../components/Loading';
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolPros, PoolCard } from "../components/PoolCard"
import { EmptyPoolList } from "../components/EmptyPoolList";


export function Pools() {
  const [polls, setPolls] = useState<PoolPros[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const navigation = useNavigation();

  //Função para buscar os bolões que o usuário participa
  async function fetchPolls() {
    try {
      setIsLoading(true)
      const response = await api.get('/polls');
      setPolls(response.data.polls);

    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível buscar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPolls();
  }, []));

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" size="md" color="black" />}
          onPress={() => navigation.navigate('find')}
        />
      </VStack>

      {
        isLoading ? <Loading /> :

          < FlatList
            data={polls}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <PoolCard data={item} />}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            ListEmptyComponent={<EmptyPoolList />}
          />

      }
    </VStack>
  )
}