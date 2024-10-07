import React from 'react'
import { Route, Routes } from "react-router-dom"
import { QuizSetup } from '../pagas/QuizSetup'
import { QuizPage } from '../pagas/QuizPage'
import { Leaderboard } from '../pagas/Leaderboard'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<QuizSetup/>}/>
      <Route path='/quiz' element={<QuizPage/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>}/>
    </Routes>
  )
}
