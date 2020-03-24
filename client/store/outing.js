import axios from 'axios'

const initialState = {
  outings: [],
  localUser: {}
}

const ADD_OUTING = 'ADD_OUTING'
const GET_USER_OUTINGS = 'GET_USER_OUTINGS'
const SET_LOCAL_USER = 'SET_LOCAL_USER'

const addOuting = outing => ({type: ADD_OUTING, outing})
const getUserOutings = userOutings => ({type: GET_USER_OUTINGS, userOutings})
const setLocalUser = user => ({type: SET_LOCAL_USER, user})

export const newOuting = (time, day, userId) => {
  return async dispatch => {
    console.log('HIT THE THUNK')
    try {
      const {data} = await axios.post(`/api/outings`, {
        time: time,
        day: day,
        userId: userId
      })
      console.log('USER AND OUTING INFO', data.user)
      if (data.user && data.outing) {
        dispatch(setLocalUser(data.user))
        dispatch(addOuting(data.outing))
        const stringifiedUser = JSON.stringify(data.user)
        localStorage.setItem('user', stringifiedUser)
      } else {
        dispatch(addOuting(data))
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

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_OUTING:
      return {
        ...state,
        outings: [...state.outings, action.outing]
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
    default:
      return state
  }
}
