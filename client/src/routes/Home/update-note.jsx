import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateNote() {
  const { id } = useParams();
  const baseURL = `${import.meta.env.VITE_SERVER_URL}api/notes/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setIsLoading(false);
      } catch (error) {
        setError("Error when fetching data.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        navigate("/");
        // setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("Failed to delete data.");
    }
  };

  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          ↩ back
        </Link>
        <button onClick={removeNote} className="delete">
          ❌Delete This Note
        </button>
      </div>
      <form onSubmit={updateNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(i) => setTitle(i.target.value)}
              placeholder="Enter Title"
              className="title"
            ></input>
          </div>
          <div>
            <textarea
              value={description}
              onChange={(i) => setDescription(i.target.value)}
              placeholder="Enter Note Here"
              className="description"
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          value={submitted ? "Saving note..." : "Save note"}
          disabled={submitted}
        ></input>

        <p className="text-center">
          {submitted && (
            <div className="success-message">Note has been added.</div>
          )}
        </p>
      </form>
    </div>
  );
}

export default UpdateNote;
