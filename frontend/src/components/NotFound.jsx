import {MdError} from "react-icons/md";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
    <div className="container">
        <h1>Page Not Found</h1>
<MdError/>
<Link to={"/"}>Go To Home</Link>
    </div>
    </>
  )
}

export default NotFound