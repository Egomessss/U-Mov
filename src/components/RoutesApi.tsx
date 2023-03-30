import axios from "axios";
import React, { useRef } from "react"

function RoutesApi() {




  
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME',
          'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters,status,condition'
        }
      };
      
      const data = {
        "origins": [
          {
            "waypoint": {
              "location": {
                "latLng": {
                  "latitude": 37.420761,
                  "longitude": -122.081356
                }
              }
            },
            "routeModifiers": { "avoid_ferries": true}
          },
          {
            "waypoint": {
              "location": {
                "latLng": {
                  "latitude": 37.403184,
                  "longitude": -122.097371
                }
              }
            },
            "routeModifiers": { "avoid_ferries": true}
          }
        ],
        "destinations": [
          {
            "waypoint": {
              "location": {
                "latLng": {
                  "latitude": 37.420999,
                  "longitude": -122.086894
                }
              }
            }
          },
          {
            "waypoint": {
              "location": {
                "latLng": {
                  "latitude": 37.383047,
                  "longitude": -122.044651
                }
              }
            }
          }
        ],
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE"
      };
      
      axios.post('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', data, config)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error);
        })


  return <div>DistanceMatrix</div>
}

export default RoutesApi
