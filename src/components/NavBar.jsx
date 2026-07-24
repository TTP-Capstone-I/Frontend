import { Link } from 'react-router'

function NavBar() {
    return (
        <nav className="nav-bar">
            <Link to="/" className="nav-button">Polls</Link>
            <Link to="/create-poll" className="nav-button">Create</Link>
        </nav>
    )
}

export default NavBar