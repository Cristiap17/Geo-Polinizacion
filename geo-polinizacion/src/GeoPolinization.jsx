import React from 'react'
import { PlacesProvider } from './context/places/PlacesProvider'
import { HomeScreen } from './screens/HomeScreen'
import { MapProvider } from './context'

export const GeoPolinization = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen/>
      </MapProvider>
    </PlacesProvider>
  )
}
