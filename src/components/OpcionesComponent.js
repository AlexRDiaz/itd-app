import { createStackNavigator } from '@react-navigation/stack';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { useEffect } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';




export default function OpcionesComponent({ navigation }) {


    useEffect(() => {
        ReceiveSharingIntent.getReceivedFiles(files => {
            var contenido = [];

            if (!files.length == 0) {

                var cont = 0
                files.forEach(file => {

                    var contenidoObj = {
                        "contentUri": file.contentUri,
                        "extension": file.extension,
                        "fileName": file.fileName,
                        "filePath": file.filePath,
                        "subject": file.subject,
                        "weblink": file.weblink,
                        "mimeType": file.mimeType!=undefined?file.mimeType:""
                    }
                    contenido.push(contenidoObj);
                })


            } else {
                console.log("no files founded")

            }

            navigation.navigate('guardar', {
                contenido: contenido,
            });
        },
            (error) => {
                console.log(error);
            },
            'ShareMedia');

    }, []);

    return (
<>

        {/* <View padding={'2.5'}>
          
            <Button size="sm" variant="subtle" onPress={() => navigation.navigate('imagenes', { tipo_id: 'im' })}>
                Imagenes
            </Button>
            <Button size="sm" variant="subtle" colorScheme="secondary" onPress={() => navigation.navigate('imagenes', { tipo_id: 'vid' })}>
                Videos
            </Button>
            <Button size="sm" variant="subtle" colorScheme="primary" onPress={() => navigation.navigate('imagenes', { tipo_id: 'doc' })}>
                Documentos
            </Button>
            <Button size="sm" variant="subtle" colorScheme="secondary" onPress={() => navigation.navigate('imagenes', { tipo_id: 'pag' })}>
                Links (paginas)
            </Button>
            


        </View> */}
        </>

    )


}

