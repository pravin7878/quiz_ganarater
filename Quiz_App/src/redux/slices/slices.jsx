import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { setData } from "../../utils/setData";

const initialState = {
    isLoding : false,
    isError : false,
    data : [],
    userName : ""
}





export const getData = createAsyncThunk("GET_DATA", async ({numOfQuesiton,catagory,difficulty,userName})=>{
    
    try {
        const res = await axios.get(`https://opentdb.com/api.php?amount=${numOfQuesiton}&category=${catagory}&difficulty=${difficulty}&type=multiple`)
        return {...res.data,userName}
    } catch (error) {
        console.log(error);
        
        return error
    }
    
    
})



const quizeSlise = createSlice({
    name: "quiz",
    initialState,
    reducers : {
        addQuiz : ()=>{},
    },
    extraReducers : (bulder)=>{
        bulder.addCase(getData.pending , (state,action)=>{
              state.isLoding = true
        })

        bulder.addCase(getData.fulfilled , (state,action)=>{
            console.log(action.payload)
            state.isLoding = false
            state.data = action.payload
        })

        bulder.addCase(getData.rejected , (state,action)=>{
            console.log("error is fatching" , action.payload);
            state.isLoding = false
            state.isError = true
        })
    }
})

export default quizeSlise.reducer
export const {addQuiz} = quizeSlise.actions
