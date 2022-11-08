import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const { navigate } = useNavigation();

  const toast = useToast();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);
      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('/polls/join', { code });

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
      setCode('');
      navigate('polls');

    } catch (error) {
      console.log(error)
      setIsLoading(false);

      if (error.response.data.message === 'Poll not found.') {
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (error.response.data.message === 'You already joined this poll.') {
        return toast.show({
          title: 'Você ja está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header showBackButton title="Buscar por código" />

      <VStack mt={8} mx={5} alignItems="center">

        <Heading color="white" fontFamily="heading" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input mb={2} placeholder="Qual o código do bolão?" onChangeText={setCode} autoCapitalize="characters" />

        <Button title="buscar bolão" onPress={handleJoinPoll} />

      </VStack>
    </VStack>
  )
}