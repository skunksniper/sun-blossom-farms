import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container container--narrow section celebrate">
      <h1>That row's empty.</h1>
      <p>The page you're looking for has been picked clean. Try the <Link to="/">homepage</Link> or the <Link to="/shop">shop</Link>.</p>
    </div>
  );
}
