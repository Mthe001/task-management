import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowTask from "./pages/Home/ShowTask";


const App = () => {
    const [tasks, setTasks] = useState([]);  // Initially empty array to store fetched tasks
    const [loading, setLoading] = useState(true);  // For loading state
    const [error, setError] = useState(null);  // To handle errors

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data.tasks);  // Assuming server returns tasks in { tasks: [...] } format
            setLoading(false);
        } catch (err) {
            setError("Failed to load tasks.");
            setLoading(false);
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);  // Empty dependency array ensures this runs once

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <ShowTask tasks={tasks} />  {/* Pass fetched tasks to ShowTask */}
        </div>
    );
};

export default App;
