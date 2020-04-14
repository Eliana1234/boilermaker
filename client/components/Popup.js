import React from 'react'
import styled from 'styled-components'

class Popup extends React.Component {
  render() {
    return (
      <Wrapper>
        <div className="popup">
          <p>{this.props.text1}</p>
          <p>{this.props.text2}</p>
          <p>{this.props.text3}</p>
          <p>{this.props.text4}</p>
          {/* <button onClick={this.props.closePopup}></button>   */}
        </div>
      </Wrapper>
    )
  }
}

export default Popup

const Wrapper = styled.div`
  .popup {
    border: 1px solid black;
    text-align: left;
    // color: #FAFAD2;
    background-color: white;
    font-family: 'Helvetica Neue';
    font-size: 10px;
    // margin: auto;
    width: 60%;
    padding: 5px 5px 5px 5px;
    // border-radius: 5%;
    bottom: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  // .popupParent {
  //   align-content: flex-start;
  //   height:100%;
  //   width:100%;
  // }

  p {
    margin-bottom: 0.01px;
    margin-top: 0.01px;
  }

  button {
    width: 50px;
  }
`
