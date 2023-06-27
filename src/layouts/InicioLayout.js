import React from 'react';
import {
  Box,
  StatusBar,
  Center,
  Stack,
} from 'native-base';

export default function InicioLayout(props) {
    return (
        <>
        <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
        />
        <Box safeAreaTop  />
        <Center my="auto"  flex="1" p={{ md: 8 }}>
            <Stack
            flexDirection={{ base: 'column', md: 'row' }}
            w="100%"
            flex={{ base: '1', md: undefined }}
            >
                {props.children}
            </Stack>
        </Center>
    </>
    )
}