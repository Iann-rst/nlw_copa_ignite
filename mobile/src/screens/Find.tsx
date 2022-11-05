import { Heading, Text, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header showBackButton title="Buscar por código" />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading color="white" fontFamily="heading" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>
        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button title="buscar bolão" />
      </VStack>
    </VStack>
  )
}