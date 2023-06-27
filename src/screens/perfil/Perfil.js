import React, { useState, useEffect } from 'react';
import { guardarDato, obtenerDato, valorResponsivo } from "../../servicios/Omni";
import AdminServiciosAPI from '../../servicios/AdminServicios';
import {
    Icon,
    VStack,
    Select,
    Button,
    useToast
  } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInput from '../../components/FloatingLabelInput';
// import Config from '../../comun/Config';

export default function Perfil({registrar}){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [pais, setPais] = useState('');
    const [celular, setCelular] = useState('');
    const [usuario, setUsuario] = useState('');
    const [guardando, setGuardando] = useState(false);
    const toast = useToast();
    
    const guardar = async () => {
        setGuardando(true)
        const response = await AdminServiciosAPI.putRegistro('usuario',{usuario: usuario,datos:{nombre:nombre,apellido:apellido,celular:celular,pais:pais}});
		if(response.ok){
            const resultado = await response.json();
            console.log("estado",resultado);
            toast.show({
                description: "Guardado con éxito"
            })
        }else{
            toast.show({
                description: "Por favor en unos minutos"
              })
        }

       registrar({nombre:nombre,apellido:apellido,celular:celular,pais:pais});
        setGuardando(false);
    }

    useEffect(() => {
        (async () => {

            const cookieusuario = await obtenerDato('@usuariolabgo');
             console.log("usuario cc",cookieusuario);
                setUsuario(cookieusuario)
            
        })();
        
    },[])

    return(
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                style={{ flex: 1 }}
            >
                <VStack
                    px="4"
                    py="10"
                    borderRadius={{ md: '8' }}
                    space="4"
                >
                    <FloatingLabelInput 
                        py="3"
                        isRequired
                        label="Email"
                        labelColor="#9CA3AF"
                        borderRadius="10"
                        borderColor="#007ac2"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        defaultValue={usuario}
                        onChangeText={(txt) => setUsuario(txt)}
                        _text={{
                            fontSize: 'sm',
                            fontWeight: 'medium',
                        }}
                    />
                    <FloatingLabelInput 
                        py="3"
                        isRequired
                        label="Nombres"
                        labelColor="#9CA3AF"
                        borderRadius="10"
                        borderColor="#007ac2"
                        defaultValue={nombre}
                        onChangeText={(txt) => setNombre(txt)}
                        _text={{
                            fontSize: 'sm',
                            fontWeight: 'medium',
                        }}
                    />
                    <FloatingLabelInput 
                        py="3"
                        isRequired
                        label="Apellidos"
                        labelColor="#9CA3AF"
                        borderRadius="10"
                        borderColor="#007ac2"
                        defaultValue={apellido}
                        onChangeText={(txt) => setApellido(txt)}
                        _text={{
                            fontSize: 'sm',
                            fontWeight: 'medium',
                        }}
                    />
                    <FloatingLabelInput 
                        py="3"
                        isRequired
                        label="Celular"
                        labelColor="#9CA3AF"
                        borderRadius="10"
                        borderColor="#007ac2"
                        keyboardType="phone-pad"
                        defaultValue={celular}
                        onChangeText={(txt) => setCelular(txt)}
                        _text={{
                            fontSize: 'sm',
                            fontWeight: 'medium',
                        }}
                    />
            
                    <Select key="spais" bg="white" selectedValue={pais} minWidth="70" borderRadius="10"
                         accessibilityLabel="País" placeholder="País" borderColor="#007ac2" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <Icon as={AntDesign} name="check" />
                    }} mt={1} onValueChange={itemValue => setPais(itemValue)}
                        dropdownIcon={<Icon as={AntDesign} name="caretdown" size="3" color="gray.400" marginRight="2" />}>
                            <Select.Item key="ecuador" label="Ecuador" value="ec" />
                            <Select.Item key="peru" label="Perú" value="pe" />
                    </Select>
                    <Button
                        mt={valorResponsivo({
                            base:'10',
                            sm:'2',
                            md: '2'
                        })}
                        py="3"
                        onPress={() => {
                            guardar();
                        }}
                        _text={{
                            color: 'white',
                            fontSize: 18
                        }}
                        bg="#007ac2"
                        borderRadius= '30'
                        isLoading={guardando} isLoadingText="Guardando"
                        _loading={{
                            bg: "primary.800",
                            _text: {
                            color: "coolGray.700"
                            }
                        }} _spinner={{
                            color: "white"
                        }}
                        >
                        Guardar
                    </Button>
                </VStack>
            </KeyboardAwareScrollView>
    )
}