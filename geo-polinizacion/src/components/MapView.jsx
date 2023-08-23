import { Map } from 'mapbox-gl'
import { MapContext, PlacesContext } from '../context'
import { useContext, useRef, useLayoutEffect, useState } from 'react'
import { Loading } from './Loading'
import { DATA } from '../utils/data'

export const MapView = () => {

  const { state } = useContext(PlacesContext)
  const { setMap, setMarkers, setLines, coords, setCoords } = useContext(MapContext)
  const mapDiv = useRef(null)

  const [dates, setDates] = useState({ date1: '', date2: '' })
  const [dateSelect, setDateSelect] = useState('')

  useLayoutEffect(() => {
    if (!state.isLoading) {
      const map = new Map({
        container: mapDiv.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: state.userLocation, // starting position [lng, lat]
        zoom: 16, // starting zoom
      });

      setMap(map)
      setMarkers(map)
      setLines(map)
    }

  }, [state.isLoading, coords])

  if (state.isLoading) {
    return (<Loading />)
  }

  const handleUserSelect = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'Ernesto Jaraba') {
      setDates({
        ...dates,
        date1: DATA.data[0].date1.date,
        date2: DATA.data[0].date2.date
      })
    }

    if (e.target.value === 'John Ruiz') {
      setDates({
        ...dates,
        date1: DATA.data[1].date1.date,
        date2: DATA.data[1].date2.date
      })
    }
  }

  const handleDateSelect = (e) =>{
      setDateSelect(e.target.value)
  }

  const handleSearch = () =>{
    if(dateSelect === DATA.data[0].date1.date){
      setCoords(DATA.data[0].date1.position)
    };
    if(dateSelect === DATA.data[0].date2.date){
      setCoords(DATA.data[0].date2.position)
    };
    if(dateSelect === DATA.data[1].date1.date){
      setCoords(DATA.data[1].date1.position)
    };
    if(dateSelect === DATA.data[1].date2.date){
      setCoords(DATA.data[1].date2.position)
    };
  }

  return (
    <>
      <select
        class="form-select"
        onChange={handleUserSelect}
        aria-label="Default select example"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 999,
          cursor: 'pointer',
          width: '30%'
        }}
      >
        <option selected>Seleccionar colaborador</option>
        <option value={DATA.data[0].user.name}>{DATA.data[0].user.name}</option>
        <option value={DATA.data[1].user.name}>{DATA.data[1].user.name}</option>
      </select>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={handleDateSelect}
        style={{
          position: 'fixed',
          top: '20px',
          left: '300px',
          zIndex: 999,
          cursor: 'pointer',
          width: '30%'
        }}
      >
        <option selected>Seleccionar fecha</option>
        <option value={dates.date1}>{dates.date1}</option>
        <option value={dates.date2}>{dates.date2}</option>
        {/* {
          DATA.data.map((user) => {
            console.log(user.user.name);
            <option value="1">{user.user.name}</option>
          })
        } */}
      </select>
      <button
        className='btn btn-danger'
        onClick={handleSearch}
        style={{
            position: 'fixed',
            top: '20px',
            right: '235px',
            zIndex: 999
        }}
      >
        Buscar rutas
      </button>
      <div ref={mapDiv}
        style={{
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
      </div>
    </>
  )
}
