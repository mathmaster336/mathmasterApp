import "./global.css"
import Navigator from './src/Navigator/Navigator'
import { commonContext } from './src/ContextApi/commonContext'
import { useContext, useEffect } from "react";
import StorageHelper from "./src/firebaseMethod/storageHelper";
function App() {
  const { theme, isLoggedIn, setisLoggedIn } = useContext(commonContext);
  useEffect(() => {
    const token = StorageHelper.getData("user_token")
    console.log("app token", token)

    if (!token) {

      setisLoggedIn(false)
    } else {
      console.log("app token", token)
      setisLoggedIn(true)

      if (token._j) {

      }
    }
  }, [])



  return (

    <Navigator />
  )
}

export default App