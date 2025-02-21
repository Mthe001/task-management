import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddTask = ({ onAdd }) => {
    const { register, handleSubmit, reset } = useForm();
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // If there's an image, we can store the file or create a URL for it
            setImage(URL.createObjectURL(file)); // For showing image preview
        } else {
            setImage(null); // Clear image if the user removes it
        }
    };

    const onSubmit = (data) => {
        const newTask = {
            id: Date.now(), // Unique ID
            title: data.title,
            description: data.description || "",
            category: data.category,
            timestamp: new Date().toISOString(),
            image, // Include image URL or null if no image is added
        };
        onAdd(newTask);
        reset();
        setImage(null); // Reset image preview
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

                {/* Optional Image Upload */}
                <div className="mb-4">
                    <label className="block text-lg font-medium">Task Image (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-600 mx-1 "
                    />
                    {image && <img src={image} alt="Preview" className="mt-2 max-w-full h-48 object-cover rounded" />}
                </div>

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
