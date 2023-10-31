import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="not-found">
      <div className="not-found__wrapper-heading">
        <h3 className="not-found__heading">404</h3>
        <p className="not-found__subheading">Этой страницы не существует</p>
      </div>
      <Link className="not-found__link" to='/react-mesto-auth' replace>На главную страницу</Link>
    </div>
  );
};