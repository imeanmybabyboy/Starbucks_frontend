import { useContext, useEffect } from "react";
import "./ui/MainMenu.css";
import AppContext from "../../features/context/appContext/AppContext";

export default function MainMenu() {
    const {categories, setCategories} = useContext(AppContext)!;

    useEffect(() => {
        fetch("https://localhost:7174/Shop/ApiIndex", {
            method: "GET",
        })
            .then((r) => r.json())
            .then((j) => {
                setCategories(j.data);
            })
            .catch((error) => console.error("Fetch error: ", error));
    }, []);

    return (
        <div className="d-flex">
            <div className="fs-5 fw-bold" style={{fontFamily: "Quicksand, sans-serif"}}>
                {categories !== null && categories.length > 0 ? (
                    categories.map((category) => (
                        <div key={category.id}>{category.name}</div>
                    ))
                ) : null}
            </div>
        </div>
    );
}
