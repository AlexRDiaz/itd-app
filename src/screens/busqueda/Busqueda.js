import React, { useState, useLayoutEffect } from 'react';
import { HStack, VStack, Select, Divider, Icon, Stack, FlatList, Button } from 'native-base';
import AdminServiciosAPI from '../../servicios/AdminServicios';
import PostItemCargando from '../../components/PostItemCargando';
import Laboratorio from './Laboratorio';
import { AntDesign } from '@expo/vector-icons';
import { obtenerDato } from "../../servicios/Omni";
import { useIsFocused } from '@react-navigation/native';
import BusquedaLayout from '../../layouts/BusquedaLayout';
import Config from '../../comun/Config';

export default function Busqueda(props){
    const [cargando, setCargando] = useState(false);
    const [pais, setPais] = useState(null);
    const [ciudad, setCiudad] = useState(null);
    const [biomarcador, setBiomarcador] = useState(null);
    const [listaCiudad, setListaCiudad] = useState([]);
    const [laboratorios, setLaboratorios] = useState([]);
    const [listaBiomarcadores, setListaBiomarcadores] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [verMas, setVerMas] = useState(false);
    const [urlMasLugares, setUrlMasLugares] = useState('');
    const isFocused = useIsFocused();

    const buscarPais = async (paisSeleccionado) => {
        setCargando(true)
        const especialidad = await obtenerDato('@especialidadmenuLabgo');
        const cookieusuario = await obtenerDato('@cookielabgo');
        const response = await AdminServiciosAPI.getRegistroPrivado(cookieusuario,`buscarPais/${paisSeleccionado}/${especialidad}`);
		if(response.ok){
            const resultado = await response.json();
            //console.log('resultado',resultado.message.locales.last_page_url)
            setLaboratorios(resultado.message.locales.data)
            setCiudad('')
            setBiomarcador('')
            setListaCiudad(resultado.message.ciudades)
            setListaBiomarcadores([])
            setPais(paisSeleccionado)
            activarVerMasResultados(resultado.message.locales);
        }
        setCargando(false)
    }

    const buscarCiudad = async (ciudadSeleccionada) => {
        setCargando(true)
        const especialidad = await obtenerDato('@especialidadmenuLabgo');
        const cookieusuario = await obtenerDato('@cookielabgo');
        const response = await AdminServiciosAPI.getRegistroPrivado(cookieusuario,`buscarCiudad/${pais}/${ciudadSeleccionada}/${especialidad}`);
		if(response.ok){
            const resultado = await response.json();
            //console.log('resultado',resultado)
            setLaboratorios(resultado.message.locales.data)
            setBiomarcador('')
            setListaBiomarcadores(resultado.message.biomarcadores)
            setCiudad(ciudadSeleccionada)
            activarVerMasResultados(resultado.message.locales);
        }
        setCargando(false)
    }

    const buscarBiomarcador = async (bioSeleccionado) => {
        setCargando(true)
        const especialidad = await obtenerDato('@especialidadmenuLabgo');
        const cookieusuario = await obtenerDato('@cookielabgo');
        const response = await AdminServiciosAPI.getRegistroPrivado(cookieusuario,`buscarBiomarcador/${pais}/${ciudad}/${bioSeleccionado}/${especialidad}`);
		if(response.ok){
            const resultado = await response.json();
            //console.log('resultado',resultado)
            setLaboratorios(resultado.message.locales.data)
            setBiomarcador(bioSeleccionado)
            activarVerMasResultados(resultado.message.locales);
        }
        setCargando(false)
    }

    const activarVerMasResultados = (paginacion) => {
        //console.log('paginas',paginacion.current_page,paginacion.last_page)
        if(paginacion.last_page > 1 && paginacion.current_page <= paginacion.last_page){
            setVerMas(true);
            setUrlMasLugares(paginacion.next_page_url)
        }else{
            setVerMas(false);
        }
    }

    const verMasResultados = async () => {
        if(verMas){
            setCargando(true);
            const cookieusuario = await obtenerDato('@cookielabgo');
            //console.log('maslugares',urlMasLugares)
            const url = urlMasLugares.split(`${Config.apiGateway}/`);
            const response = await AdminServiciosAPI.getRegistroPrivado(cookieusuario,url[1]);
            if(response.ok){
                setPagina(pagina+1);
                const resultado = await response.json();
                console.log('resultado',resultado.message.locales.next_page_url)
                Array.prototype.push.apply(laboratorios,resultado.message.locales.data);
                setLaboratorios(laboratorios);
                activarVerMasResultados(laboratorios,resultado.message.locales);
            }
            setCargando(false);
        }
        
    }

    useLayoutEffect(() => {
        if(isFocused){ 
            setCiudad('');
            setBiomarcador('');
            setPais('');
            setVerMas(false);
            setLaboratorios([]);
            setListaCiudad([])
            setListaBiomarcadores([])
        }
    },[props,isFocused])

    return(
        <BusquedaLayout backButton={true}>
            <VStack space="2">
                <HStack justifyContent="center" space="1">
                    <Select bg="white" selectedValue={pais} minWidth="100" borderRadius="10"
                         accessibilityLabel="País" placeholder="País" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <Icon as={AntDesign} name="check" />
                    }} mt={1} onValueChange={itemValue => buscarPais(itemValue)}
                        dropdownIcon={<Icon as={AntDesign} name="caretdown" size="3" color="gray.400" marginRight="2" />}>
                        <Select.Item label="" value="" />
                        <Select.Item label="Ecuador" value="ec" />
                        <Select.Item label="Perú" value="pe" />
                    </Select>
                    <Select bg="white" selectedValue={ciudad} borderRadius="10"
                         minWidth="100" accessibilityLabel="Ciudad" placeholder="Ciudad" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <Icon as={AntDesign} name="check"
                        />
                    }} mt={1} onValueChange={itemValue => buscarCiudad(itemValue)}
                    dropdownIcon={<Icon as={AntDesign} name="caretdown" size="3" color="gray.400" marginRight="2"/>}>
                        <Select.Item label="" value="" />
                        {listaCiudad.map((item,i)=>
                            <Select.Item key={`ciu-${item.ciudad}${i}`} label={item.ciudad} value={item.ciudad} />
                        )}
                    </Select>
                    <Select bg="white" selectedValue={biomarcador} borderRadius="10"
                        minWidth="130" accessibilityLabel="Biomarcador" placeholder="Biomarcador" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <Icon as={AntDesign} name="check" />
                    }} mt={1} onValueChange={itemValue => buscarBiomarcador(itemValue)}
                    dropdownIcon={<Icon as={AntDesign} name="caretdown" size="3" color="gray.400" marginRight="2"/>}>
                        <Select.Item label="" value="" />
                        {listaBiomarcadores.map((item,i)=>
                            <Select.Item key={`bio-${item.biomarcador}${i}`} label={item.biomarcador} value={item.biomarcador} />
                        )}
                    </Select>
                </HStack>
                    {cargando && <PostItemCargando />}
                    {!cargando && <FlatList
                        contentContainerStyle={{ paddingBottom: 60 }}
                        mt={2}
                        display={{ md: 'flex' }}
                        horizontal={false}
                        numColumns={1}
                        data={laboratorios}
                        renderItem={({ item }) => {
                            return (
                                <Stack>
                                    <Laboratorio item={item} />
                                    <Divider />
                                </Stack>
                                )}
                        }
                        key={`busqueda${pagina}`}
                        keyExtractor={(item, index) => {`labbusq-${item.id}-${index}`}}
                        ListFooterComponent={verMas && <Button onPress={verMasResultados}>Ver más</Button>}
                    />}
            </VStack>
        </BusquedaLayout>
    )
}