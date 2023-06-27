import React from 'react'
import { Container, Text, Button, Heading } from 'native-base'

export default function InicioComponent({ navigation }) {
  return (
    <>
      <Container>
      <Heading>
          Guarda tus links de la maera mas rapida y facil con

          <Text color="emerald.500"> ComparteItd</Text>
        </Heading>
        <Text mt="3" fontWeight="medium">
         Podras almacenar tus links, videos, imagenes, paginas de redes sociales e internet.
        </Text>
      </Container>
      <Button  size="sm" variant="subtle" colorScheme="secondary"
          onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
      <Button
        size="sm" variant="subtle"
        onPress={() => navigation.navigate('Registro')}
      >
        Sign Up
      </Button>
    </>
  )
}