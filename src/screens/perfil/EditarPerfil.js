import React from 'react';
import PrincipalLayout from '../../layouts/PrincipalLayout';
import Perfil from './Perfil';

export default function EditarPerfil(){
    return(
        <PrincipalLayout backButton={true}>
            <Perfil registrar={(d)=>{}}/>
        </PrincipalLayout>
    )
}