import { Button, Text, View } from "native-base"


const LoginComponent=({ navigation })=>{
    return <View>
        <Text >pagina de login</Text>

        <Button onPress={() => navigation.navigate('Home')}>Ingresar</Button>
    </View>

}
export default LoginComponent