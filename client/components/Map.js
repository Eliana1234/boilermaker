import React from 'react'
import {connect} from 'react-redux'
import Calendar from './Calendar'

const mapboxgl = require('mapbox-gl')
// import 'react-day-picker/lib/style.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWxpYW5hMTIzNCIsImEiOiJjazV3cWQxMG4xeHd1M2RsYjNseHY2NWlqIn0.6Ep1UNJW2hu9AJy9hC9Cxw'

// const map = new mapboxgl.Map({
//   container: "map",
//   center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
//   zoom: 12, // starting zoom
//   style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
// });

// _onClickMap(map, evt) {
//   console.log(evt.lngLat);
// }

let map = new mapboxgl.Map({
  container: 'map',
  // container: this.mapContainer,
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [-74.009, 40.705],
  zoom: 12
  // center: [this.state.lng, this.state.lat],
  // zoom: this.state.zoom
})

export class Map extends React.Component {
  constructor(props) {
    super(props)
    // this.handleClickMap = this.handleClickMap.bind(this)

    this.state = {
      lng: -74.009,
      lat: 40.705,
      zoom: 12,
      clickedCoords: {lng: -74.009, lat: 40.705},
      showPopup: false
    }
  }

  // handleClickMap() {
  // event.preventDefault()
  // let lat = this.state.lat
  // let lng = this. state.lng
  // console.log('LONG AND LAT', lat, lng);
  // }

  // handleClickMap(map, evt) {
  //   console.log(map.getCenter().lng.toFixed(4));
  // }

  componentDidMount() {
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

    var selectorMarker = new mapboxgl.Marker({
      draggable: true,
      color: 'red'
    })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(map)

    selectorMarker.on('dragend', () => {
      var lngLat = selectorMarker.getLngLat()
      this.setState({
        clickedCoords: lngLat
      })
    })

    // map.on('click', e => {
    //   this.setState({
    //     clickedCoords: e.lngLat
    //   })
    //   console.log(this.state.clickedCoords)
    // })
  }

  render() {
    return (
      <div>
        <div>
          <Calendar clickedCoords={this.state.clickedCoords} map={map} />
        </div>
        <div>
          {/* <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div> */}
          {/* </div> */}
          {/* <div ref={el => (this.mapContainer = el)} className="mapContainer" /> */}
        </div>
      </div>
    )
  }
}

// export default Map

const mapStateToProps = state => ({
  outings: state.outing
})

// const mapDispatchToProps = dispatch => ({
//   fetchItems: () => dispatch(fetchItems())
// })

export default connect(mapStateToProps, null)(Map)
