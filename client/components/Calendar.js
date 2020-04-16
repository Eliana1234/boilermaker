/* eslint-disable no-alert */
/* eslint-disable complexity */
/* eslint-disable react/no-unused-state */
import React from 'react'
import styled from 'styled-components'
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
  // currentMarkers: [],
  showPopup: false,
  errorMessage: false
}

let currentMarkers = []

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
    // localStorage.clear()
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
    let currUser = JSON.parse(localStorage.getItem('user'))
    if (currUser) {
      userId = currUser.id
    } else {
      userId = 'guest'
    }
    const clickedCoords = this.props.clickedCoords
    const lat = clickedCoords.lat
    const lng = clickedCoords.lng
    let location = []
    location.push(lng)
    location.push(lat)
    const time = this.state.selectedTime
    const day = this.state.selectedDay.toLocaleDateString()
    console.log(
      'HERE ARE THE OUTINGS IN SUBMIT OUTINGS FUNC',
      this.props.outings.outings
    )
    this.props.newOuting(time, day, userId, location)
  }

  handleSeeOutings() {
    event.preventDefault()
    if (currentMarkers.length > 0) {
      currentMarkers.map(element => {
        element.remove()
      })
    }
    const time = this.state.selectedTime
    const day = this.state.selectedDay.toLocaleDateString()
    if (time && day) {
      this.props.seeOutings(time, day)
    }
  }

  render() {
    console.log('PROPS', this.props)
    const outings = this.props.outings.outings
    const mapOutings = this.props.outings.mapOutings
    console.log('WHAT ARE THE MAP OUTINGS RIGHT NOW', mapOutings)
    if (mapOutings.length > 0) {
      mapOutings.map(element => {
        let userMarker = new mapboxgl.Marker({})
        userMarker.setLngLat(element.location)
        currentMarkers.push(userMarker)
        userMarker.addTo(this.props.map)
      })
    }
    const timeArr = [
      'Please select a time',
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
                  You selected {this.state.selectedDay.toLocaleDateString()} and{' '}
                  {this.state.selectedTime} at [{this.props.clickedCoords.lng.toFixed(
                    3
                  )}, {this.props.clickedCoords.lat.toFixed(3)}]
                </p>
              ) : (
                <p>Please select a day and time.</p>
              )}
            </div>
            <Wrapper>
              <div className="buttons">
                <button type="submit" onClick={this.handleSubmitOuting}>
                  Submit outing
                </button>
                <button type="submit" onClick={this.handleSeeOutings}>
                  See outings for this date and time
                </button>
              </div>
              <div>
                <div className="outings">
                  <div>
                    My Outings:
                    <p>
                      No outings yet! Add an outing by selecting a date, time
                      and location on the map
                    </p>
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            {/* <div>
          {JSON.parse(this.props.clickedCoords)}
          </div> */}
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
                    You selected {this.state.selectedDay.toLocaleDateString()}{' '}
                    and {this.state.selectedTime} at [{this.props.clickedCoords.lng.toFixed(
                      3
                    )}, {this.props.clickedCoords.lat.toFixed(3)}]
                  </p>
                ) : (
                  <p>Please select a day, time and location.</p>
                )}
              </div>
              <Wrapper>
                <div className="buttons">
                  <button type="submit" onClick={this.handleSubmitOuting}>
                    Submit outing
                  </button>
                  <button type="submit" onClick={this.handleSeeOutings}>
                    See outings for this date and time
                  </button>
                </div>
                <div>
                  <div className="outings">
                    My Outings:
                    {outings.map(element => (
                      <div key={element.id}>
                        <p>
                          {element.day} at {element.time}{' '}
                          <button
                            type="submit"
                            onClick={() => this.handleUnassign(element.id)}
                          >
                            Remove
                          </button>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Wrapper>
            </div>
            {/* <button type="submit" onClick={this.handleSeeOutings}>
              See outings for this time
            </button> */}
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

const Wrapper = styled.div`
  .outings {
    border: 1px solid black;
    margin: 20px 0px 0px 0px;
    padding: 10px 10px 10px 10px;
  }

  .buttons button {
    border: 1px solid black;
    margin: 0px 20px 0px 0px;
    padding: 5px 5px 5px 5x;
  }

  button:hover {
    background-color: yellow;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
