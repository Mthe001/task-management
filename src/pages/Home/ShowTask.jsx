// import React from "react";

// const ShowTask = ({ tasks }) => {
//     return (
//         <div className="p-4 border rounded-lg bg-background">
//             <h2 className="text-xl text-purple-700 font-bold mb-4">Task Board</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {tasks.length > 0 ? (
//                     tasks.map((task) => (
//                         <div
//                             key={task.id}
//                             className="p-4 bg-background rounded shadow border border-gray-300"
//                         >
//                             {/* Task Title */}
//                             <h3 className="font-semibold text-lg text-purple-700">{task.title}</h3>

//                             {/* Task Category */}
//                             <p className="text-gray-600">{task.category}</p>

//                             {/* Task Description */}
//                             {task.description && (
//                                 <p className="text-gray-500 mt-2">{task.description}</p>
//                             )}

//                             {/* Task Image */}
//                             {task.image && (
//                                 <img
//                                     src={task.image}
//                                     alt="Task"
//                                     className="mt-3 max-w-full h-48 object-cover rounded"
//                                 />
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No tasks available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ShowTask;


import React from "react";

const ShowTask = ({ tasks }) => {
    // Filter tasks based on category
    const toDoTasks = tasks.filter((task) => task.category === "To-Do");
    const inProgressTasks = tasks.filter((task) => task.category === "In Progress");
    const doneTasks = tasks.filter((task) => task.category === "Done");

    return (
        <div className="p-4 border rounded-lg bg-background">
            <h2 className="text-xl text-purple-700 font-bold mb-4">Task Board</h2>

            {/* Display tasks for each category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-purple-700">To-Do</h3>
                    {toDoTasks.length > 0 ? (
                        toDoTasks.map((task) => (
                            <div key={task.id} className="p-4 bg-background rounded shadow border border-gray-300">
                                <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
                                <p className="text-gray-600">{task.category}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks in "To-Do" category.</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-purple-700">In Progress</h3>
                    {inProgressTasks.length > 0 ? (
                        inProgressTasks.map((task) => (
                            <div key={task.id} className="p-4 bg-background rounded shadow border border-gray-300">
                                <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
                                <p className="text-gray-600">{task.category}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks in "In Progress" category.</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-purple-700">Done</h3>
                    {doneTasks.length > 0 ? (
                        doneTasks.map((task) => (
                            <div key={task.id} className="p-4 bg-background rounded shadow border border-gray-300">
                                <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
                                <p className="text-gray-600">{task.category}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks in "Done" category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowTask;
