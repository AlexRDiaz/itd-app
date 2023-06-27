import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { obtenerDato } from "../servicios/Omni";
import PrincipalNavigator from "./principal.navigator";
import SplashScreen from "../screens/SplashScreen";
import { AuthContext } from "./store";
import Inicio from "../screens/login/Inicio";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { state, dispatch } = useContext(AuthContext)

    useEffect(() => {
      const cargarUsuario = async () => {
        console.log("datos ususario al iniciar");

        const datosusuario = await obtenerDato('@cookielabgo')
        if(datosusuario){
          dispatch({ type: 'RESTORE_TOKEN', token: datosusuario });
        }else{
          dispatch({ type: 'SIGN_OUT' });
        }
      }
      cargarUsuario();
    },[])










    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.isLoading?<Stack.Screen name="splash" component={SplashScreen}/>:state.userToken === null?
          (<Stack.Screen name={"inicio"} component={Inicio} />):
          (<Stack.Screen name={"principalnav"} component={PrincipalNavigator} />)}
      </Stack.Navigator>
    );
}

export default AppNavigator;