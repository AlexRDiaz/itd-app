import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuUsuario from "../components/MenuUsuario";
import EditarPerfil from "../screens/perfil/EditarPerfil";
import HomeComponent from "../components/HomeComponent";
import ImagenesComponent from "../components/ImagenesComponent";

import BusquedaComponent from "../components/BusquedaComponent";
import FormGuardarComponent from "../components/FormGuardarComponent";

const Drawer = createDrawerNavigator();

const PrincipalNavigator = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false }}
         drawerContent={(props) => <MenuUsuario {...props} />} drawerPosition="right"
      >
        {/* <Drawer.Screen name="home" component={HomeComponent} /> */}
        <Drawer.Screen name="busqueda" component={BusquedaComponent} options={{animation:"slide_from_bottom"}} />
        <Drawer.Screen name="imagenes" component={ImagenesComponent} options={{animation:"slide_from_bottom"}} />

        <Drawer.Screen name="guardar" component={FormGuardarComponent} options={{animation:"slide_from_right"}} />
    </Drawer.Navigator>
)

export default PrincipalNavigator;