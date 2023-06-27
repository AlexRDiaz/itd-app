import { valorResponsivo } from "../servicios/Omni";

const produccion = true;
const urlPro='http://app.rochelabnews.com';
const urlPru='https://kf1ll368w7.execute-api.us-east-1.amazonaws.com';

const Config = {
    pais:'ec',
    apiGateway: produccion?urlPru:'http://192.168.200.9:8000/api',
    assetsUrl: produccion?urlPro+'/assets/uploads/':'http://192.168.200.9/plataformaweb/assets/uploads/',
    sitioUrl: produccion?urlPro:'http://192.168.200.9/plataformaweb/index.php',
    nombreApp: 'LabGo',
    limiteBusqueda: 20,
    sizeIconos: valorResponsivo({
        base:'6',
        lg: '10',
        xl: '10'
      }),
    especialidades:[
        {nombre: 'Cariólogos', bio:'Cardiología'},
        {nombre: 'Endocrinólogos', bio:'Cardiología'},
        {nombre: 'Emergenciólogos', bio:'Cardiología'},
        {nombre: 'Intensivistas', bio:'Cardiología'},
        {nombre: 'Internistas', bio:'Cardiología'},
        {nombre: 'Oncología', bio:'Oncología,Ginecología'},
        {nombre: 'Anesteciólogos', bio:'Cardiología'},
        {nombre: 'Nefrólogos', bio:'Cardiología'},
        {nombre: 'Ginecólogos', bio:'Ginecología'},
        {nombre: 'Obstetras', bio:'Ginecología'},
    ],
    datosPais: {
        'ec':{
            urlNews:'https://www.rochelabnews.com/ec',
            regionInicial: {
                latitude: -0.1683117,
                longitude: -78.4784356,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                zoom: 14
            }
        },
        'pe':{
            urlNews:'https://www.rochelabnews.com/pe',
            regionInicial: {
                latitude: -12.09246,
                longitude: -77.05697,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                zoom: 14
            }
        }
    }
}

export default Config;
