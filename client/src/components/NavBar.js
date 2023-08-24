import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqloperations/queries";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_MY_PROFILE);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userRole = data?.user?.role;
  console.log("ROLE",userRole)
  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo left">
          Inspection App
        </Link>
        <ul id="nav-mobile" className="right">
          {token ? (
            <>
              {userRole === "ADMIN" ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/create">Fulfill information</Link>
                  </li>
                  <li>
                    <Link to="/signup">Create USer</Link>
                  </li>
                  <li>
                    <Link to="/getallusers">Get All Users</Link>
                  </li>
                  <li>
                    <Link to="/home">Get All Data</Link>
                  </li>
                  <li>
                    <button
                      className="red btn"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )
              : (
                <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <button
                      className="red btn"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
