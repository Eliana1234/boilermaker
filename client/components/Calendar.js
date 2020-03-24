/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import DayPicker from 'react-day-picker'
import {newOuting, fetchUserOutings} from '../store/outing'
// import 'react-day-picker/lib/style.css';

const defaultState = {
  selectedDay: undefined,
  selectedTime: undefined
}

export class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitOuting = this.handleSubmitOuting.bind(this)

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
    const time = this.state.selectedTime
    const day = this.state.selectedDay.toLocaleDateString()
    console.log(time, day)
    console.log('INFO', time, day, userId)
    this.props.newOuting(time, day, userId)
    // this.setState(defaultState)
  }

  render() {
    const outings = this.props.outings.outings
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
            {this.state.selectedDay ? (
              <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
            ) : (
              <p>Please select a day.</p>
            )}
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
            {this.state.selectedDay ? (
              <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
            ) : (
              <p>Please select a day.</p>
            )}
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
            <button type="submit" onClick={this.handleSubmitOuting}>
              Submit outing
            </button>
          </div>
          <div>
            <div>
              My Outings:
              {outings.map(element => (
                <div key={element.id}>
                  <p>{element.day}</p>
                  <p>{element.time}</p>
                  <button
                    type="submit"
                    onClick={() => this.handleDelete(element.id)}
                  >
                    {' '}
                    Remove{' '}
                  </button>
                </div>
              ))}
            </div>
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
  newOuting: (time, day, userId) => dispatch(newOuting(time, day, userId)),
  fetchUserOutings: userId => dispatch(fetchUserOutings(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
