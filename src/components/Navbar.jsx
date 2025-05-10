import styles from './Navbar.module.css'
import { NavLink,useNavigate} from "react-router-dom";
import { useAuth} from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser,logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);  
    }
};

  return (
    <nav className={styles.navbar}>
      <ul className={styles.links_list}>
        {!currentUser && (
          <>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `${styles.brand} ${isActive ? styles.active : ""}`
          }
        >
          <li>Login</li>
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <li>Registrar</li>
        </NavLink>
          </>
        )}
        {currentUser && (
          <>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <li>Dashboard</li>
        </NavLink>

        <NavLink
          to="/createpost"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <li>Criar Post</li>
        </NavLink>

        <button onClick={handleLogout} className={styles.exit}>Sair</button>
          </>
        )}
      </ul>
    </nav>
  );
}; 

export default Navbar