import BottomToolbar from 'react-native-bottom-toolbar'

const ToolBar=({eliminar,cancelar})=>{
    console.log(eliminar,cancelar)

   return (
    <BottomToolbar >
     
    <BottomToolbar.Action
      title="Editar"
      onPress={(index, propsOfThisAction) =>
        console.warn(index + ' ' + JSON.stringify(propsOfThisAction))}
    />
    <BottomToolbar.Action
      title="Cancelar"
      onPress={() =>{
        //  console.warn(index + ' ' + JSON.stringify(propsOfThisAction))
          cancelar();   
      }  }
    />
    <BottomToolbar.Action
      title="Eliminar"
      onPress={() =>{
      //  console.warn(index + ' ' + JSON.stringify(propsOfThisAction))
        eliminar();   
    }  }
   />
  </BottomToolbar>
   );
}
export default ToolBar

