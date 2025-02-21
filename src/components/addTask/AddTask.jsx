import React from "react";
import { useForm } from "react-hook-form";

const AddTask = ({ onAdd }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const newTask = {
            id: Date.now(), // Unique ID
            title: data.title,
            description: data.description || "",
            category: data.category,
            timestamp: new Date().toISOString(),
        };
        onAdd(newTask);
        reset();
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Add Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Task Title */}
                <input
                    type="text"
                    {...register("title", { required: true, maxLength: 50 })}
                    placeholder="Task Title"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    required
                />

                {/* Task Description */}
                <textarea
                    {...register("description", { maxLength: 200 })}
                    placeholder="Task Description (Optional)"
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                />

                {/* Task Category */}
                <select
                    {...register("category", { required: true })}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                    required
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
