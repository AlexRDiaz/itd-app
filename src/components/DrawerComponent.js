import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';




const Drawer = createDrawerNavigator();

export default function DrawerComponent() {
  return (
      <Drawer.Navigator  initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
  );
 }