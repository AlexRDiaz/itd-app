import { View } from 'react-native';
import React, { useEffect } from "react";
import { Stack, Text, Button } from "@react-native-material/core";
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Select, Input, CheckIcon, HStack, Switch, Image, Container, Heading } from "native-base";
import { getContentUriAsync } from 'expo-file-system';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { guardarArchivo, snackBar, cargarCategorias } from '../servicios/Omni';
import Preview from './Preview';




const FormGuardarComponent = ({ route, navigation }) => {
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    const [nombre, setNombre] = useState("");
    const [palabrasClave, setPalabrasClave] = useState("");
    const [tipo, setTipo] = useState("");
    const [secreto, setSecreto] = useState(false);
    const [categorias, setCategorias] = useState([]);

    async function obtenerImagen(contentUri) {
        var res = '';
        if (contentUri != null & contentUri != "") {
            // console.log("entro aqui", contentUri)
            const test3 = 'file:' + contentUri;
            const archivo = await getContentUriAsync(test3).then(cUri => {
                console.log("aqui esta el exito: ", cUri);
                res = cUri;
            })

        }
        return res;
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setNombre("");
            setPalabrasClave("");
            setTipo("")
            setSecreto(false)
            console.log("se ha cargado Form");
        });


        return unsubscribe;
    }, [navigation]);

    useEffect(async () => {
        let cat = [];
        cat = await cargarCategorias();
        setCategorias(cat);
    }, [])




    const guardar = async () => {
        console.log("entro",)
        contenido.forEach(async (file) => {
            var m = await obtenerImagen(file.filePath);
            var datos = {
                "nombre": nombre,
                "tipo_id": tipo,
                "secreto": secreto,
                "realPath": m,
                "contenido": {
                    "contentUri": file.contentUri != undefined ? file.contentUri : "",
                    "extension": file.extension != undefined ? file.extension : "",
                    "fileName": file.fileName != undefined ? file.fileName : "",
                    "filePath": file.filePath != undefined ? file.filePath : "",
                    "subject": file.subject != undefined ? file.subject : "",
                    "weblink": file.weblink != undefined ? file.weblink : "",
                    "mimeType": file.mimeType != undefined ? file.mimeType : "",
                }

            }
            let res = await guardarArchivo(datos)
            console.log("respuesta", res);
            snackBar(res);
            navigation.navigate('busqueda')

        }); navigation


    }

 

    /* 2. Get the param */
    const { contenido } = route.params;
    // console.log("aqui esta el camino al exito ", contenido);

    function enviarSecreto() {
        if (secreto == false) {
            setSecreto(true);
            console.log("activado")
        } else {
            setSecreto(false);

            console.log("desactivado")
        }
    }

    const getPreview=async (file)=>{
       var file= await obtenerImagen(file.filePath)
       return <Preview item={{contenido:file, realPath: file }}/>

    }


    return (
        <Stack spacing={10} style={{ margin: 16, padding: 10 }}>
            <Container color="black">
                <Heading padding={5}>

                    <Text color="black"  > Guardar Datos</Text>
                </Heading>

            </Container>

            <Input size="xs" placeholder="Nombre" value={nombre} onChangeText={val => setNombre(val)} />
            <Input size="xs" marginTop={'1'} value={palabrasClave} placeholder="Palabras clave" onChangeText={val => setPalabrasClave(val)} />

            <Select selectedValue={tipo} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setTipo(itemValue)}>
                {
                    categorias.map(element => {

                        return <Select.Item label={element.nombre} value={element.valor}  key={Math.random()}/>

                    })

                }

            </Select>
            {/* <HStack alignItems="center" space={4}>
                <Text>Es secreto?</Text>
                <Switch size="sm" value={secreto} onToggle={() => enviarSecreto()} />
            </HStack> */}
            <Button title="Guardar" onPress={() => guardar()}>Guardar</Button>
            {
                contenido.map(async (file) => (
                    <View key={Math.random()}>
                        <LinkPreview text={file.weblink} />

                        <Text variant="h6" style={{ margin: 12 }}>
                            {file.fileName}
                        </Text>
                    </View>
                ))}
        </Stack>

    );

}

export default FormGuardarComponent