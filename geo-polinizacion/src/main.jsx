import React from 'react'
import ReactDOM from 'react-dom/client'
import { GeoPolinization } from './GeoPolinization.jsx'
import './main.css'

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc3RpYXAxNyIsImEiOiJjbGxoNmMyeGYxN2dtM2Zwamlrd3JlYnl0In0.fhzQn-2ObQ6pTv8BqccPEw';

if ( !navigator.geolocation ){
  alert( '¡Tu navegador no tiene la opcion de Geolocation!')
  throw new Error('¡Tu navegador no tiene la opcion de Geolocation!')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeoPolinization />
  </React.StrictMode>,
)
