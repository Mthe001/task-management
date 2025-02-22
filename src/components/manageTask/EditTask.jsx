import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: '',
        description: '',
        category: 'To-Do',
        status: 'pending',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
   
   
    useEffect(() => {
        const fetchTask = async () => {
            console.log("Fetching task with ID:", id);
            try {
                const response = await axios.get(`http://localhost:5000/tasks/${id}`);
                if (response.data && response.data.task) {  // Adjust if the response is an object
                    setTask(response.data.task);
                    setLoading(false);
                } else {
                    setError('Task not found');
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error fetching task:", err);
                setError('Update Your Task');
                setLoading(false);
            }
        };


        fetchTask();
        
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${id}`, task);
            console.log("Update Response:", response); // Debugging

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Task updated successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/');  // Redirect after update
            } else {
                throw new Error('Failed to update task');
            }
        } catch (err) {
            console.error("Error updating task:", err); // Log error
            setError('Failed to update task');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while updating the task.',
            });
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-background border-2 w-[92%] my-10 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">Edit Task</h2>
            {error && <p className="text-green-600 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="text-lg text-gray-600 mb-2">Title:</label>
                    <input
                        type="text"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                        className="px-4 py-2 border border-gray-300 bg-inherit rounded-md "
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-2">Description:</label>
                    <textarea
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-md  bg-inherit resize-y"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-2">Category:</label>
                    <select
                        value={task.category}
                        onChange={(e) => setTask({ ...task, category: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-inherit "
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Update Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
