import { useEffect, useState } from "react";
import { useDispatch} from "react-redux"
import authservice from "./appwrite/auth";
import { login,logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData) =>{
      if (userData) {
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setloading(false))
  },[])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className=" w-full block">
        <Header />
        <main>
          todo : {/*<Outlet></Outlet>*/}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
