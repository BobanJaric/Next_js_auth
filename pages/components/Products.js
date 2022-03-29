import { useContext } from 'react';
import Product from "./Product";
import Link from 'next/link';
import { AuthContext } from '../../context/authContext'


const Products = ({ items }) => {

    const auth = useContext(AuthContext);

    return (
        <div className='product-main'>
            <div className='auth-holder'>
                <div className='email'>
                {!auth.isLoggedIn  ? '' : auth.user}
                </div>
                <div>
                    {!auth.isLoggedIn  ?
                        <Link href="/auth">
                            <button >
                                Sign-up/Login
                            </button>
                        </Link> :
                        <Link href="/auth">
                            <button onClick={auth.logout}>
                                Logout
                            </button>
                        </Link>
                    }
                </div>
            </div>
            {
                items.map((item) => {
                    return (
                        <Product key={item.category_id} item={item} />
                    )
                })
            }

        </div>
    )

}

export default Products;