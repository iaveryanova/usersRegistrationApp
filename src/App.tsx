import React, {useEffect, useState} from 'react';
import AppRoutes from './components/AppRoutes';
import NavBar from './components/NavBar';
import Cookies from 'js-cookie';
import './App.css';

interface UserContextType {
    token: string;
    setToken: (token: string) => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const App: React.FC = () =>{

    const initToken = Cookies.get('token');
    const [token, setToken] = useState(initToken ? initToken : '');

    useEffect(()=>{
        const initToken = Cookies.get('token');
        setToken(initToken ? initToken : '');
    })
    return (
        <UserContext.Provider value={ {token:token, setToken:setToken} }>
            <div className='App'>
                <AppRoutes />
                <NavBar />
            </div>
        </UserContext.Provider>
    );
}

export default App;
