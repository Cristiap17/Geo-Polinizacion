import React from 'react'
import { MapContext } from './MapContext'
import { useReducer } from 'react'
import { mapReducer } from './mapReducer'
import { Marker } from 'mapbox-gl'


const INITIAL_STATE = {
    isMapReady: false,
    map: undefined,
}


export const MapProvider = ({ children }) => {

    const [stateMap, dispatch] = useReducer(mapReducer, INITIAL_STATE)

    const setMap = ( map ) =>{

      new Marker()
          .setLngLat( map.getCenter())
          .addTo( map )

      dispatch({ type: 'setMap', payload: map })
    }

  return (
    <MapContext.Provider value={{ stateMap, dispatch, setMap }}>
        {children}
    </MapContext.Provider>
  )
}
