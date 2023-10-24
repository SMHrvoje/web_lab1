import { useState } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage.tsx";
import Skeleton from "./components/Skeleton.tsx";
import AuthProvider from "./components/AuthProviderSkeleton.tsx";
import AppWrapper from "./components/AppWrapper.tsx";
import MyTournaments from "./pages/MyTournaments.tsx";
import TournamentForm from "./components/CreateTournamentForm.tsx";
import TournamentPage from "./pages/TournamentPage.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
        <AuthProvider>
           <AppWrapper>
              <Skeleton>
                  <Routes>
                      <Route path={"/"} element={<HomePage/>}/>
                      <Route path={"/myTournaments"} element={<MyTournaments/>}/>
                      <Route path="/tournament/:id" element={<TournamentPage/>} />
               </Routes>
              </Skeleton>
           </AppWrapper>
        </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
