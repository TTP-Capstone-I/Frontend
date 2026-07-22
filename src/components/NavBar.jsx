import { Link } from 'react-router'

function NavBar() {
    return (
        <nav>
            <Link to="/">Polls</Link>
            {' | '}
            <Link to="/create-poll">Create</Link>
        </nav>
    )
}

export default NavBar