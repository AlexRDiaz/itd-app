import React from 'react';
import {
  VStack,
  Icon,
  Box,
  Pressable,
  Button,
  HStack,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = (props) => {
  const navigation = useNavigation();

  return (
    <VStack zIndex={1} 
      position="absolute" width="100%" alignContent="flex-start">
        <Button 
          justifyContent="flex-start"
          variant="unstyled"
          onPress={() => {navigation.navigate('busqueda')}}
          top="3"
          left="7"
          width="80%"
          bg="white" py="2"
          borderRadius="30" borderColor="coolGray.400" borderWidth={1}
          leftIcon={<Icon
            ml="2"
            size="5"
            color="gray.500"
            as={<Ionicons name="ios-search" />}
        />} >
         
        </Button>    
    </VStack>
  );
}

export default SearchBar