import { useState, useCallback, useEffect } from 'react';


export const useAuth = () => {

    const [user, setUser] = useState(false);
    const [userToken, setUserToken] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = useCallback((user, isLoggedIn, userToken) => {

        setUser(user);
        setIsLoggedIn(isLoggedIn);
        setUserToken(userToken);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                user: user,
                isLoggedIn: isLoggedIn,
                userToken: userToken
            })
        );
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setIsLoggedIn(false);
        setUserToken(null);
        localStorage.removeItem('userData');
    }, []);


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            login(storedData.user, storedData.isLoggedIn, storedData.userToken);
        }
    }, [login]);

    return { login, logout, user, isLoggedIn, userToken };
};