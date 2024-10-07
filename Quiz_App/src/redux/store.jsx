import {configureStore} from "@reduxjs/toolkit"
import quizeReducers from "./slices/slices"
const store = configureStore({
    reducer : {
        quizes : quizeReducers
    }
    
})

export default store