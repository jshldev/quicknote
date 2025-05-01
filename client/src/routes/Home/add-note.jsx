import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddNote() {
  const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes/`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const addNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        navigate("/");
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/" className="back-button">
        ↩ back
      </Link>

      <form onSubmit={addNote}>
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

export default AddNote;
