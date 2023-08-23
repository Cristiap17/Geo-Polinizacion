import React, { useState } from 'react'
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
  const [coords, setCoords] = useState([])
  const polyCoordArray = []

  const setMap = (map) => {
    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
    dispatch({ type: 'setMap', payload: map })
  }

  const setMarkers = (map) => {
    coords.map((coord) => {
      polyCoordArray.push([coord.longitude, coord.latitude])
      new Marker()
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map)
      return coord
    })
  }

  const setLines = (map) => {
    const sourceData = {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': polyCoordArray
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
    <MapContext.Provider value={{ stateMap, dispatch, setMap, setMarkers, setLines, coords, setCoords }}>
      {children}
    </MapContext.Provider>
  )
}
