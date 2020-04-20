/* eslint-disable complexity */
/* eslint-disable react/no-unused-state */
import React from 'react'
import {connect} from 'react-redux'
import Popup from './Popup'
import styled from 'styled-components'

// import 'react-day-picker/lib/style.css';

const defaultState = {
  showPopup: false
}

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.togglePopup = this.togglePopup.bind(this)

    this.state = defaultState
  }

  togglePopup() {
    let currPopupState = this.state.showPopup
    this.setState({
      showPopup: !currPopupState
    })
  }

  render() {
    const InstructionOne = '1. Select a date from the calendar'
    const InstructionTwo = '2. Select a time from the drop-down'
    const InstructionThree = '3. Move the red marker to your outing location'
    const InstructionFour =
      "4. Click 'Submit outing' to record an outing at that date/time and location"
    return (
      <div>
        <Wrapper>
          <div className="parentContainer">
            <div className="title">SafeWalk</div>
            <div className="popblock">
              <button
                type="submit"
                className="about"
                onClick={this.togglePopup.bind(this)}
              >
                {' '}
                How to use this page
              </button>
              <div>
                {this.state.showPopup ? (
                  <Popup
                    text1={InstructionOne}
                    text2={InstructionTwo}
                    text3={InstructionThree}
                    text4={InstructionFour}
                    closePopup={this.togglePopup.bind(this)}
                  />
                ) : null}
              </div>
            </div>
            <div />
          </div>
        </Wrapper>
      </div>
    )
  }
}

const Wrapper = styled.div`
  .popblock {
    display: flex;
  }

  .title {
    font-family: 'Helvetica Neue';
    color: red;
    font-weight: 200;
    font-size: 40px;
  }

  .parentContainer {
    position: relative;
  }

  .about {
    font-family: 'Helvetica Neue';
    font-weight: 200;
    font-size: 10px;
    background-color: white;
    color: black;
    margin: 0px 10px 0px 10px;
    width: 70px;
    border-radius: 10%;
  }

  button:hover {
    background-color: yellow;
  }
`

export default Header
