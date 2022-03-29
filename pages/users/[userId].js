import { useContext,useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Auth from '../auth';

function UserPage() {

    const auth = useContext(AuthContext);
    const router = useRouter()

    useEffect(() => {
        if (!auth.isLoggedIn) {
          router.push('/auth')
        }
      }, [auth.isLoggedIn])

    return (
        <div className='user-card'>
            <div className='user-card-home'>
                <Link href="/">
                    <a  >
                        Home
                    </a>
                </Link>
            </div>
            <div className='user-card-details'>
                <div className='avatar' >
                     <img src={auth.user[2]} alt="user-image" />
                   {/*  <img src="/jb.jpg" alt="user-image" /> */}
                </div>
                <div className='user-details'>
                    <div>
                        <p>
                            Username: {auth.user[1]}
                        </p>
                    </div>
                    <div>
                        <p>
                            Email: {auth.user[0]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserPage;


