import React from 'react';
import {
  Box,
  VStack,
  StatusBar,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function BusquedaLayout({
    backButton= false,
    ...props
  }){
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        translucent
        barStyle='dark-content'
        backgroundColor="transparent"
      />
      <Box
        safeAreaTop
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.900' }}
      />
      <VStack
        flex={1} bg="white"
      >
           {props.children}

      </VStack>
    </>
  );
}