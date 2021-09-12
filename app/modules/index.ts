import {Action, combineReducers} from "redux";
import {ItemsReducer} from "./items";
import {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    items: ItemsReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default rootReducer;
