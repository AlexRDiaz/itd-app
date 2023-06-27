import { request } from'./Omni';
import Config from '../comun/Config';

const AdminServiciosAPI = {
    getRegistro: async (parametro) => {
      const _url = `${Config.apiGateway}/${parametro}`;
      //console.log('url',_url)
      return request(_url, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
    },
    postRegistro: async (tabla,parametros) => {
    
      const _url = `${Config.apiGateway}/${tabla}`;
      //console.log('url',_url)
      return request(_url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(parametros),
      });
    },
    putRegistro: async (tabla,parametros) => {
    
      const _url = `${Config.apiGateway}/${tabla}`;
      //console.log('url',_url)
      return request(_url, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(parametros),
      });
    },
    getRegistroPrivado: async (cookieusuario,parametro) => {
      const _url = `${Config.apiGateway}/${parametro}`;
      //console.log('url',_url)
      return request(_url, {
        method: "GET",
        headers: {"Content-Type": "application/json", "authorization":cookieusuario},
      });
    },
    postRegistroPrivado: async (cookieusuario,tabla,parametros) => {
      const _url = `${Config.apiGateway}/${tabla}`;
      //console.log('url',_url)
      return request(_url, {
        method: "POST",
        headers: {"Content-Type": "application/json", "authorization":cookieusuario},
        body: JSON.stringify(parametros),
      });
    },
}

export default AdminServiciosAPI;