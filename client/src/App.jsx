
import {Outlet,Navigate,Route,Routes,useLocation} from "react-router-dom"
import { useState } from 'react'
import { Footer, Navbar } from './components'



function Layout()
{
  const user=true;
  const loaction=useLocation();

  return user ? <Outlet/>:<Navigate/>
  
}
function App() {
  const [count, setCount] = useState(0)


  return (
    <main>
      <Navbar/>
      <Routes>

        <Route element={<Layout/>}/>
      
      </Routes>
      <Footer/>
   
   

    </main>
  )
}

export default App
