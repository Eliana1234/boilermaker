/* eslint-disable complexity */
/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import DayPicker from 'react-day-picker'
import {
  newOuting,
  fetchUserOutings,
  unassignOuting,
  seeOutings
} from '../store/outing'
// import 'react-day-picker/lib/style.css';

const mapboxgl = require('mapbox-gl')
// import 'react-day-picker/lib/style.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWxpYW5hMTIzNCIsImEiOiJjazV3cWQxMG4xeHd1M2RsYjNseHY2NWlqIn0.6Ep1UNJW2hu9AJy9hC9Cxw'

const defaultState = {
  selectedDay: undefined,
  selectedTime: undefined,
  currentMarkers: []
}

export class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitOuting = this.handleSubmitOuting.bind(this)
    this.handleUnassign = this.handleUnassign.bind(this)
    this.handleSeeOutings = this.handleSeeOutings.bind(this)

    this.state = defaultState
  }

  componentDidMount() {
    let userId
    let user = localStorage.getItem('user')
    if (user) {
      let currUser = JSON.parse(localStorage.getItem('user'))
      userId = currUser.id
      this.props.fetchUserOutings(userId)
    }
  }

  handleDayClick(day, {selected}) {
    if (selected) {
      // Unselect the day if already selected
      this.setState({selectedDay: undefined})
      return
    }
    this.setState({selectedDay: day})
  }

  handleChange(event) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      selectedTime: event.target.value
    })
  }

  handleUnassign(outingId) {
    let currUser = JSON.parse(localStorage.getItem('user'))
    let userId = currUser.id
    this.props.unassignOuting(outingId, userId)
  }

  handleSubmitOuting() {
    event.preventDefault()
    let userId
    console.log('LOCAL STORAGE USER', JSON.parse(localStorage.getItem('user')))
    let currUser = JSON.parse(localStorage.getItem('user'))
    if (currUser) {
      userId = currUser.id
    } else {
      // if (localStorage.getItem('user')){
      //   const user = JSON.parse(localStorage.getItem('user'))
      //   console.log(user)
      // }
      userId = 'guest'
    }
    const clickedCoords = this.props.clickedCoords
    const lat = clickedCoords.lat
    const lng = clickedCoords.lng
    let location = []
    location.push(lng)
    location.push(lat)
    console.log('LOCATION ARRAY', location)
    const time = this.state.selectedTime
    const day = this.state.selectedDay.toLocaleDateString()
    console.log(time, day)
    console.log('INFO INCLUDING COORDS', time, day, userId, location)
    this.props.newOuting(time, day, userId, location)
    // this.setState(defaultState)
  }

  handleSeeOutings() {
    event.preventDefault()
    console.log('CURRENT MARKERS', this.state.currentMarkers)
    this.state.currentMarkers.map(element => {
      element.remove()
    })
    this.setState({
      currentMarkers: []
    })
    const time = this.state.selectedTime
    const day = this.state.selectedDay.toLocaleDateString()
    console.log('TIME AND DAY', time, day)
    if (time && day) {
      console.log('ARE TIME AND DAY DEFINED', time, day)
      this.props.seeOutings(time, day)
    }
    let currentMarkers = []
    if (this.props.outings.mapOutings.length > 0) {
      this.props.outings.mapOutings.map(element => {
        let userMarker = new mapboxgl.Marker({})
        userMarker.setLngLat(element.location)
        userMarker.addTo(this.props.map)
        currentMarkers.push(userMarker)
      })
    }
    this.setState({
      currentMarkers: currentMarkers
    })
  }

  render() {
    const outings = this.props.outings.outings
    const mapOutings = this.props.outings.mapOutings

    console.log('MAP OUTINGS', mapOutings)
    console.log('PROPS', this.props)
    console.log('STATE', this.state)
    const timeArr = [
      '6:00 AM',
      '7:00 AM',
      '8:00 AM',
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '1:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
      '6:00 PM',
      '7:00 PM',
      '8:00 PM',
      '9:00 PM',
      '10:00 PM',
      '11:00 PM',
      '12:00 AM',
      '1:00 AM',
      '2:00 AM',
      '3:00 AM',
      '4:00 AM',
      '5:00 AM'
    ]
    if (outings === undefined || outings.length === 0 || !outings) {
      return (
        <div>
          <div>
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
            />
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Time:
                <select value={this.state.value} onChange={this.handleChange}>
                  {timeArr.map(element => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </label>
            </form>
            <div>
              {this.state.selectedDay && this.state.selectedTime ? (
                <p>
                  You clicked {this.state.selectedDay.toLocaleDateString()} and{' '}
                  {this.state.selectedTime}
                </p>
              ) : (
                <p>Please select a day and time.</p>
              )}
            </div>
            <button type="submit" onClick={this.handleSeeOutings}>
              See outings for this date and time
            </button>
            <button type="submit" onClick={this.handleSubmitOuting}>
              Submit outing
            </button>
          </div>
          <div>
            <div>My Outings: No outings yet! Add an outing</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
            />
            {/* {this.state.selectedDay ? (
              <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
            ) : (
              <p>Please select a day.</p>
            )} */}
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Time:
                <select value={this.state.value} onChange={this.handleChange}>
                  {timeArr.map(element => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </label>
            </form>
            <div>
              {this.state.selectedDay && this.state.selectedTime ? (
                <p>
                  You clicked {this.state.selectedDay.toLocaleDateString()} and{' '}
                  {this.state.selectedTime}
                </p>
              ) : (
                <p>Please select a day and time.</p>
              )}
            </div>
            <div>
              <div>
                My Outings:
                {outings.map(element => (
                  <div key={element.id}>
                    <p>{element.time}</p>
                    <p>{element.day}</p>
                    <button
                      type="submit"
                      onClick={() => this.handleUnassign(element.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* <button type="submit" onClick={this.handleSeeOutings}>
              See outings for this time
            </button> */}
            <button type="submit" onClick={this.handleSubmitOuting}>
              Submit outing
            </button>
            <button type="submit" onClick={this.handleSeeOutings}>
              See outings for this date and time
            </button>
            <div />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  outings: state.outing
})

const mapDispatchToProps = dispatch => ({
  newOuting: (time, day, userId, location) =>
    dispatch(newOuting(time, day, userId, location)),
  fetchUserOutings: userId => dispatch(fetchUserOutings(userId)),
  unassignOuting: (outingId, userId) =>
    dispatch(unassignOuting(outingId, userId)),
  seeOutings: (time, day) => dispatch(seeOutings(time, day))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
