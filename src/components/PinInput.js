import React, { useState, useRef } from "react";
import {
  HStack,
  Input,
} from "native-base";

export default function PinInput(props) {
    const itemEls = useRef(new Array());
    const [pin, setPin] = useState(new Array(props.ncaracteres));

    const borrarItem = (i) => {
        if(!itemEls.current[i].value && (i-1)>=0){
            itemEls.current[i-1].focus();
        }
    }

    const crearItem = (valor, i) => {
        if(valor && valor!==''){
            pin[i]=valor;
            setPin(pin);
            props.guardarCodigo(pin);
            if((i+1)<props.ncaracteres){
                itemEls.current[i+1].focus();
            }
        }
    }

    const crearInputs = () => {
        var rows = [], ipos = 0;
        while (ipos < props.ncaracteres) rows.push(ipos++);
        return rows.map((x, i) =>
            <Input
            key={i}
            ref={(element) => itemEls.current.push(element)}
            variant="underlined"
            boxSize="10"
            color="black"
            textAlign="center"
            borderBottomWidth="2"
            fontSize="md"
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {crearItem(text,i)}}
            onKeyPress={({ nativeEvent: { key: keyValue } }) => {keyValue==='Backspace' && borrarItem(i)}}
            />
        )
    }

    return (
        <HStack space="3" pt="3">
        {crearInputs()}
        </HStack>
    );
}