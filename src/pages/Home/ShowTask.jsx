import React from "react";

const ShowTask = ({ tasks }) => {
    return (
        <div className="p-4 border rounded-lg bg-background">
            <h2 className="text-xl text-purple-700 font-bold mb-4">Task Board</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="p-4 bg-background rounded shadow border border-gray-300"
                        >
                            <h3 className="font-semibold text-lg text-purple-700">{task.title}</h3>
                            <p className="text-gray-600">{task.category}</p>
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default ShowTask;
