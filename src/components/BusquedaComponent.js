import ImagenesComponent from './ImagenesComponent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { useEffect } from 'react';





export default function BusquedaComponent({ navigation }) {

  
  const Drawer =createDrawerNavigator()
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
 
  <Drawer.Navigator 
      > 
        <Drawer.Screen name="Recientes" component={ImagenesComponent} options={{animation:"slide_from_bottom" ,headerShown: false}}   initialParams={{ tipo_id: "" , titulo:"Recientes"}} />
        <Drawer.Screen name="Imagenes"  component={ImagenesComponent} options={{animation:"slide_from_bottom" ,headerShown: false}}   initialParams={{ tipo_id: "im",titulo:"Imagenes" }} />
        <Drawer.Screen name="Videos" component={ImagenesComponent} options={{animation:"slide_from_bottom" ,headerShown: false}}  initialParams={{ tipo_id: "vid",titulo:"Videos" }}  />
        <Drawer.Screen name="Links" component={ImagenesComponent} options={{animation:"slide_from_bottom",headerShown: false}}  initialParams={{ tipo_id: "pag" ,titulo:"Links"}} />
        <Drawer.Screen name="Lugares" component={ImagenesComponent} options={{animation:"slide_from_bottom",headerShown: false}}  initialParams={{ tipo_id: "dir" ,titulo:"Direcciones"}} />

    </Drawer.Navigator> 
  </>

  )


}

