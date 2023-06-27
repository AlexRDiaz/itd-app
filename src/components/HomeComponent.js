import { React, useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/firestore";
import { StyleSheet } from "react-native";
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import BusquedaLayout from '../layouts/BusquedaLayout';
import { Text, Avatar, Pressable, HStack, IconButton, Icon, Box, VStack, FlatList, Spacer, Checkbox, Image, Center } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import InputPredictivo from '../components/InputPredictivo';
import Config from '../comun/Config';
import RNFetchBlob from "rn-fetch-blob";
import { RefreshControl } from 'react-native'
import ToolBar from "./ToolBar";
var wordIcon = require('../assets/doc.png');
var excelIcon = require('../assets/xls.png');
var pdfIcon = require('../assets/pdf.png');


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
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cargarDatos();
      console.log("feed is focused");
    });

    return unsubscribe;
  }, [navigation]);




  const navigation = useNavigation();

  const [datos, setDatos] = useState([]);
  const { tipo_id,titulo } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  //const [listEliminar2,setListEliminar]=useState([]);
  var listEliminar = [];

  function actualizarListaEliminar(value, documentId) {
    if (value === true) {
      listEliminar.push(documentId);
    }
    else {
      listEliminar.pop(documentId);
      console.log("valores:", value)

    }
  }


  function longPress() {
    setVisible(true);
  }


  const eliminarDato = () => {
    listEliminar.forEach(async element => {

      const res = await firebase.firestore().collection('contenido').doc(element).delete();

    });
    cargarDatos();
  }

  const ItemLista = ({ item }) => {

    const navigation = useNavigation();
    return (
      <Pressable borderBottomWidth="1"
        borderColor="#c2e6ee" pl="4" pr="5" py="2"
        onLongPress={() => {
          longPress();
        }}
        delayLongPress={2000}
        onPress={() => {
          const android = RNFetchBlob.android;
          android.actionViewIntent(item.contenido.filePath, item.contenido.mimeType);
        }}
      >
        <HStack space={3} justifyContent="space-between">
          {getPreview(item)}
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
    var querySnapshot = "";
    if (tipo_id != "") {
      if (w === undefined) {
        querySnapshot = await firebase.firestore().collection('contenido').where('tipo_id', '==', tipo_id).get();
      } else {

        querySnapshot = await firebase.firestore().collection('contenido').orderBy("nombre").startAt(w).endAt(w + '\uf8ff').where('tipo_id', '==', tipo_id).get();

      }
    } else {
      if (w === undefined) {

        querySnapshot = await firebase.firestore().collection('contenido').get();
      } else {
        querySnapshot = await firebase.firestore().collection('contenido').orderBy("nombre").startAt(w).endAt(w + '\uf8ff').get();
      }
    }

    let data = [];
    querySnapshot.docs.forEach((dat) => {
      const { nombre } = dat.data();
      dat.data()["document_id"] = dat.id;
      data.push(dat.data());
    });
    setDatos(data);

  }


  // async function obtenerImagen(contentUri, fileName) {
  //   var res = '';
  //   if (contentUri != "") {
  //     const test3 = 'file:' + contentUri;

  //     const archivo = await getContentUriAsync(test3).then(cUri => {
  //       res = cUri;
  //     })

  //   }
  //   return res;
  // }



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
                onPress={() => {
                  navigation.goBack();
                  setVisible(false);
                }}
                icon={
                  <Icon
                    size={Config.sizeIconos}
                    as={Ionicons}
                    name="chevron-back"
                    color="#007ac2"
                  />
                }
              />
                 <Center>
                 <Text bold>{titulo}</Text>

            </Center>
              <InputPredictivo width="90%" funcionCompletado={cargarDatos} />
            </HStack>
          </VStack>
        </Box>
        <Box
          flex={1}
          safeAreaBottom
          flexDirection={{ base: 'column', md: 'row' }}
        >
          {datos.length > 0 &&
            <FlatList
              key='prd-lista'
              numColumns={1}
              data={datos}
              renderItem={({ item }) => (<ItemLista item={item} />)}
              keyExtractor={(item, index) => item.document_id}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          }
        </Box>
        {visible == true ? <ToolBar eliminar={() => eliminarDato()} /> : null

        }
      </BusquedaLayout>

    </>
  )
}
export default ImagenesComponent






function getPreview(item) {
  var res;
  var lengthString = item.contenido.fileName.length;
  var tipoArch = item.contenido.fileName.substring(lengthString - 4, lengthString)


  if (item.contenido.weblink !== "" & item.contenido.filePath==="") {
    res = <LinkPreview text={item.contenido.weblink} containerStyle={{ height: 120, width: 200 }} textContainerStyle={{ display: "none" }} />
  }
  else {
    if ( tipoArch===".png" | tipoArch===".jpg") {

      res = <Avatar size="48px" source={{ uri: item.realPath }} />
    }
    if(tipoArch===".pdf" )  {
       
      res = <Image source={pdfIcon} style={{  width: 40,  height: 55, }} alt="Alternate Text" />    
    }
    if(tipoArch==="xlsx" )  {
       
      res = <Image source={excelIcon} style={{  width: 40,  height: 55, }} alt="Alternate Text" />    
    }
    if(tipoArch==="docx" )  {
       
      res = <Image source={wordIcon} style={{  width: 40,  height: 55, }} alt="Alternate Text" />    
    }
  }
  return res;
}

