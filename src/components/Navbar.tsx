
import { navLinks } from '../../constants/index'

const Navbar = () => {
    return (
        <nav>
            <a href="#home" className='flex items-center gap-2'>
                <p>Velvet Pour</p>
            </a>
            <ul>
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
