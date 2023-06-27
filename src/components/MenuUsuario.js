import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
  Heading,
  Center,
  Image
} from 'native-base';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, AntDesign, Fontisto } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { cerrarSesion, guardarDato, obtenerDato, valorResponsivo, borrarDato } from "../servicios/Omni";
import { openURL } from 'expo-linking';
// import Config from "../comun/Config";
import { AuthContext } from '../navegacion/store';

async function cerrarSesionTotal(){
  await cerrarSesion();
}

const NavigationItem = ({ label, name, index, navegacion, seleccionado, ...props }) => {
  
  const navegar = async () => {
    await guardarDato('@especialidadLabgo',name)
    await guardarDato('@especialidadmenuLabgo',label)
    navegacion(label);
  }

  return (
      <Pressable
        px={valorResponsivo(
          {
            base:'5',
            sm:'2',
            md: '2',
          }
        )}
        py={valorResponsivo(
          {
            base:'2',
            sm:'1',
            md: '1',
          }
        )}
        rounded="md"
        onPress={() => {
          navegar()
        }}
      >
        <HStack space="2" alignItems="center">
          <Text
            fontWeight={label === seleccionado ? 'bold' : 'medium'}
            color={label===seleccionado?'#007ac2':'black'}
            fontSize="15"
          >
            {label}
          </Text>
          {props.children}
        </HStack>
      </Pressable>
  );
} 

const MenuUsuario = (props) => {
  const [seleccionado, setSeleccionado] = useState(props.seleccionado)
  const { dispatch } = useContext(AuthContext);

  const navegacion = (label) => {
    setSeleccionado(label)
    props.navigation.navigate("principal",{especialidad: label});
  }

  const navegarTodos = async () => {
    await borrarDato('@especialidadLabgo')
    await borrarDato('@especialidadmenuLabgo')
    setSeleccionado(null)
    props.navigation.navigate("principal");
  }

    useEffect(()=>{
      (async () => {
        const seleccion = await obtenerDato('@especialidadmenuLabgo')
        setSeleccionado(seleccion)
      })();
    },[])

    return(
        <DrawerContentScrollView
            contentContainerStyle={{
                paddingTop: 80,
                width: '100%',
                flex: 1,
            }}
            {...props}
            >
            <Box pt="1" _light={{ bg: '#007ac2' }} _dark={{ bg: 'coolGray.900' }} />
            <Box
                justifyContent={{ base: 'flex-start', md: 'space-between' }}
                _light={{ bg: 'white' }}
                _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
                flexGrow={1}
            >
                <VStack mt={valorResponsivo(
                    {
                      base:'4',
                      sm:'2',
                      md: '2',
                    }
                  )}>
                  <Center>
                    <Heading size="sm">
                        AJUSTES
                    </Heading>
                  </Center>
                  <Pressable onPress={()=>navegarTodos()}>
                    <HStack px="5" py={valorResponsivo(
                      {
                        base:'5',
                        sm:'3',
                        md: '3',
                      }
                    )} space="1" >
                      <Image
                        alt="homeimage"
                        source={require('../assets/home.png')}
                        resizeMode="contain"
                      />
                      <Text color="#007ac2" pt="1" px="2" fontSize="lg" fontWeight="700">
                        Especialidad
                      </Text>
                    </HStack>
                  </Pressable>
                  
                  <VStack alignItems="flex-end" marginRight="5">
                    <NavigationItem label="Cardiólogos" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="0" {...props}>
                      <Icon size="4"
                        as={FontAwesome}
                        name="heartbeat"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Endocrinólogos" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="1" {...props}>
                      <Icon size="4"
                        as={AntDesign}
                        name="user"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Emergenciólogos" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="2" {...props}>
                      <Icon size="4"
                        as={AntDesign}
                        name="man"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Intensivistas" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="3" {...props}>
                      <Icon size="4"
                        as={Fontisto}
                        name="heartbeat"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Internistas" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="4" {...props}>
                      <Icon size="4"
                        as={AntDesign}
                        name="fork"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Oncología" name="Oncología,Ginecología" navegacion={navegacion} seleccionado={seleccionado} index="5" {...props}>
                      <Icon size="4"
                        as={FontAwesome5}
                        name="ribbon"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Anesteciólogos" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="6" {...props}>
                      <Icon size="4"
                        as={FontAwesome}
                        name="tags"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Nefrólogos" name="Cardiología" navegacion={navegacion} seleccionado={seleccionado} index="7" {...props}>
                      <Icon size="4"
                        as={MaterialCommunityIcons}
                        name="shield-check"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Ginecólogos" name="Ginecología" navegacion={navegacion} seleccionado={seleccionado} index="8" {...props}>
                      <Icon size="4"
                        as={AntDesign}
                        name="star"
                        color="#007ac2" />
                    </NavigationItem>
                    <NavigationItem label="Obstetras" name="Ginecología" navegacion={navegacion} seleccionado={seleccionado} index="9" {...props}>
                      <Icon size="4"
                        as={AntDesign}
                        name="dingding-o"
                        color="#007ac2" />
                    </NavigationItem>
                  </VStack>
                </VStack>
                <Box marginTop="auto" marginBottom={2} safeAreaBottom>
                  <Pressable
                    px="5"
                    py={valorResponsivo(
                      {
                        base:'5',
                        sm:'2',
                        md: '2',
                      }
                    )}
                    rounded="md"
                    onPress={() => {
                        props.navigation.navigate('perfil');
                    }}
                  >
                    <HStack space="2" alignItems="center">
                      <Icon
                        size="7"
                        as={MaterialCommunityIcons}
                        name="account"
                        color="#007ac2"
                      />
                      <Text fontSize="lg" fontWeight="bold" color="#007ac2">
                        Ajustes de perfil
                      </Text>
                    </HStack>
                  </Pressable>
                  <Pressable
                    bg="#007ac2"
                    marginRight="7"
                    borderRightRadius="15"
                    onPress={() => {
                      // openURL(Config.datosPais[Config.pais].urlNews)
                    }}
                  >
                    <HStack space="2" justifyContent='center' p="4">
                      <Icon
                        size="8"
                        as={MaterialCommunityIcons}
                        name="newspaper-variant-multiple"
                        color="white"
                      />
                      <Text fontSize="md" fontWeight="600" color="white">
                        DIAGNOSTICSNEWS
                      </Text>
                    </HStack>
                  </Pressable>
                <Divider mt={valorResponsivo(
                  {
                    base:'10',
                    sm:'5',
                    md: '5',
                  }
                )} my="2" _dark={{ bgColor: 'coolGray.500' }} />
                  <Center>
                    <Pressable
                        px="5"
                        py="4"
                        rounded="md"
                        onPress={() => {
                            cerrarSesionTotal();
                            dispatch({ type: 'SIGN_OUT' })
                        }}
                      >
                        <HStack space="2" alignItems="center">
                          <Icon
                            size="5"
                            as={MaterialCommunityIcons}
                            name="door-closed"
                            color="red.400"
                          />
                          <Text fontWeight="bold" color="red.400">
                            Cerrar sesion
                          </Text>
                        </HStack>
                      </Pressable>
                  </Center>
                </Box>
            </Box>
        </DrawerContentScrollView>
    )
}

export default MenuUsuario