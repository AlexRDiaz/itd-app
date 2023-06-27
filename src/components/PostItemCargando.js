import React from 'react';
import {
    VStack, Skeleton
} from 'native-base';
export default function PostItemCargando(){
    return(
        <VStack
        w='100%'
        mt="3"
        borderRadius="lg"
        p="3"
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    )
}