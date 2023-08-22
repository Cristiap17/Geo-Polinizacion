import React from 'react'
import { MapContext } from './MapContext'
import { useReducer } from 'react'
import { mapReducer } from './mapReducer'
import { Marker } from 'mapbox-gl'
import { DATA_PRUEBA } from '../../utils/data'

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
}

console.log(DATA_PRUEBA);


export const MapProvider = ({ children }) => {

  const [stateMap, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  const setMap = (map) => {
    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
    dispatch({ type: 'setMap', payload: map })
  }

  const setMarkers = (map) => {
    DATA_PRUEBA.map((marker) => {
      new Marker()
        .setLngLat([marker[0], marker[1]])
        .addTo(map)
    })
  }

const setLines = ( map ) =>{
  const sourceData = {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': DATA_PRUEBA
      }
    }
  }

  map.on('load', () => {
    
    map?.addSource('RouteString', sourceData)

    map?.addLayer({
      'id': 'RouteString',
      'type': 'line',
      'source': 'RouteString',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': 'black',
        'line-width': 3
      }
    });
  })
}

  return (
    <MapContext.Provider value={{ stateMap, dispatch, setMap, setMarkers, setLines }}>
      {children}
    </MapContext.Provider>
  )
}
