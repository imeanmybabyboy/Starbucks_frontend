import { Link, Outlet } from "react-router-dom";
import "./ui/Menu.css";

export default function Menu() {
    return (
        <div
            className="py-3 border border-bottom-1 mb-5"
            style={{ backgroundColor: "#F9F9F9" }}
        >
            <div
                className="container p-0 d-flex gap-4"
                style={{ fontSize: "0.9rem" }}
            >
                <span>
                    <Link to="">Menu</Link>
                </span>
                <span>
                    <Link to="/featured">Featured</Link>
                </span>
                <span>
                    <Link to="previous">Previous</Link>
                </span>
                <span>
                    <Link to="favorites">Favorites</Link>
                </span>
            </div>

            <Outlet />
        </div>
    );
}
