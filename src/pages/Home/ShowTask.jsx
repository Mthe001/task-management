import React from "react";

const ShowTask = ({ tasks }) => {
    // Filter tasks based on category
    const toDoTasks = tasks.filter((task) => task.category === "To-Do");
    const inProgressTasks = tasks.filter((task) => task.category === "In Progress");
    const doneTasks = tasks.filter((task) => task.category === "Done");

    return (
        <div className="p-4 border rounded-lg bg-background   flex flex-col">
            <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Task Board</h2>

            {/* Display tasks for each category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-3 py-4 flex-grow">
                {/* To-Do Column */}
                <div className="flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg shadow-md ">
                    <h3 className="text-lg font-semibold text-purple-700">To-Do</h3>
                    {toDoTasks.length > 0 ? (
                        toDoTasks.map((task) => (
                            <div key={task._id || task.id} className="p-4 bg-white rounded shadow border border-gray-300">
                                <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
                                <p className="text-gray-600">{task.category}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks in "To-Do" category.</p>
                    )}
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg shadow-md ">
                    <h3 className="text-lg font-semibold text-purple-700">In Progress</h3>
                    {inProgressTasks.length > 0 ? (
                        inProgressTasks.map((task) => (
                            <div key={task._id || task.id} className="p-4 bg-white rounded shadow border border-gray-300">
                                <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
                                <p className="text-gray-600">{task.category}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks in "In Progress" category.</p>
                    )}
                </div>

                {/* Done Column */}
                <div className="flex flex-col space-y-4 bg-gray-100 p-4 rounded-lg shadow-md ">
                    <h3 className="text-lg font-semibold text-purple-700">Done</h3>
                    {doneTasks.length > 0 ? (
                        doneTasks.map((task) => (
                            <div key={task._id || task.id} className="p-4 bg-white rounded shadow border border-gray-300">
                                <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
                                <p className="text-gray-600">{task.category}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks in "Done" category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowTask;
