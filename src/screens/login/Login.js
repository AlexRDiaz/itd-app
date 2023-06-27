import React, { useEffect, useState } from 'react';
import { Button, Box, VStack, Heading, Center, useToast, Divider, HStack, Text, Pressable } from 'native-base';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import PinInput from '../../components/PinInput';
import AdminServiciosAPI from '../../servicios/AdminServicios';
import { secondsToHms } from '../../servicios/Omni';

export default function Login(props) {
    const [correo, setCorreo] = useState('')
    const [paso, setPaso] = useState(1)
    const [cargando, setCargando] = useState(false)
    const [codigo, setCodigo] = useState('')
    const toast = useToast();
    const [contador, setContador] = useState(0);
    const [codigoValidar,setCodigoValidar]=useState("")
    const [cookie ,setCookie]=useState("");
    const guardarCodigo = (valor) => {
        setCodigo(valor)
        
    }

    useEffect(()=>{
        const timer =
        contador > 0 && setInterval(() => setContador(contador - 1), 1000);
        return () => clearInterval(timer);
    },[contador])

    async function enviarCorreo(){

        setCargando(true)
        const response = await AdminServiciosAPI.postRegistro('usuario',{usuario: correo});
       
        // console.log(response);

        if(response.ok){
            const resultado = await response.json();
            console.log("estado",resultado);

            if(resultado.request.data==='correo enviado correctamente'){
                // console.log("estado es ok y resultado es: ",resultado);

                setContador(120);
                setCodigoValidar(resultado.codigo);
               
                if(resultado.user.datos!==undefined){
                    setCookie(JSON.parse(resultado.user.datos));
                }else{
                    setCookie("");
                }
                setPaso(2);
            }
        }
        setCargando(false);
    }

    async function enviarCodigo(){
        setCargando(true)
      //  const response = await AdminServiciosAPI.postRegistro('validar',{correo: correo, codigo: codigo.join('')});
	 var codigotest="";
     codigo.forEach(element => {
        codigotest+=element
        
     });
     console.log("codigotest",codigotest,codigoValidar);

      if(codigotest==codigoValidar){
        console.log(codigotest,codigoValidar);
        props.entrar({usuario:correo,cookie:cookie})

        //props.entrar("codigo ingresado correcto")
     }else{
            toast.show({
                description: "Por favor escriba el código correcto"
              })
        }

      
    //   if(response.ok){
    //         const resultado = await response.json();
    //         if(resultado.data==='ok'){
    //             props.entrar(resultado.message)
    //         }
    //     }else{
    //         toast.show({
    //             description: "Por favor escriba el código correcto"
    //           })
    //     }
        setCargando(false);
    }

    const ingresarCorreo = (
        <>
            <VStack pb="10">
                <Center>
                    <Heading size="sm">
                        Ingrese su correo electrónico para iniciar sesión
                    </Heading>
                </Center>
            </VStack>
            <FloatingLabelInput 
                py="3"
                isRequired
                label="Email"
                labelColor="#9CA3AF"
                borderRadius="30"
                borderColor="#007ac2"
                autoCapitalize="none"
                keyboardType="email-address"
                defaultValue={correo}
                onChangeText={(txt) => setCorreo(txt)}
                _text={{
                    fontSize: 'sm',
                    fontWeight: 'medium',
                }}
            />
            <Button
                mt="10"
                py="3"
                onPress={() => {
                    enviarCorreo();
                }}
                _text={{
                    color: 'white',
                    fontSize: 18
                }}
                bg="#007ac2"
                borderRadius= '30'
                isLoading={cargando} isLoadingText="Enviando"
                _loading={{
                    bg: "primary.800",
                    _text: {
                      color: "coolGray.700"
                    }
                  }} _spinner={{
                    color: "white"
                  }}
                >
                Siguiente
            </Button>
        </>
    )

    const ingresarCodigo = (
        <>
            <VStack pb="10">
                <Center>
                        <Heading size="sm">
                            Por favor revisa tu correo e ingresa el código que te enviamos
                        </Heading>
                        <PinInput ncaracteres="5" guardarCodigo={guardarCodigo} />
                </Center>
            </VStack>
            <Button
                mt="10"
                py="3"
                onPress={() => {
                    enviarCodigo();
                }}
                _text={{
                    color: 'white',
                    fontSize: 18
                }}
                bg="#007ac2"
                borderRadius= '30'
                isLoading={cargando} isLoadingText="Enviando"
                _loading={{
                    bg: "primary.800",
                    _text: {
                    color: "coolGray.700"
                    }
                }} _spinner={{
                    color: "white"
                }}
                >
                Siguiente
            </Button>
            <Divider my="3" />
            <VStack>
                <Center>
                    <HStack>
                        <Text color="coolGray.700">
                            Reenviar código en 
                        </Text>
                        <Text marginLeft="2" color="#007ac2">
                            {secondsToHms(contador)}
                        </Text>
                    </HStack>
                </Center>
                <Center>
                    <Pressable isDisabled={contador>0} marginTop="2" onPress={()=>enviarCorreo()}>
                        <Text color={contador>0?"muted.300":"#007ac2"}>
                            Reenviar código
                        </Text>
                    </Pressable>
                </Center>
                
            </VStack>
        </>
    )

    return (
        <>
        <Box pt="20" py="5">
            {paso===1 && ingresarCorreo}
            {paso===2 && ingresarCodigo}
        </Box>
        </>  
    )
}