
import { useSelector } from "react-redux";

import TabNavigator from "../Navigation/TabNavigator";
import AuthNavigator from "../Navigation/AuthNavigator";

const ScreenStart = () => {
    const user = useSelector (state => state.authReducer.value.email)
    return user ? <TabNavigator /> : <AuthNavigator />;
    
}

export default ScreenStart;