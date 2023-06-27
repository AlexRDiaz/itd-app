import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';
import PrincipalLayout from '../../layouts/PrincipalLayout';
import { Actionsheet, useToast, useDisclose } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import Config from '../../comun/Config';
import AdminServiciosAPI from '../../servicios/AdminServicios';
import SearchBar from '../../components/SearchBar';
import DetalleLab from '../../components/DetalleLab';
import { obtenerDato } from "../../servicios/Omni";
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const imagenmarker = require('../../assets/marker.png');


export default function Principal(props){
  const toast = useToast();
  const [posicion, setPosicion] = useState();
  const [posicionInicial, setPosicionInicial] = useState(null)
  const [laboratorios, setLaboratorios] = useState([]);
  const [laboratorio, setLaboratorio] = useState(null);
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const isFocused = useIsFocused();
  const mapRef = createRef();
  
  useLayoutEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show({
          description: "Por favor permite los permisos de tu ubicación para proporcionarte la información más precisa"
        })
        return;
      }

      let location = await getCurrentPositionAsync({});
      if(location){
        const posicionLocal = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: LONGITUDE_DELTA,
          zoom: (Math.log2(360 * (width / 256 / LONGITUDE_DELTA)) + 1).toFixed(0)
        };
        setPosicionInicial(posicionLocal);
        //mapRef.current.animateToRegion(posicionLocal);
      }else{
        setPosicionInicial(Config.datosPais[Config.pais]['regionInicial']);
      }
      
    })();
  }, []);

  const onSeleccionaLab = async (lab,accion) => {
    const cookieusuario = await obtenerDato('@cookielabgo');
    AdminServiciosAPI.postRegistroPrivado(cookieusuario,'visualizacion',{id_local: lab.id, accion: accion});
    setLaboratorio(lab);
    onOpen();
  }

  async function mostrarLaboratorios(){
    const especialidad = await obtenerDato('@especialidadmenuLabgo');
    const cookieusuario = await obtenerDato('@cookielabgo');
    const posicionBuscar = posicion?posicion:posicionInicial;
    if(posicionBuscar){
      const response = await AdminServiciosAPI.getRegistroPrivado(cookieusuario,`laboratorios/${posicionBuscar.longitude}/${posicionBuscar.latitude}/${especialidad}/${posicionBuscar.zoom}`);
      if(response.ok){
          const resultado = await response.json();
          //console.log('resultado',resultado.message.locales.length)
          setLaboratorios(resultado.message.locales)
      }
    }
    
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => mostrarLaboratorios(), 700);
    return () => clearTimeout(timeOutId);
  }, [posicion]);

  useEffect(() => {
    if(isFocused){ 
      if(props.route && props.route.params && props.route.params.item){
          setPosicion({
            latitude: props.route.params.item.latitud,
            longitude: props.route.params.item.longitud,
            latitudeDelta: 0.0922,
            longitudeDelta: LONGITUDE_DELTA,
            zoom: (Math.log2(360 * (width / 256 / LONGITUDE_DELTA)) + 1).toFixed(0)
          })
          mapRef.current.animateToRegion({
            latitude: props.route.params.item.latitud,
            longitude: props.route.params.item.longitud,
            latitudeDelta: 0.0922,
            longitudeDelta: LONGITUDE_DELTA,
            zoom: (Math.log2(360 * (width / 256 / LONGITUDE_DELTA)) + 1).toFixed(0)
          });
          onSeleccionaLab(props.route.params.item,"seleccion-busqueda")
      }else{
        mostrarLaboratorios()
      }
    }
  },[props,isFocused]);

  const onRegionChange = (region) => {
    //console.log('posicion',region)
    setPosicion({
      latitude: region.latitude.toFixed(6),
      longitude: region.longitude.toFixed(6),
      latitudeDelta: 0.0922,
      longitudeDelta: LONGITUDE_DELTA,
      zoom: (Math.log2(360 * (width / 256 / region.longitudeDelta)) + 1).toFixed(0)
    })
  }

    return (
        <>
        <PrincipalLayout>
            <SearchBar />
            <MapView 
              ref={mapRef}
              style={{ flex: 1 }}
              customMapStyle={mapStyle}
              initialRegion={posicionInicial} 
              showsUserLocation={true}
              showsPointsOfInterest = {false}
              onRegionChangeComplete={onRegionChange}>
                {laboratorios.map((marker, index) => {
                  return (
                    <Marker
                      image={imagenmarker}
                      key={`lab-${marker.id}-${index}`}
                      coordinate={{ latitude : marker.latitud , longitude : marker.longitud }}
                      title={marker.nombre}
                      onPress={()=>onSeleccionaLab(marker,"seleccion-mapa")}
                    >
                    </Marker>
                  )
                })}
            </MapView>
            <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
              <Actionsheet.Content>
                <DetalleLab lab={laboratorio} />
              </Actionsheet.Content>
            </Actionsheet>
        </PrincipalLayout>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
          visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
]
