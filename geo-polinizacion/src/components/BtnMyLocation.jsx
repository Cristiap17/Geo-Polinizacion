import React, { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'

export const BtnMyLocation = () => {

    const { state } = useContext( PlacesContext )
    const { stateMap } = useContext( MapContext )



    const onClick = () =>{
        if (!stateMap.isMapReady) throw new Error('Mapa no está listo.')
        if (!state.userLocation) throw new Error('No hay ubicación de usuario.')

        stateMap.map?.flyTo({
            zoom: 14,
            center: state.userLocation
        })
    }


  return (
    <button 
        className='btn btn-primary'
        onClick={onClick}
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999
        }}    
    >
        Mi Ubicación
    </button>
  )
}
