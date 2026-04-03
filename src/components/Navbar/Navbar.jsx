import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
function Navbar() {
  const navigate = useNavigate();
  //const { user, logout } = useContext(AuthContext);
    const { user, logout } = useAuth();

console.log("User:", user);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClose = () => setMenuOpen(false);
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };
 // const username = localStorage.getItem("username");
  return (
    <nav className="navbar">
       <div className="logo">QuickCart</div>
       {/* Hamburger */}
      <div 
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

       {/* Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}
                         onClick={() => setMenuOpen(false)}>
      <Link to="/" onClick={handleClose}>Home</Link>
      <Link to="/products" onClick={handleClose}>Products</Link>
      <Link to="/cart" onClick={handleClose}>Cart</Link>
      {user ? (
        <>
          <span style={{ color: "white" }}>Hi, {user}</span>
          <span
            style={{ cursor: "pointer", color: "white" }}
            onClick={handleLogout}>
            Logout
          </span>
        </>
      ) : (
        <Link to="/login" onClick={handleClose}>
          Login
        </Link>
      )}
      </div>
    </nav>
  );
}

export default Navbar;