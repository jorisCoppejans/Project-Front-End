import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <div className="alert alert-warning">
        There is nothing to see here. 
        <br/>
        <br/>
        <Link to="/" replace className="alert-link">Go back to home</Link>.
      </div>
    </>
  );
}