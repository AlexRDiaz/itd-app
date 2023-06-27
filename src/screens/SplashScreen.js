import React from 'react';
import {
  Box,
  Image,
  StatusBar,
  Center,
  Stack,
} from 'native-base';
export default function SplashScreen(){
    return (
        <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box safeAreaTop />
      <Center my="auto" flex="1" p={{ md: 8 }}>
        <Stack
          flexDirection={{ base: 'column', md: 'row' }}
          w="100%"
          maxW={{ md: '1016px' }}
          flex={{ base: '1', md: undefined }}
        >
          <Center w="100%" flex={1}>
            <Box
              maxW="500"
              w="100%"
              px={{
                base: '4',
                md: '20',
              }}
              py={{
                base: '8',
                md: '32',
              }}
              rounded={{ md: 'xl' }}
            >
              <Box
                mb={{
                  base: '10',
                  md: '16',
                }}
                flexDirection={{
                  base: 'column',
                  md: 'row',
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  size={{ base: '210', md: '16' }}
                  resizeMode={'contain'}
                  alt="Roche"
                  source={require('../assets/corazon.png')}
                  mb={{
                    base: '5',
                    sm: '0',
                }}
                />
              </Box>
            </Box>
          </Center>
        </Stack>
      </Center>
    </>
    )
}