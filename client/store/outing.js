import axios from 'axios'

const initialState = {
  outings: [],
  mapOutings: [],
  localUser: {},
  errorMessage: false
}

const ADD_OUTING = 'ADD_OUTING'
const GET_USER_OUTINGS = 'GET_USER_OUTINGS'
const SET_LOCAL_USER = 'SET_LOCAL_USER'
const DELETE_OUTING = 'DELETE_OUTING'
const SET_OUTINGS = 'SET_OUTINGS'

const addOuting = outing => ({type: ADD_OUTING, outing})
const getUserOutings = userOutings => ({type: GET_USER_OUTINGS, userOutings})
const setLocalUser = user => ({type: SET_LOCAL_USER, user})
const deleteOuting = outing => ({type: DELETE_OUTING, outing})
const setOutings = outings => ({type: SET_OUTINGS, outings})

export const newOuting = (time, day, userId, location) => {
  return async dispatch => {
    console.log('HIT THE THUNK')
    console.log('THUNK DAY', day)
    console.log('THUNK LOCATION', location)
    try {
      const {data} = await axios.post(`/api/outings`, {
        time: time,
        day: day,
        userId: userId,
        location: location
      })
      console.log('USER AND OUTING INFO', data.user)
      // eslint-disable-next-line no-lonely-if
      if (data.user && data.outing) {
        dispatch(setLocalUser(data.user))
        dispatch(addOuting(data.outing))
        const stringifiedUser = JSON.stringify(data.user)
        localStorage.setItem('user', stringifiedUser)
      } else {
        // eslint-disable-next-line no-lonely-if
        if (data === 'You have already scheduled for that day and time') {
          // eslint-disable-next-line no-alert
          window.alert('You have already scheduled for that day and time')
          // dispatch(setErrorMessage(data))
        } else {
          dispatch(addOuting(data))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchUserOutings = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/outings/${userId}`)
      console.log('HERE IS THE USER OUTING DATA', data)
      dispatch(getUserOutings(data.outings))
    } catch (error) {
      console.log(error)
    }
  }
}

export const unassignOuting = (outingId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/outings/${outingId}/${userId}`)
      dispatch(deleteOuting(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const seeOutings = (time, day) => {
  return async dispatch => {
    try {
      console.log('HIT THE SEE OUTING THUNK')
      console.log('DAY AND TIME', day, time)
      const {data} = await axios.post(`/api/outings/map`, {
        time: time,
        day: day
      })
      console.log('RETURNED MAP_OUTING DATA', data)
      dispatch(setOutings(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_OUTING:
      return {
        ...state,
        outings: [...state.outings, action.outing]
      }
    case SET_OUTINGS:
      return {
        ...state,
        mapOutings: action.outings
      }
    case GET_USER_OUTINGS:
      return {
        ...state,
        outings: action.userOutings
      }
    case SET_LOCAL_USER:
      return {
        ...state,
        localUser: action.user
      }
    case DELETE_OUTING:
      return {
        ...state,
        outings: [
          ...state.outings.filter(element => element.id !== action.outing.id)
        ]
      }
    default:
      return state
  }
}
