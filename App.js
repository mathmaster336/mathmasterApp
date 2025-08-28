import "./global.css"
import Navigator from './src/Navigator/Navigator'
import { commonContext } from './src/ContextApi/commonContext'
import { useContext, useEffect } from "react";
import StorageHelper from "./src/firebaseMethod/storageHelper";
function App() {
  const { theme, isLoggedIn, setisLoggedIn } = useContext(commonContext);
  useEffect(() => {
    const token = StorageHelper.getData("user_token")
    console.log("app token",token)
    
    if (!token) {

      setisLoggedIn(false)
    } else {
      setisLoggedIn(true)
    }
  }, [])



  return (
    // <View className='bg-blue-200'>  
    //   <Text>This is Icon</Text>
    //   <Icon name="rocket" size={30} color="#900" />

    // </View>
    // <Navigator />
    <Navigator />
  )
}

export default App