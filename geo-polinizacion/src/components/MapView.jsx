import React from 'react'
import { Map } from 'mapbox-gl'
import { MapContext, PlacesContext } from '../context'
import { useContext, useRef, useLayoutEffect } from 'react'
import { Loading } from './Loading'

export const MapView = () => {

const { state } = useContext( PlacesContext ) 
const { setMap } = useContext( MapContext )
const mapDiv = useRef(null)

useLayoutEffect(() => {
  if (!state.isLoading) {
    const map = new Map({
      container: mapDiv.current , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: state.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

      setMap( map )
  }
}, [ state.isLoading ])

if (state.isLoading) {
    return(<Loading/>)
}

  return (
    <div  ref={ mapDiv }
          style={{
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left:0,
          }}
    >
        {/* {state.userLocation?.join()} */}
    </div>
  )
}
