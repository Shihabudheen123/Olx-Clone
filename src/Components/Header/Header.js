import React, { useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/ContextProvider'; // Correct context
import { useHistory ,Link} from 'react-router-dom'; 
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext); // Correct context usage
  const { firebase } = useContext(FirebaseContext); // Correct spelling

  // Debugging logs to check if user and firebase are defined
  console.log('User:', user);
  console.log('Firebase:', firebase);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'>          <OlxLogo />
          </Link>

        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone, and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              firebase.auth().signOut();
              history.push('/login');
            }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <Link to="/create">           <SellButtonPlus />
            </Link>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
