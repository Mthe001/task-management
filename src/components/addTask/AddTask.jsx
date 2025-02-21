import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // For sending the task data to a server
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        // Create a new task object without the 'status' field
        const newTask = {
            email: user.email, // Replace with dynamic user email if needed
            title: data.title,
            description: data.description || "",
            category: data.category, // The selected category
            timestamp: new Date().toISOString(),
            image: null, // No image anymore
        };

        try {
            const response = await axios.post("http://localhost:5000/tasks", newTask);
            console.log("Task added successfully:", response.data);
            toast.success("Task added successfully!");
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error("Error adding task:", error);
            console.error("Error details:", error.response?.data); // Inspect error details from the server
            toast.error("Failed to add task. Please try again later.");
        }
    };

    return (
        <div className="w-fit border-2 mx-auto p-4 bg-background shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-start">Add Task</h2>
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
    );
};

export default AddTask;
