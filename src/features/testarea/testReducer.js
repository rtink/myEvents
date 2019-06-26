import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { creatReducer } from '../../app/common/util/reducerUtils';

const initialState = {
  data: 42
}

const incrementCounter = (state) => {
  return {...state, data: state.data + 1};
}

const decrementCounter = (state) => {
  return {...state, data: state.data - 1};
}

export default creatReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter
})