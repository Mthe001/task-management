import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowTask from "./pages/Home/ShowTask";
import useAuth from "./hooks/useAuth";

const App = () => {
    // Get the email directly from the authentication context or hook
    const { user } = useAuth();  // Assuming `user` object contains the email
    const email = user?.email;  // If user exists, get the email

    console.log("Email from useAuth:", email);  // This should log the email from useAuth

    const [tasks, setTasks] = useState({
    title: '',
    description: '',
    category: 'To-Do',
    categories: [],  
});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            if (!email) {
                throw new Error("No email found for the user.");
            }

            const response = await axios.get(`http://localhost:5000/tasks/${email}`);
            setTasks(response.data.tasks);  // Assuming server returns tasks in { tasks: [...] } format
        } catch (err) {
            setError(err.message || "Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, [email]);  // Re-run the effect if the email changes

    // Handle loading and error states
    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p className="border-2 px-[90%] rounded-lg lg:px-96 py-44">{error}</p>;
    if (tasks.length === 0) return <p className="px-4 py-2">No tasks available.</p>;

    return (
        <div className="container mx-auto p-4">
            <ShowTask tasks={tasks} />
        </div>
    );
};

export default App;
