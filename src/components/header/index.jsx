import { NavLink } from "react-router-dom";

function Header() {
  const linkClass =
    "px-4 py-2 text-sm font-medium hover:bg-gray-200 rounded transition";

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <NavLink to="/" className="text-xl font-bold text-gray-800">
          🛒 Shopping Cart 
        </NavLink>
        <nav className="flex gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-gray-300" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-gray-300" : ""}`
            }
          >
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
