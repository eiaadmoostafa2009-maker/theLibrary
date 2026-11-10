import { Link } from "react-router-dom";
import Register from "./Register";

export default function LandingPage(){

  return (
    <section className="welcome">
      <div>
        <p className="eyebrow">YOUR PERSONAL SPACE</p>

        <h1>Your library, your world.</h1>

        <p>
          Keep your favorite books organized
          and your reading journey moving.
        </p>
      </div>

      <Link to="/home" className="primary-button">
        Home
      </Link>
    </section>
  );
}