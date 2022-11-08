import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { api } from '../services/api';
import { HStack, useToast, VStack } from 'native-base';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolPros } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';


interface routeParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [pollDetails, setPollDetails] = useState<PoolPros>({} as PoolPros);
  const [optionSelected, setOptionSelected] = useState<'Guesses' | 'Ranking'>('Guesses')

  const toast = useToast();
  const route = useRoute();

  const { id } = route.params as routeParams

  async function fetchPollDetails() {
    try {
      setIsLoading(true)
      const poll = await api.get(`/polls/${id}`)
      setPollDetails(poll.data.poll)


    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão.',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code
    })
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id])


  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {
        pollDetails._count?.participants > 0 ?
          <VStack px={5} flex={1}>
            <PoolHeader data={pollDetails} />

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={optionSelected === 'Guesses'}
                onPress={() => setOptionSelected('Guesses')}
              />

              <Option
                title="Ranking do grupo"
                isSelected={optionSelected === 'Ranking'}
                onPress={() => setOptionSelected('Ranking')}
              />
            </HStack>

          </VStack>
          :
          <EmptyMyPoolList code={pollDetails.code} />
      }

    </VStack>
  )
}