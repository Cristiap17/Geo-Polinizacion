import React from 'react'
import { PlacesContext } from './PlacesContext'
import { useReducer } from 'react'
import { placesReducer } from './placesReducer'
import { useEffect } from 'react'
import { getUserLocation } from '../../helpers'


const INITIAL_STATE = {
  isLoading: true,        // Boolean
  userLocation: undefined // [number, number]
}

export const PlacesProvider = ({children}) => {

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation()
        .then( lnglat => {
          dispatch( {type: 'setUserLocation', payload: lnglat } )})
  }, [])
  

  return (
    <PlacesContext.Provider value={{state, dispatch}}>
      {children}
    </PlacesContext.Provider>
  )
}
