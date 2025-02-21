import React from "react";

const ShowTask = ({ tasks }) => {
    return (
        <div className="p-4 border rounded-lg bg-background">
            <h2 className="text-xl text-purple-700 font-bold mb-4">Task Board</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="p-2 bg-background rounded shadow mb-2">
                            <strong>{task.title}</strong> - {task.category}
                        </li>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </ul>
        </div>
    );
};

export default ShowTask;
