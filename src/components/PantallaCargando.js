import React from "react"
import {
  Center,
  PresenceTransition,
  Spinner,
  HStack,
} from "native-base"

const PantallaCargando = ({visible}) => {

    return (
        <PresenceTransition
            visible={visible}
            initial={{
            opacity: 0,
            }}
            animate={{
            opacity: 1,
            transition: {
                duration: 250,
            },
            }}
        >
            <Center flex={1} px="3">
            <HStack space={2} alignItems="center">
                <Spinner accessibilityLabel="cargando" />
            </HStack>
            </Center>
        </PresenceTransition>
    )
}

export default PantallaCargando