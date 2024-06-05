import { Link } from "react-router-dom";

export default function PageNotFound() {

    return <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="py-3 text-xl text-white">Page not found!</h1>
        <p className="text-sm text-gray-200">Seems this page is not found</p>
        <br/>
        <Link className="disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-teritary px-3.5 py-2 text-sm text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " to="/">Go to home</Link>
  </div>;
}
