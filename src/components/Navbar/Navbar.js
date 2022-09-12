import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NavItems() {
    const [isExist, setIsExist] = useState(false)

    useEffect(() => {
        if (localStorage?.getItem('token')) setIsExist(true);
    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsExist(false)
        window.location.reload(false);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <div className='navbar-container' >
                <div className='nav-items'>
                    <Navbar.Brand href="#home">MY MALL</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                </div>
                {
                    isExist ? <Button onClick={logout} variant="light">Log Out</Button> :
                        <div>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/auth">Sign Up/Sign In</Nav.Link>
                            </Nav>

                        </div>
                }
            </div>
        </Navbar>
    );
}

export default NavItems;