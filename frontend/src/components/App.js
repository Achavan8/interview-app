import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch message from the backend API on component mount
  useEffect(() => {
    setLoading(true);
    fetch("/api/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
        setError(null); // Clear any previous errors
      })
      .catch((error) => setError("Error: " + error.message))
      .finally(() => setLoading(false)); // Stop loading indicator
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;

    setLoading(true);

    try {
      const response = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save item, status: ${response.status}`);
      }

      setMessage("Item saved successfully");
      setError(null); // Clear any previous errors

      // Clear form fields after successful submission
      event.target.name.value = "";
      event.target.description.value = "";
    } catch (error) {
      setError("Error: " + error.message);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <h1>{error ? error : message}</h1>
        )}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
