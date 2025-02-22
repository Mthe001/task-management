import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Loader from "@/shared/LoaderSpinner";

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    // State to track loading status for form
    const [loading, setLoading] = useState(true); // Initially true to show loading before the form appears
    const [taskLoading, setTaskLoading] = useState(false); // For task submission loading

    // Simulate loading of some data or prepare the form
    useEffect(() => {
        // Simulating loading delay (e.g., for data fetching)
        setTimeout(() => {
            setLoading(false); 
        }, 1000);
    }, []);

    const onSubmit = async (data) => {
        setTaskLoading(true); // Show loader during task submission

        const newTask = {
            email: user.email,
            title: data.title,
            description: data.description || "",
            category: data.category,
            timestamp: new Date().toISOString(),
            image: null,
        };

        try {
            const response = await axios.post("https://task-management-server-self-iota.vercel.app/tasks", newTask);
            console.log("Task added successfully:", response.data);
            toast.success("Task added successfully!");
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error("Error adding task:", error);
            console.error("Error details:", error.response?.data); // Inspect error details from the server
            toast.error("Failed to add task. Please try again later.");
        } finally {
            setTaskLoading(false); // Hide loader once the task submission is done
        }
    };

    if (loading) {
        // Return a loader before the form appears
        return (
            <div className="flex justify-center items-center h-screen">
                <div><Loader/></div>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Add task | Task24/7 </title>
            </Helmet>

            <div className="w-fit border-2 mx-auto p-4 bg-background shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-start">Add Task</h2>

                {/* Show loader when task is being added */}
                {taskLoading && (
                    <div className="flex justify-center items-center mb-4">
                        <div className="spinner-border animate-spin h-8 w-8 border-t-4 border-blue-600 rounded-full"></div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Task Title */}
                    <input
                        type="text"
                        {...register("title", { required: true, maxLength: 50 })}
                        placeholder="Task Title"
                        className="w-full p-2 border rounded bg-inherit"
                        required
                    />

                    {/* Task Description */}
                    <textarea
                        {...register("description", { maxLength: 200 })}
                        placeholder="Task Description (Optional)"
                        className="w-full p-2 border rounded bg-inherit"
                    />

                    {/* Task Category */}
                    <select
                        {...register("category", { required: true })}
                        className="w-full p-2 border bg-background rounded"
                        required
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
