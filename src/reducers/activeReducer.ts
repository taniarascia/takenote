import { ActionType } from 'constants/enums'
import { initialState } from 'constants/fakeState'

const activeReducer = (state = initialState[0].id, action) => {
  switch (action.type) {
    case ActionType.SWAP_NOTE:
      return action.payload
    default:
      return state
  }
}

export default activeReducer
