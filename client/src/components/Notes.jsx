import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Notes() {
  const baseURL = `${import.meta.env.VITE_SERVER_URL}api/notes/`;
  //   const baseURL = "http://localhost:8000/api/notes/";
  //   console.log(import.meta.env.VITE_SERVER_URL);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError("Error when fetching data.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="notes">
          <li className="add-note-button">
            <Link to={"/add-note"}>+</Link>
          </li>

          {data.map((note) => (
            // {console.log(note._id);}
            <li key={note._id}>
              <Link to={`/update-note/${note._id}`}>
                {/* {console.log(note.title)} */}
                <h3>{note.title}</h3>
                {/* {console.log(note.description)} */}
                <p>
                  {note.description.length > 80
                    ? `${note.description.substring(0, 80)}...`
                    : note.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
