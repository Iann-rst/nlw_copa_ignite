import { VStack, Icon } from "native-base";
import { useNavigation } from '@react-navigation/native'

import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { Octicons } from '@expo/vector-icons';

export function Pools() {
  const navigation = useNavigation();
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
    </VStack>
  )
}