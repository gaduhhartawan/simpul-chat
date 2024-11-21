import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="mb-5 border-b-2 pb-3">
      <nav className="flex items-center justify-between px-5">
        <h1 className="text-xl font-bold">Chat App</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {token && (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
