import { Link } from "react-router-dom";
import "./ui/Home.css";

export default function Home() {
    window.addEventListener("resize", () => {
        for (let item of document.querySelectorAll("[data-home-content]")) {
            if (window.innerWidth < 750) {
                // addding flex column to all divs
                item.classList.add("flex-column");

                // removing width to img and div to make their width 100%
                item.querySelector("img")?.classList.remove("w-50");
                item.querySelector("div")?.classList.remove("w-50");

                // removing flex-row-reverse
                if (item.classList.contains("flex-row-reverse")) {
                    item.classList.remove("flex-row-reverse");
                }
            } else if (window.innerWidth >= 750) {
                // removing flex column to all divs
                item.classList.remove("flex-column");

                // adding width to img and div to make their width 50%
                item.querySelector("img")?.classList.add("w-50");
                item.querySelector("div")?.classList.add("w-50");

                // adding flex-row-reverse to items that have such attribute
                if (item.hasAttribute("data-flex-row-reverse")) {
                    item.classList.add("flex-row-reverse");
                }
            }
        }

        for (let item of document.querySelectorAll("p")) {
            if (window.innerWidth < 750) {
                item.classList.remove("w-50")
                item.classList.add("m-3")
            } else if (window.innerWidth >= 750) {
                item.classList.add("w-50")
                item.classList.remove("m-3")
            }
        }
    });

    return (
        <div className="d-flex flex-column gap-4">
            <h2
                className="link-light fs-5 py-5 m-0 d-flex align-items-center justify-content-center gap-3"
                style={{
                    backgroundColor: "#32462F",
                }}
            >
                <span className="fw-bold">It's a great day for coffee</span>

                <Link
                    to="menu"
                    className="btn btn-outline-light rounded-pill border-2 fw-bold shadow-none"
                    id="start-order"
                >
                    Start an order
                </Link>
            </h2>

            <div
                className="d-flex"
                data-home-content
                style={{ backgroundColor: "#006342" }}
            >
                <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-105306.jpg"
                    alt="caramel-protein"
                    className="w-50 object-fit-contain"
                />

                <div className="w-50 p-3 d-flex flex-column align-items-center justify-content-center gap-4">
                    <h4 className="link-light fs-3">Caramel protein is here</h4>
                    <div
                        className="w-75 fs-5 text-center link-light"
                        style={{ lineHeight: "2rem" }}
                    >
                        Power up with the new Caramel Protein Latte and Caramel
                        Protein Matcha. Handcrafted with Protein-boosted Milk
                        for up to 31 grams of protein per grande. Enjoy hot or
                        iced with sugar-free options.
                    </div>
                    <Link
                        to="/giftcards"
                        id="explore-caramel-protein"
                        className="btn btn-light rounded-pill shadow-none fw-bold"
                        style={{ color: "#00754A" }}
                    >
                        Explore caramel protein
                    </Link>
                </div>
            </div>

            <div
                className="d-flex flex-row-reverse"
                data-home-content
                data-flex-row-reverse
                style={{ backgroundColor: "#F5F1EB" }}
            >
                <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-105315.jpg"
                    alt="pistachio"
                    className="w-50 object-fit-contain"
                />

                <div
                    className="w-50 p-3 d-flex flex-column align-items-center justify-content-center gap-4"
                    style={{
                        color: "#006342",
                        lineHeight: "2rem",
                    }}
                >
                    <h4 className="fs-3">Hello, pistachio</h4>
                    <div className="w-75 fs-5 text-center">
                        A beloved flavor is back with the delicious new
                        Pistachio Cortado, Pistachio Cream Cold Brew and
                        favorite Pistachio Latte. Salty-sweet comfort any time
                        of day.
                    </div>
                    <Link
                        to="/giftcards"
                        id="explore-pistachio"
                        className="btn btn-outline-light rounded-pill shadow-none fw-bold"
                        style={{
                            color: "#00754A",
                            backgroundColor: "#F5F1EB",
                            border: "1px solid #00754A",
                        }}
                    >
                        Explore pistachio
                    </Link>
                </div>
            </div>

            <div
                className="d-flex"
                data-home-content
                style={{ backgroundColor: "#006342", lineHeight: "2rem" }}
            >
                <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-105422.jpg"
                    alt="snack-smart-with-Khloé-Kardashian"
                    className="w-50 object-fit-contain"
                />

                <div className="w-50 p-3 d-flex flex-column align-items-center justify-content-center gap-4 link-light">
                    <h4 className="fs-3">Snack smart with Khloé Kardashian</h4>
                    <div className="w-75 fs-5 text-center">
                        Fuel your day and order Khloé’s secret menu protein
                        drink, only in the app. Pair it with a bag of Khloud
                        popcorn, now available at Starbucks.
                    </div>
                    <Link
                        to="/giftcards"
                        id="order-in-app"
                        className="btn btn-outline-light rounded-pill shadow-none fw-bold link-light"
                    >
                        Order in the app
                    </Link>
                </div>
            </div>

            <div
                className="d-flex flex-row-reverse"
                data-home-content
                data-flex-row-reverse
                style={{
                    color: "#5F4633",
                    lineHeight: "2rem",
                    backgroundColor: "#F7F0E4",
                }}
            >
                <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-105320.jpg"
                    alt="free-coffee"
                    className="w-50 object-fit-contain"
                />

                <div className="w-50 p-3 d-flex flex-column align-items-center justify-content-center gap-4">
                    <h4 className="fs-3">
                        But first, <i>free</i> coffee
                    </h4>
                    <div className="w-75 fs-5 text-center">
                        A free handcrafted drink with purchase is all yours
                        during your first week as a Starbucks® Rewards member.*
                    </div>
                    <Link
                        to="/register"
                        id="join-now"
                        className="btn btn-success rounded-pill shadow-none fw-bold link-light"
                        style={{ color: "#00754A" }}
                    >
                        Join now
                    </Link>
                </div>
            </div>

            <div
                className="d-flex"
                data-home-content
                style={{
                    backgroundColor: "#F5F1EB",
                    color: "#006342",
                    lineHeight: "1.5rem",
                }}
            >
                <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-105359.jpg"
                    alt="free-refills"
                    className="w-50 object-fit-contain"
                />

                <div className="w-50 p-3 d-flex flex-column align-items-center justify-content-center gap-4">
                    <h4 className="fs-5">Grab a seat. Get free refills.</h4>
                    <div className="w-75 fs-6 text-center">
                        When you stay to enjoy your favorite beverage in the
                        café, refills of hot and iced brewed coffee or tea are
                        on us.**
                    </div>
                    <Link
                        to="/giftcards"
                        id="explore-pistachio"
                        className="btn btn-outline-light rounded-pill shadow-none fw-bold"
                        style={{
                            color: "#00754A",
                            backgroundColor: "#F5F1EB",
                            border: "1px solid #00754A",
                        }}
                    >
                        Order now
                    </Link>
                </div>
            </div>

            <div
                className="d-flex flex-row-reverse"
                data-home-content
                data-flex-row-reverse
                style={{ backgroundColor: "#006342", lineHeight: "1.5rem" }}
            >
                <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-105361.jpg"
                    alt="non-dairy-choices"
                    className="w-50 object-fit-contain"
                />

                <div className="w-50 p-3 d-flex flex-column align-items-center justify-content-center gap-4 link-light">
                    <h4 className="fs-5">Nondairy choices. No extra charge.</h4>
                    <div className="w-75 fs-6 text-center">
                        Try your hot or iced favorite with nondairy milk. Choose
                        from oat, almond, coconut or soy—for no additional
                        charge.
                    </div>
                    <Link
                        to="/giftcards"
                        id="order-in-app"
                        className="btn btn-outline-light rounded-pill shadow-none fw-bold link-light"
                    >
                        Order now
                    </Link>
                </div>
            </div>

            <p
                className="w-50 text-center align-self-center fw-bold mt-5"
                style={{ fontSize: "0.9rem" }}
            >
                *Valid for new Starbucks Rewards members for 7 days from sign
                up. Coupon will be available in the offers tab of your Starbucks
                app following sign up and may take up to 48 hours to arrive.
                Good at participating U.S. stores for a handcrafted menu-sized
                beverage with qualifying purchase ($8 max value). Qualifying
                purchase excludes alcohol, Starbucks Card and Card reloads.
                Limit one. Cannot be combined with other offers or discounts.
                Excludes delivery services. Sign up before 03/31/2026.
            </p>

            <p
                className="w-50 text-center align-self-center fw-bold mt-5"
                style={{ fontSize: "0.9rem" }}
            >
                **Free refills of hot and iced brewed coffee and tea during same
                store visit. Excludes Cold Brew, Nitro Cold Brew, Iced Tea
                Lemonade, flavored Iced Tea and Starbucks Refreshers® base. At
                participating stores.​
            </p>
        </div>
    );
}
