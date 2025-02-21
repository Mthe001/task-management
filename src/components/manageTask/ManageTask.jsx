import React, { useState } from 'react';

// Example task data to edit and delete
const tasks = [
    { _id: 1, name: 'Task 1', description: 'Description 1' },
    { _id: 2, name: 'Task 2', description: 'Description 2' },
    { _id: 3, name: 'Task 3', description: 'Description 3' },
];

const ManageTask = () => {
    const [taskList, setTaskList] = useState(tasks);
    const [editingTask, setEditingTask] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    // Edit task handler
    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTaskName(task.name);
        setNewTaskDescription(task.description);
    };

    // Save the edited task
    const handleSave = () => {
        const updatedTasks = taskList.map((task) =>
            task._id === editingTask._id
                ? { ...task, name: newTaskName, description: newTaskDescription }
                : task
        );
        setTaskList(updatedTasks);
        setEditingTask(null); // Close the edit form after saving
    };

    // Delete task handler
    const handleDelete = (taskId) => {
        const filteredTasks = taskList.filter((task) => task._id !== taskId);
        setTaskList(filteredTasks);
    };

    return (
        <div className="task-manager">
            <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Manage Tasks</h2>

            <div className="task-list">
                {taskList.map((task) => (
                    <div key={task._id} className="task-card p-4 border mb-4">
                        <h3 className="font-semibold">{task.name}</h3>
                        <p>{task.description}</p>
                        <div className="task-actions">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                onClick={() => handleEdit(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => handleDelete(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingTask && (
                <div className="edit-task-form p-4 border rounded mt-6">
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        className="mb-2 w-full p-2 border"
                        placeholder="Task Name"
                    />
                    <textarea
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        className="mb-2 w-full p-2 border"
                        placeholder="Task Description"
                    />
                    <div className="actions">
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditingTask(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTask;
