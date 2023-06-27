import React from 'react';
import { Box, Heading, Icon, HStack, Text, VStack, Pressable, Button, IconButton } from 'native-base';
import { Feather, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { openURL } from 'expo-linking';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions, Share } from 'react-native';
import AdminServiciosAPI from '../servicios/AdminServicios';
import { obtenerDato } from "../servicios/Omni";
import { showLocation } from 'react-native-map-link'

export default function DetalleLab({verTitulo=true, ...props}){
    const { width } = useWindowDimensions();
    //console.log('lab',props.lab)

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: `${props.lab.nombre} - ${props.lab.direccion} - https://www.google.com.ec/maps/@${props.lab.latitud},${props.lab.longitud},19z?hl=es`,
            url: `https://www.google.com.ec/maps/@${props.lab.latitud},${props.lab.longitud},19z?hl=es`,
            title: 'LabGo'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          console.log(error.message);
        }
        const cookieusuario = await obtenerDato('@cookielabgo');
        AdminServiciosAPI.postRegistroPrivado(cookieusuario,'visualizacion',{id_local: props.lab.id, accion: 'compartir'});
    };

    async function abrirEnlace(url,accion){
        const cookieusuario = await obtenerDato('@cookielabgo');
        AdminServiciosAPI.postRegistroPrivado(cookieusuario,'visualizacion',{id_local: props.lab.id, accion: accion});
        openURL(url)
    }

    async function abrirMapa(latitud,longitud,accion){
        const cookieusuario = await obtenerDato('@cookielabgo');
        AdminServiciosAPI.postRegistroPrivado(cookieusuario,'visualizacion',{id_local: props.lab.id, accion: accion});
        showLocation({
            latitude: latitud,
            longitude: longitud,
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'Abrir en Maps', // optional (default: 'Open in Maps')
            dialogMessage: '¿Qué Mapa te gustaría usar?', // optional (default: 'What app would you like to use?')
            cancelText: 'Cancelar', // optional (default: 'Cancel')
            naverCallerName: 'com.plmlatina.rochelabgo', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
        })
    }

    return(
        <>
        {props.lab && <Box w="100%" px={4} py={verTitulo?'5':'2'} justifyContent="center">
            <VStack space={2}>
                {verTitulo && <Heading fontSize="16" color="gray.500" _dark={{
                        color: "gray.300"
                }}>
                {props.lab.nombre}
                </Heading>}
                {props.lab.telefono && <HStack space={4} pt="3">
                    <Icon
                        size="5"
                        as={Feather}
                        name="phone"
                        color="#007AC2"
                    />
                    <Text>
                       {props.lab.telefono}
                    </Text>
                </HStack>}
                {props.lab.direccion && <HStack space={4}>
                    <Icon
                        size="5"
                        as={AntDesign}
                        name="enviromento"
                        color="#007AC2"
                    />
                    <Text>
                    {props.lab.direccion}
                    </Text>
                </HStack>}
                {verTitulo && props.lab.email && <HStack space={4}>
                    <Icon
                        size="5"
                        as={MaterialIcons}
                        name="alternate-email"
                        color="#007AC2"
                    />
                    <Text>
                    {props.lab.email}
                    </Text>
                </HStack>}
                {verTitulo && props.lab.web!=='' && <Pressable onPress={() => {
                      openURL(props.lab.web)
                    }}>
                    <HStack space={4} >
                    <Icon
                        size="5"
                        as={MaterialCommunityIcons}
                        name="web"
                        color="#007AC2"
                    />
                    <Text>
                    {props.lab.web}
                    </Text>
                </HStack></Pressable>}
                {verTitulo && props.lab.info && <RenderHtml
                    contentWidth={width}
                    source={{html: `${props.lab.info}`}}
                />}
                {verTitulo && <HStack alignContent="space-between" space="1" marginTop="2">
                    {props.lab.telefono && <Button width="40%" size="xs" leftIcon={<Icon
                        size="3"
                        as={Feather}
                        name="phone"
                        color="white"
                    />}
                    onPress={() => abrirEnlace(`tel:${props.lab.telefono}`,'llamada')}>
                    Llamar</Button>}
                    <Button bg="#007AC2" width="40%"  size="xs" leftIcon={<Icon
                        size="3"
                        as={AntDesign}
                        name="enviromento"
                        color="white"
                    />}
                    onPress={() => abrirMapa(props.lab.latitud,props.lab.longitud,'ver-mapa')}>
                    Ver en Maps</Button>
                    <IconButton borderRadius="full" width="20%" icon={<Icon
                        size="5"
                        as={AntDesign}
                        name="sharealt"
                    />}
                    onPress={() => onShare()}>
                    </IconButton>
                </HStack>}
            </VStack>
        </Box>}
        </>
    )
}