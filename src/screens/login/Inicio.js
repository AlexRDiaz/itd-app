import React, { useState, useContext } from 'react';
import {
  Box,
  VStack,
  Button,
  Image,
  Modal,
  Text,
  Center,
  Pressable
} from 'native-base';
import { valorResponsivo, guardarDato } from '../../servicios/Omni';
import InicioLayout from '../../layouts/InicioLayout';
import Login from './Login';
import { AuthContext } from '../../navegacion/store';
import Perfil from '../perfil/Perfil';
import { openURL } from 'expo-linking';

export default function Inicio(props) {
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const { dispatch } = useContext(AuthContext);

    async function entrar(datos){
           await guardarDato('@usuariolabgo',datos.usuario)

           setMostrarLogin(false)
           console.log('datosusuario',datos.usuario)
           console.log('datoscookie',datos.cookie)

             if(datos.cookie===""){
               setMostrarPerfil(true);
               
           }else{
            await guardarDato('@cookielabgo',JSON.stringify(datos.cookie))
            dispatch({ type: 'SIGN_IN', token: datos.cookie });
           }
    }

    function registrarPerfil(cookie){
        dispatch({ type: 'SIGN_IN', token: cookie })
    }

    return (
        <>
        <InicioLayout>
            <Box
                w="100%"
                px={{
                    base: '4',
                    md: '20',
                }}
                py={valorResponsivo({
                    base: '9',
                    sm: '0',
                    md: '0',
                })}
                rounded={{ md: 'xl' }}
                >
                <Box
                    mb={valorResponsivo({
                        base: 16,
                        sm: 0,
                        md: 0,
                    })}
                    flexDirection={{
                        base: 'column',
                        md: 'row',
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image
                    size={valorResponsivo({
                        base: 210,
                        sm: 130,
                        md: 170
                    })}
                    resizeMode={'contain'}
                    alt="Roche"
                    source={require('../../assets/corazon.png')}
                    mb={{
                        base: '5',
                        sm: '0',
                    }}
                    />
                </Box>
                <VStack space={valorResponsivo({
                            base:'4',
                            sm:'2',
                            md: '2'
                        })}>
                    <Button
                    mx={valorResponsivo({
                        base:'10',
                        sm:'5'
                    })}
                    py="5"
                    onPress={() => {
                        setMostrarLogin(true);
                    }}
                    _text={{
                        color: 'white',
                        fontSize: 18
                    }}
                    _hover={{ bg: 'coolGray.200' }}
                    bg="#007ac2"
                    borderRadius= '30'
                    >
                    Entrar
                    </Button>
                    <Box
                        pt={valorResponsivo({
                            base:'10',
                            sm:'2',
                            md: '2'
                        })}
                        flexDirection={{
                        base: 'column',
                        md: 'row',
                        }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            size={valorResponsivo({
                                base: 290,
                            })}
                            resizeMode={'contain'}
                            alt="Roche"
                            source={require('../../assets/inicio-1.png')}
                        />
                    </Box>
                    <Center>
                        <Pressable onPress={()=>openURL('https://www.rochelabnews.com/ec/terminos-y-condiciones-de-uso-app-labgo/')}>
                            <Text color="#007ac2">
                                Términos y condiciones de uso
                            </Text>
                        </Pressable>
                    </Center>
                </VStack>
            </Box>
        </InicioLayout>
        <Modal 
            size="lg" 
            isOpen={mostrarLogin} onClose={() => setMostrarLogin(false)}>
            <Modal.Content maxWidth="400px" style={{borderRadius: 25, borderColor: "#007ac2", borderWidth: 2}}>
                <Modal.CloseButton />
                <Modal.Body>
                    <Login entrar={entrar}/>
                </Modal.Body>
            </Modal.Content>
        </Modal>
        <Modal 
            size="lg" 
            isOpen={mostrarPerfil} onClose={() => setMostrarPerfil(false)}>
            <Modal.Content maxWidth="400px" style={{borderRadius: 25, borderColor: "#007ac2", borderWidth: 2}}>
                <Modal.CloseButton />
                <Modal.Body>
                    <Text>
                        Por favor completa tus datos para continuar
                    </Text>
                    <Perfil registrar={registrarPerfil}/>
                </Modal.Body>
            </Modal.Content>
        </Modal>
        </>
    )
}