import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="not-found-container font-skia">
      <img className=" not-found-image"
        src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
        alt=""
      />
      <p className="not-found-subtitle">Oops! Page not found</p>
      <p className="not-found-description">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="not-found-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
