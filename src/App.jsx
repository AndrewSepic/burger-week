import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

import burgergeojson from './assets/output.json'


const INITIAL_CENTER = {
  lng: -72.75658, 
  lat: 44.08486
}

const INITIAL_ZOOM = 7.4

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()


  const handleButtonClick = () => {
    mapRef.current.fitBounds([[-73.39371, 43.25775],[-71.49898, 45.03464]], {
      padding: {top: 10, bottom:25, left: 155, right: 5}
    })
  }

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3c2VwaWMxIiwiYSI6ImNsbzV0NzQwNTAzYjQyd3MwbHVjaXR1cWUifQ.1Puj3xOeBUWw0cITO38elg'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center:  [INITIAL_CENTER.lng, INITIAL_CENTER.lat],
      zoom: 3
    }).fitBounds([
      [-73.39371, 43.25775],
      [-71.49898, 45.03464]
    ], {
      padding: {top: 10, bottom:25, left: 155, right: 5}
    })
  
  // Add markers to the map
  const geojson = burgergeojson;

  for (const feature of geojson.features) {
      // Create a DOM element for each marker
      const el = document.createElement('div');
      el.className = 'marker';
  
        // Create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="flex"><img src="./burger.png" alt="burger" /><h3>${feature.properties.name}</h3></div>
          <p><span class="bold">Burgers: </span>${feature.properties.menu}</p>
          <p class="address">${feature.properties.address}</p>
          <p><a href="${feature.properties.link}" target="_blank">More Info</a></p>`
          );
  
      // Add markers to the map
      new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(popup)
          .addTo(mapRef.current);

    
      // Add click event to the marker
      el.addEventListener('click', () => {
        marker.togglePopup(); // Toggle popup open or closed
      });
  }

  

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <div className="sidebar">
        <img src="/burger-week-logo-2024-500.webp" alt="Burger Week logo"/>
        <button className='reset-button' onClick={handleButtonClick}>
        Reset Map
      </button>
      </div>
    
      <div className="bottombar"></div>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default App