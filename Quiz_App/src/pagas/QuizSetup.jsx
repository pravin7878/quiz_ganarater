import React, { useEffect, useRef, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getData } from '../redux/slices/slices'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Spinner } from '@chakra-ui/react'

export const QuizSetup = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const nameRef = useRef(null)
  const catagoryRef = useRef(null)
  const dificultyRef = useRef(null)
  const numOfQRef = useRef(null)

  const [formStatus, setformStatus] = useState(null)
  const isLoading = useSelector((state)=>state.quizes.isLoding)
  
  // https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple

  const hendelSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const catagory = +catagoryRef.current.value
    const difficulty = dificultyRef.current.value
    const numOfQuesiton = +numOfQRef.current.value
    console.log(name, catagory, difficulty, numOfQuesiton);

    if (!name || !catagory || !difficulty || !numOfQuesiton) {
      setformStatus(false)
    }
    else {
      setformStatus(true)

      dispatch(getData({numOfQuesiton, catagory, difficulty}))

      nameRef.current.value = ""
      catagoryRef.current.value = ""
      dificultyRef.current.value = ""
      numOfQRef.current.value = ""

      setTimeout(()=>{
        nevigate("/quiz")
      },1000)
    }
  }
  
// useEffect(()=>{
//   dispatch(getData())
// },[])
return (
  <div className='w-[50%] m-auto p-10 flex justify-center flex-col items-center'>
    <h3 className='text-lg font-bold'>Set up Your Quiz</h3>
    
    <form
      className='p-8 gap-6 w-full flex flex-col bg-white shadow-lg rounded-lg max-w-lg mx-auto'
      onSubmit={hendelSubmit}
    >
      <p style={{color : formStatus ? "green" : "red"}}>{formStatus ? "Form is Submited" : "All Field are Requre" }</p>
      <input
        type="text"
        placeholder='Enter Your Name'
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ref={nameRef}
      />

      <select
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ref={catagoryRef}
      >
        <option value="0">Select Category</option>
        <option value="9">General Knowledge</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
      </select>

      <select
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ref={dificultyRef}
      >
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        placeholder='Enter number of Questions'
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ref={numOfQRef}
      />

      {isLoading ? 
        <button className='font-bold  p-3 rounded-md cursor-pointer border-2 border-[#F50157] transition-colors'>
        <Spinner color='red.500' /> 
      </button>
      :
      <input
        type="submit"
        value="START QUIZ"
        className="bg-[#F50157] font-bold text-white p-3 rounded-md cursor-pointer hover:bg-[#cc1a58] transition-colors"
      ></input>
      }
    </form>

  </div>
)
}
