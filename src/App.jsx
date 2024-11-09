import './App.css'
import { Router,Route, Routes } from 'react-router-dom'
import Home from './assets/page/Home'
import StarshipDetail from './assets/page/StarshipDetail'
import Starships from './assets/page/Starships'
function App() {


  return (
    <>
    {/* Define the Routes for the app */}
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/starships' element= {<Starships/>}/>
      <Route path='/starshipdetail/:id' element= {<StarshipDetail/>}/>
    </Routes>
     
    </>
  )
}

export default App
