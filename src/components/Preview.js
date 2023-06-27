import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { AspectRatio, Avatar, Image } from "native-base";
import { valorResponsivo } from "../servicios/Omni";

const Preview = ({ item }) => {
    var res;
    if (item.contenido.weblink !== "") {
        res =<LinkPreview text={item.contenido.weblink} containerStyle={{ height: 100, width: 150 }} textContainerStyle={{ display: "none" }} />

    } else {
        var tipoDoc = item.contenido.contentUri.substring(item.contenido.contentUri.length - 4);
        console.log("tipodoc", tipoDoc);
        if (tipoDoc === ".jpg") {
            res = 
                <Image source={{ uri: item.realPath }} alt="imagen" resizeMode={'contain'} />

        }
        if (tipoDoc === ".pdf") {

            res = <Image source={require('../assets/pdf.png')} alt="Alternate Text" size="sm" />

        }
        if (tipoDoc === "docx") {
            res = <Image source={require('../assets/doc.png')} alt="Alternate Text" size="sm" />

        }
        if (tipoDoc === "xlsx") {
            res = <Image source={require('../assets/xls.png')} alt="Alternate Text" size="sm" />

        }
    }



    return <AspectRatio w={valorResponsivo({ base: "40%", xl: "100%" }, 'w')} ratio={16 / 9}>
    { res}
    </AspectRatio>;
}
export default Preview