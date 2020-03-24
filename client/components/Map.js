import React from 'react'
import {connect} from 'react-redux'
import Calendar from './Calendar'
// import 'react-day-picker/lib/style.css';

export class Map extends React.Component {
  // componentDidMount() {
  //   this.props.fetchItems()
  // }

  render() {
    return (
      <div>
        <div>Map</div>
        <Calendar />
      </div>
    )
  }
}

export default Map

// const mapStateToProps = state => ({
//   items: state.item
// })

// const mapDispatchToProps = dispatch => ({
//   fetchItems: () => dispatch(fetchItems())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Items)
