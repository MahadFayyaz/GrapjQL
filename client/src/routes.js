import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreateQuote from './components/CreateQuote';
import Home from './components/Home';
import OtherUserProfile from './components/OtherUserProfile';
import GetUsers from './components/GetUsers';

export const routes = [
    {path:"/",element:<Profile />},
    {path:"/home",element:<Home />},
    {path:"/create",element:<CreateQuote />},
    {path:"/login",element:<Login />},
    {path:"/signup",element:<Signup />},
    {path:"/profile",element:<Profile />},
    {path:"/profile/:userid",element:<OtherUserProfile/> },
    {path:"/getallusers",element:<GetUsers/> }
]