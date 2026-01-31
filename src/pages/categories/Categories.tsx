import { useContext, useEffect } from "react";
import "./ui/Categories.css";
import AuthContext from "../../features/context/authContext/AuthContext";
import AppContext from "../../features/context/appContext/AppContext";
import Alert from "../shared/alert/Alert";

const addCategoryFetchData = (categoryName: string | null) => {
    const j = fetch("https://localhost:7174/Shop/ApiAddCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ Name: categoryName }),
    }).then((r) => r.json());

    return j;
};

export default function Categories() {
    const { user, isAuthLoading } = useContext(AuthContext)!;
    const { categories, setCategories } = useContext(AppContext)!;

    useEffect(() => {
        if (isAuthLoading) return;

        if (!user) {
            window.location.href = "/";
        }
    }, [user, isAuthLoading]);

    useEffect(() => {
        fetch("https://localhost:7174/Shop/ApiIndex", {
            method: "GET",
        })
            .then((r) => r.json())
            .then((j) => {
                setCategories(j.data);
            })
            .catch((error) => console.error("Fetch error: ", error));
    }, [categories]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const category = formData.get("Name") as string;

        const btn = document.getElementById(
            "add-category",
        ) as HTMLButtonElement;
        if (!btn) return;

        const spinner = `<div class="spinner-border text-light" style="width: 25px; height: 25px" role="status">
                             <span class="visually-hidden">Loading...</span>
                     </div>`;

        if (!btn.classList.contains("loading")) {
            btn.innerHTML = spinner;
            btn.classList.add("loading");
            btn.disabled = true;
        }

        setTimeout(() => {
            if (category?.length === 0) {
                Alert.handleAlert(
                    {
                        status: "warning",
                        message: "Enter category name",
                    },
                    "category-add-alert-placeholder",
                );
                btn.innerHTML = "Add category";
                btn.classList.remove("loading");
                btn.disabled = false;

                return;
            }

            addCategoryFetchData(category).then((j) => {
                Alert.handleAlert(j, "category-add-alert-placeholder");
            });

            btn.innerHTML = "Add category";
            btn.classList.remove("loading");
            btn.disabled = false;
        }, 500);
    };

    return (
        <div
            className="d-flex justify-content-between my-3"
            style={{ fontFamily: "Quicksand, sans-serif" }}
        >
            <div className="w-50 border border-1 p-3 rounded-3 me-3 shadow-sm">
                <h4>Create New Category</h4>
                <hr />

                <div className="mb-3">
                    <form
                        method="post"
                        onSubmit={(e) => onSubmit(e)}
                        className="d-flex flex-column gap-3"
                    >
                        <div>
                            <label
                                htmlFor="category-input"
                                className="form-label fs-5"
                            >
                                Category Name
                            </label>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                id="category-input"
                                placeholder="Enter category name"
                                name="Name"
                            />
                        </div>

                        <button
                            className="btn btn-success shadow-none align-self-center mt-4 fw-bold"
                            style={{ width: "fit-content" }}
                            id="add-category"
                        >
                            Save category
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-50 border border-1 p-3 rounded-3 shadow-sm">
                <h4>Existing Categories</h4>

                <hr />

                <ul className="p-0">
                    {categories !== null && categories.length > 0
                        ? categories.map((category) => (
                              <li
                                  className="border-bottom ps-1 pb-1 mt-2 position-relative"
                                  style={{
                                      borderColor: "grey",
                                      listStylePosition: "inside",
                                  }}
                                  key={category.id}
                                  id={category.id}
                              >
                                  {category.name}
                              </li>
                          ))
                        : null}
                </ul>
            </div>
        </div>
    );
}
