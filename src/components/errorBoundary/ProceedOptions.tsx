import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS_MAIN } from "@/lib/navLinks";

function ProceedOptions() {
  // Getting the navigate function from the hook
  const navigate = useNavigate();

  // Returned JSX
  return (
    <div className="mt-8">
      Please check the URL or try again later. If the problem persists, you can:
      <ul className="list-disc pl-2 my-2">
        <li>
          Return to the{" "}
          <span className="link" onClick={() => navigate(-1)}>
            previous page
          </span>
          ;
        </li>
        <li>
          Go back to the <Link to={NAV_LINKS_MAIN.home.path}>homepage</Link>;
        </li>
      </ul>
      And continue exploring our collection.
    </div>
  );
}

export default ProceedOptions;
