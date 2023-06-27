import React, { useRef, useState, useEffect } from 'react';
import {
  Input,
  Icon,
  Pressable,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const InputPredictivo = (props) => {
    const [query, setQuery] = useState("");
    const inputSearch = useRef(null);
    
    useEffect(() => {
      if(query===''){
        inputSearch.current.focus()
        props.funcionCompletado(query)
      }else{
        const timeOutId = setTimeout(() => props.funcionCompletado(query), 600);
        return () => clearTimeout(timeOutId);
      }
    }, [query]);

    return (
      <Input
        ref={inputSearch}
        width={props.width}
        placeholder="Buscar"
        borderRadius="10"
        py="2"
        px="3"
        borderWidth="0"
        onChangeText={(texto)=>setQuery(texto)}
        value={query}
        InputRightElement={
          <Pressable
            onPress={() => {
              setQuery('');
            }}
            >
            {query!==''?<Icon
                as={<Ionicons name="ios-close" />}
                size={5}
                mr="2"
                color="muted.400"
            />:null}</Pressable>
        }
        />
    );
  }

  export default InputPredictivo