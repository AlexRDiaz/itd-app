import React from 'react';
import { Box, HStack, VStack, Image, Text, Icon, Pressable } from 'native-base';
import DetalleLab from '../../components/DetalleLab';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Laboratorio({item}){
    const navigation = useNavigation();

    return(
        <Box p="2" maxWidth="93%">
            <VStack>
                <HStack space="1" >
                    <Image
                      alt="labimage"
                      source={require('../../assets/marker.png')}
                      resizeMode="contain"
                    />
                    <Text pt="1" px="2" fontSize="md" fontWeight="bold">
                      {item.nombre}
                    </Text>
                </HStack>
                <VStack marginRight="4">
                    <HStack>
                        <DetalleLab lab={item} verTitulo={false}/>
                        <Pressable bg="#007AC2" borderRadius={30} p="3"
                            onPress={() => navigation.navigate('principal',{item:item})}>
                            <VStack space="2">
                                <Text color="white" fontWeight="bold">
                                    Ir
                                </Text>
                                <Icon size="4"
                                    as={Ionicons}
                                    name="send"
                                    color="white"
                                />
                            </VStack>
                        </Pressable>
                    </HStack>
                </VStack>
            </VStack>
            
        </Box>
    )
}