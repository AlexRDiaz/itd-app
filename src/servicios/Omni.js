import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { firebase } from "@react-native-firebase/firestore";
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { getContentUriAsync } from 'expo-file-system';

/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */
export const request = async (url, data = {}) => {
  try {
    const response = await fetch(url, data);
    return response;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const guardarDato = async (key,dato) => {
  try {
      await AsyncStorage.setItem(key, dato);
  } catch (error) {
     console.log(error);
  }
}


export const guardarArchivo = async (datos) => {
  const cookieusuario = await obtenerDato('@cookielabgo');
  const cookie = JSON.parse(cookieusuario);
  datos.usuario_id = cookie.idusuario;
  try {
    await firestore().collection('contenido').add(datos);
    return "archivo agregado";
  } catch (error) {
    return "error" + error;
  }


}



export const obtenerDato = async (key) => {
  try {
    const dato = await AsyncStorage.getItem(key);
    return dato;
  } catch (error) {
    console.log(error);
  }
}

export const snackBar = (message) => {
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    action: {
      text: 'Cerrar',
      textColor: 'black',
      onPress: () => { /* Do something. */ },
    },
    backgroundColor: 'green'
  });

}


export const borrarDato = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export const cerrarSesion = async (key) => {
  try {
    await AsyncStorage.removeItem('@usuariolabgo');
    await AsyncStorage.removeItem('@cookielabgo');
    return true;
  } catch (error) {
    return false;
  }
}


export function imagenSize(width, height) {
  var maxWidth = 180;
  var maxHeight = 45;

  if (width >= height) {
    var ratio = maxWidth / width;
    var h = Math.ceil(ratio * height);

    if (h > maxHeight) {
      // Too tall, resize
      var ratio = maxHeight / height;
      var w = Math.ceil(ratio * width);
      var ret = {
        'width': w,
        'height': maxHeight
      };
    } else {
      var ret = {
        'width': maxWidth,
        'height': h
      };
    }

  } else {
    var ratio = maxHeight / height;
    var w = Math.ceil(ratio * width);

    if (w > maxWidth) {
      var ratio = maxWidth / width;
      var h = Math.ceil(ratio * height);
      var ret = {
        'width': maxWidth,
        'height': h
      };
    } else {
      var ret = {
        'width': w,
        'height': maxHeight
      };
    }
  }

  return ret;
}

export function valorResponsivo(valores, tipo = 'h') {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const check = tipo === 'w' ? windowWidth : windowHeight;
  //console.log('check',check)
  var valor = valores.base;
  if (check <= 480 && typeof valores.sm !== 'undefined') {
    valor = valores.sm
  } else if (check > 480 && check <= 768 && typeof valores.md !== 'undefined') {
    valor = valores.md
  } else if (check > 768 && check <= 992 && typeof valores.lg !== 'undefined') {
    valor = valores.lg
  } else if (check > 992 && typeof valores.xl !== 'undefined') {
    valor = valores.xl
  }
  //console.log('valor',valor)
  return valor
}



export function alturaPorcentaje(porcentaje) {
  const windowHeight = Dimensions.get('window').height;
  return windowHeight * porcentaje / 100;
}

export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + ":" : "";
  var mDisplay = m > 0 ? m + ":" : "";
  var sDisplay = s > 0 ? s : "";
  return hDisplay + mDisplay + sDisplay;
}



export async function obtenerImagen(contentUri) {
  var res = '';
  if (contentUri != null & contentUri != "") {
    console.log("entro aqui", contentUri)
    const test3 = 'file:' + contentUri;
    const archivo = await getContentUriAsync(test3).then(cUri => {
      console.log("aqui esta el exito: ", cUri);
      res = cUri;
    })

  }
  return res;
}


export async function cargarCategorias() {
  querySnapshot = await firebase.firestore().collection('categoria').orderBy("nombre").get();
  let data = [];
  querySnapshot.docs.forEach((dat) => {
    data.push(dat.data());
  });
  console.log(data)
  return data;
}


export async function eliminarArchivos(listEliminar) {
  
  
  listEliminar.forEach(async element => {
    console.log("se ha eliminado", element);

    const res = await firebase.firestore().collection('contenido').doc(element).delete();

  });
    
}

export async function cargarBusqueda(tipo_id,w) {
  var querySnapshot = "";
  if (tipo_id != "") {
    if (w === undefined) {
      console.log("a", w)
      querySnapshot = await firebase.firestore().collection('contenido').where('tipo_id', '==', tipo_id).get();
    } else {
      console.log("b", w)

      querySnapshot = await firebase.firestore().collection('contenido').orderBy("nombre").startAt(w).endAt(w + '\uf8ff').where('tipo_id', '==', tipo_id).get();

    }
  } else {
    if (w === undefined) {
      console.log("c", w)

      querySnapshot = await firebase.firestore().collection('contenido').get();
    } else {
      console.log("d", w)
      querySnapshot = await firebase.firestore().collection('contenido').orderBy("nombre").startAt(w).endAt(w + '\uf8ff').get();
    }
  }

  let data = [];
  querySnapshot.docs.forEach((dat) => {
    const { nombre } = dat.data();
    dat.data()["document_id"] = dat.id;
    data.push(dat.data());
  });

  return data
  }