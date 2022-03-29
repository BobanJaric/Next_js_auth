import '../styles/globals.css'
import './index.css';
import '../pages/auth/auth.css';
import '../pages/users/user.css';
import { AuthContext } from '../context/authContext';
import { useAuth } from '../hooks/auth-hook';

function MyApp({ Component, pageProps }) {
  const { user, login, logout, isLoggedIn, userToken } = useAuth();
  return (
    <AuthContext.Provider value={{ user: user, isLoggedIn: isLoggedIn, userToken: userToken, login: login, logout: logout }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
