import React from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'


function GeoapifySearch(props) {
  

    function onPlaceSelect(value) {

        props.handleAddressChange(value)
      }
    
      function onSuggestionChange(value) {
        console.log(value);
      }
    
      function preprocessHook(value) {
        return `${value}, Munich, Germany`
      }
    
      function postprocessHook(feature) {
        return feature.properties.street;
      }
    
      function suggestionsFilter(suggestions) {
        const processedStreets = [];
    
        const filtered = suggestions.filter(value => {
          if (!value.properties.street || processedStreets.indexOf(value.properties.street) >= 0) {
            return false;
          } else {
            processedStreets.push(value.properties.street);
            return true;
          }
        })
    
        return filtered;
      }
    
      return <GeoapifyContext apiKey={'8220c7bc37d549848ae86fd9d8324474'}>
    {/* process.env.GEO_API_KEY */}
          <GeoapifyGeocoderAutocomplete
            placeSelect={onPlaceSelect}
            suggestionsChange={onSuggestionChange}
          />
        </GeoapifyContext>
    }
    
    export default GeoapifySearch