import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  const itemsPerPage = 10; // Number of items to load per page

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?size=${itemsPerPage}`
      );
      const responseData = await response.json();
      const { totalPages } = responseData;
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error fetching total pages:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${itemsPerPage}`
      );
      const responseData = await response.json();
      if (Array.isArray(responseData.data)) {
        setData((prevData) => [...prevData, ...responseData.data]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      } else {
        console.log("Invalid response format:", responseData);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    setLoading(false);
  };

  const isAllDataLoaded = pageNumber > totalPages;

  if (!props.name) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <div>
        <h2>
          <Link to="/login">Login</Link>
        </h2>
        <br />
        <h2>
          <Link to="/signup">Signup</Link>
        </h2>
      </div>

      <br />
      <br />
      <br />

      <h2>Welcome - {props.name}</h2>
      <br />
      <button onClick={fetchData} disabled={loading || isAllDataLoaded}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {data.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Trips: {item.trips}</p>
        </div>
      ))}

      {isAllDataLoaded && <p>All data loaded.</p>}
    </div>
  );
}

export default Home;
