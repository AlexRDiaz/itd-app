import React from 'react';
import {
  Box,
  VStack,
  StatusBar,
  HStack,
  Icon,
  Image,
  useColorMode,
  IconButton,useColorModeValue
} from 'native-base';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { imagenSize } from '../servicios/Omni';

export function Header(props) {
    const navigation = useNavigation();
    var dims = imagenSize(500,180);
    const logo = require('../assets/corazon.png')
    return (
      <Box
        px="1"
        pt="2"
        _dark={{ bg: 'coolGray.900', borderBottomColor: 'coolGray.800' }}
        _light={{
          bg: { base: 'white' },
          borderBottomColor: '#007AC2',
        }}
        borderBottomWidth="1"
      >
        <VStack>
          <HStack space="2" justifyContent='space-between'>
                {props.backButton?(<HStack alignItems="center" space="1">
                    <IconButton
                      variant="ghost"
                      colorScheme={useColorMode()}
                      onPress={() => {
                          navigation.goBack();
                      }}
                      icon={
                        <Icon
                          size="6"
                          as={AntDesign}
                          name="arrowleft"
                          color={useColorModeValue("coolGray.700","coolGray.50")}
                        />
                      }
                    />
                </HStack>):(<HStack alignItems="center" space="1">
                    <IconButton
                      variant="ghost"
                      colorScheme={useColorMode()}
                      onPress={() => {
                            navigation.toggleDrawer()
                      }}
                      icon={
                        <Icon
                          size="6"
                          as={Octicons}
                          name="three-bars"
                          color={useColorModeValue("#007ac2","coolGray.50")}
                        />
                      }
                    />
                </HStack>)}
                <HStack space="2">
                    <HStack paddingLeft={3} justifyContent="flex-start"><Image
                        style={{width:dims.width, height:dims.height}} 
                        resizeMode="contain"
                        alt="Logo"
                        source={logo}
                        key="logoroche"
                    /></HStack>
                </HStack>
          </HStack>
        </VStack>
      </Box>
    );
}

function MainContent(props) {
    return (
      <VStack flex={1} width="100%">
        {props.children}
      </VStack>
    );
}

export default function DashboardLayout({
    backButton= false,
    ...props
  }){
  
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
        <KeyboardAwareScrollView
          contentContainerStyle={{ width: '100%', height: '100%' }}
        >
            <Header
              backButton={backButton}
            />

          <Box
            flex={1}
            safeAreaBottom
            flexDirection={{ base: 'column', md: 'row' }}
          >
              <MainContent {...props} />
          </Box>
        </KeyboardAwareScrollView>
      </VStack>
    </>
  );
}