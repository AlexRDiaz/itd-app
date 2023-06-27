import { React, useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { Alert, BackHandler, SafeAreaView, StyleSheet } from "react-native";
import { getContentUriAsync } from 'expo-file-system';
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import BusquedaLayout from '../layouts/BusquedaLayout';
import { abrirBaseDatos, obtenerDato,eliminarArchivos,cargarBusqueda } from '../servicios/Omni';
import { Text, Avatar, Pressable, HStack, IconButton, Icon, Box, VStack, FlatList, Spacer, AspectRatio, Center, Button, Checkbox, Hidden, Container, HamburgerIcon, Heading } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import InputPredictivo from '../components/InputPredictivo';
import Config from '../comun/Config';
import RNFetchBlob from "rn-fetch-blob";
import { RefreshControl } from 'react-native'
import { elementAcceptingRef } from "@mui/utils";
import ToolBar from "./ToolBar";
import Preview from "./Preview";


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
const ImagenesComponent = ({ route }) => {
  const navigation = useNavigation();

  const [datos, setDatos] = useState([]);
  const { tipo_id,titulo } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  var listEliminar = [];
   var cont=0;


  function actualizarListaEliminar(value, documentId) {
    if (value === true) {
      listEliminar.push(documentId);
      console.log("valores:")
    }
    else {
      listEliminar.pop(documentId);
      console.log("valores:", value)

    }
    console.log("lista total;", listEliminar)
  }

  const onRefresh = useEffect(() => {
     setVisible(false);
    const unsubscribe = navigation.addListener("focus", () => {
      cargarDatos()
      console.log("feed is focused");
    });


    return unsubscribe;
  }, [navigation]);


  const cancelar = () => {
    setVisible(false);
  }

  const eliminarDato = async () => {
      await eliminarArchivos(listEliminar)
      cargarDatos();
  }

  const ItemLista = ({ item }) => {
    const navigation = useNavigation();
    return (
      <Pressable borderBottomWidth="1"
        borderColor="#c2e6ee" pl="4" pr="5" py="2"
        onLongPress={() => { 
          setTimeout(()=>setVisible(true), 500);
         
        }}
        delayLongPress={500}

        onPress={() => {
          const android = RNFetchBlob.android;
          android.actionViewIntent(item.contenido.filePath, item.contenido.mimeType);
        }}
      >
        <HStack space={3} justifyContent="space-between">
          {<Preview item={item}/>}
          <VStack>
            <Text color="coolGray.800" fontSize={Config.sizeTexto} bold>{item.nombre}</Text>
            <Text color="coolGray.600" fontSize={Config.sizeTexto}>{item.principioactivo}</Text>
            <Text color="coolGray.600" fontSize={Config.sizeTexto}>{item.status}</Text>
          </VStack>
          <Spacer />
          <Text fontSize={Config.sizeTexto} color="coolGray.800" alignSelf="flex-start">
            {item.lab}
          </Text>
          {item.tipo && <><Spacer />
            <Text fontSize={Config.sizeTexto} color="coolGray.800" alignSelf="flex-start">
              {item.tipo === 'otc' ? 'OTC' : 'NO OTC'}
            </Text></>}
          {
            visible == true ?
              <Checkbox aria-label="cb" value="info" colorScheme="info" onChange={(value) => actualizarListaEliminar(value, item.document_id)} /> : null
          }
        </HStack>

      </Pressable>
    )
  }




  async function cargarDatos(w) {
    var data =await  cargarBusqueda(tipo_id,w)
    setDatos(data);

  }



  return (
    <>
      <BusquedaLayout>
        <Box
          px="1"
          pt="2"
          bg='white'
          borderBottomColor='#84b65d'
          borderBottomWidth="3"
        >
          <VStack>
            <HStack space="2" justifyContent='space-between'>
              <IconButton
                variant="ghost"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}

                icon={
                  <HamburgerIcon />
                }
              />
              <InputPredictivo width="90%" funcionCompletado={cargarDatos} />
            </HStack>
          </VStack>
        </Box>
        <Box flex={1} safeAreaBottom flexDirection={{ base: 'column', md: 'row' }}>
        <Container color="black">
        <Heading  padding={5}>
         
          <Text  color="black"  >{  titulo}</Text>
        </Heading>
       
      </Container>
           {datos.length > 0 &&
            <FlatList
              key='prd-lista'
              numColumns={1}
              data={datos}
              renderItem={({ item }) => (<ItemLista item={item} />)}
              keyExtractor={(item, index) => item.document_id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          }
        </Box>
        {visible == true ? <ToolBar eliminar={() => eliminarDato()} cancelar={() => cancelar()} /> : null

        }
      </BusquedaLayout>

    </>
  )
}
export default ImagenesComponent








