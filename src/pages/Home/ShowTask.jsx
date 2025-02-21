// import React, { useState } from "react";
// import { DndContext, DragOverlay } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import TaskColumn from "./TaskColumn";  // Column component
// import SortableTaskItem from "./SortableTaskItem"; // Task item component

// const ShowTask = ({ tasks = [] }) => {
//     const [taskList, setTaskList] = useState(tasks);
//     const [activeTask, setActiveTask] = useState(null);

//     // Filter tasks based on their categories
//     const toDoTasks = taskList.filter((task) =>
//         task.categories.some((category) => category.name === "To-Do" && category.active)
//     );
//     const inProgressTasks = taskList.filter((task) =>
//         task.categories.some((category) => category.name === "In Progress" && category.active)
//     );
//     const doneTasks = taskList.filter((task) =>
//         task.categories.some((category) => category.name === "Done" && category.active)
//     );

//     const handleDragStart = (event) => {
//         const { active } = event;
//         setActiveTask(taskList.find((task) => task._id === active.id));
//     };

//     // const handleDragEnd = (event) => {
//     //     const { active, over } = event;
//     //     if (!over) return; // Prevent errors if dropped outside a valid area

//     //     const activeId = active.id;
//     //     const overId = over.id;

//     //     // Find the dragged task
//     //     const draggedTask = taskList.find((task) => task._id === activeId);
//     //     if (!draggedTask) return;

//     //     // Get the category the task is dropped into
//     //     const overCategory = overId.startsWith("category-") ? overId.replace("category-", "") : null;

//     //     if (overCategory) {
//     //         // Update categories if moving the task to a new category
//     //         const updatedTasks = taskList.map((task) =>
//     //             task._id === activeId
//     //                 ? {
//     //                     ...task,
//     //                     categories: task.categories.map((category) =>
//     //                         category.name === overCategory
//     //                             ? { ...category, active: true } // Set the dropped category to active
//     //                             : { ...category, active: false } // Reset other categories to inactive
//     //                     )
//     //                 }
//     //                 : task
//     //         );

//     //         setTaskList(updatedTasks); // Update the task list with new categories
//     //     }

//     //     setActiveTask(null); // Reset active task after the drag
//     // };


//     const handleDragEnd = async (event) => {
//         const { active, over } = event;
//         if (!over) return; // Prevent errors if dropped outside a valid area

//         const activeId = active.id;
//         const overId = over.id;

//         // Find the dragged task
//         const draggedTask = taskList.find((task) => task._id === activeId);
//         if (!draggedTask) return;

//         // Get the category the task is dropped into
//         const overCategory = overId.startsWith("category-") ? overId.replace("category-", "") : null;

//         if (overCategory) {
//             // Update categories if moving the task to a new category
//             const updatedTasks = taskList.map((task) =>
//                 task._id === activeId
//                     ? {
//                         ...task,
//                         categories: task.categories.map((category) =>
//                             category.name === overCategory
//                                 ? { ...category, active: true } // Set the dropped category to active
//                                 : { ...category, active: false } // Reset other categories to inactive
//                         )
//                     }
//                     : task
//             );

//             setTaskList(updatedTasks); // Update the task list with new categories

//             // Make API call to update task's category in the backend
//             try {
//                 const response = await fetch(`/tasks/${activeId}`, {
//                     method: "PATCH",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         categories: updatedTasks.find((task) => task._id === activeId).categories,
//                     }),
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to update task category");
//                 }
//             } catch (error) {
//                 console.error("Error updating task:", error);
//             }
//         }

//         setActiveTask(null); // Reset active task after the drag
//     };


//     return (
//         <div className="p-4 border rounded-lg bg-background flex flex-col">
//             <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Task Board</h2>

//             <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-3 py-4 flex-grow">
//                     {/* To-Do Column */}
//                     <SortableContext items={toDoTasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
//                         <TaskColumn category="To-Do" tasks={toDoTasks} />
//                     </SortableContext>

//                     {/* In Progress Column */}
//                     <SortableContext items={inProgressTasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
//                         <TaskColumn category="In Progress" tasks={inProgressTasks} />
//                     </SortableContext>

//                     {/* Done Column */}
//                     <SortableContext items={doneTasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
//                         <TaskColumn category="Done" tasks={doneTasks} />
//                     </SortableContext>
//                 </div>

//                 <DragOverlay>
//                     {activeTask ? <SortableTaskItem task={activeTask} /> : null}
//                 </DragOverlay>
//             </DndContext>
//         </div>
//     );
// };

// export default ShowTask;







import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn"; // Column component
import SortableTaskItem from "./SortableTaskItem"; // Task item component

const ShowTask = ({ tasks = [] }) => {
    const [taskList, setTaskList] = useState(tasks);
    const [activeTask, setActiveTask] = useState(null);

    // Filter tasks based on their categories
    const toDoTasks = taskList.filter((task) =>
        task.categories.some((category) => category.name === "To-Do" && category.active)
    );
    const inProgressTasks = taskList.filter((task) =>
        task.categories.some((category) => category.name === "In Progress" && category.active)
    );
    const doneTasks = taskList.filter((task) =>
        task.categories.some((category) => category.name === "Done" && category.active)
    );

    // Update the task category when a task is dropped into a new category
    const handleTaskCategoryUpdate = (taskId, newCategory) => {
        const updatedTasks = taskList.map((task) =>
            task._id === taskId
                ? {
                    ...task,
                    categories: task.categories.map((category) =>
                        category.name === newCategory
                            ? { ...category, active: true }
                            : { ...category, active: false }
                    ),
                }
                : task
        );
        setTaskList(updatedTasks); // Update the local state with the new task list

        // Optionally, send the updated task list to the backend to persist the changes
        // You can use a fetch/axios call here to update the task in the backend.
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveTask(taskList.find((task) => task._id === active.id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return; // Prevent errors if dropped outside a valid area

        const activeId = active.id;
        const overId = over.id;

        // Find the dragged task
        const draggedTask = taskList.find((task) => task._id === activeId);
        if (!draggedTask) return;

        // Get the category the task is dropped into
        const overCategory = overId.startsWith("category-") ? overId.replace("category-", "") : null;

        if (overCategory) {
            // Update categories if moving the task to a new category
            const updatedTasks = taskList.map((task) =>
                task._id === activeId
                    ? {
                        ...task,
                        categories: task.categories.map((category) =>
                            category.name === overCategory
                                ? { ...category, active: true } // Set the dropped category to active
                                : { ...category, active: false } // Reset other categories to inactive
                        )
                    }
                    : task
            );

            setTaskList(updatedTasks); // Update the task list with new categories

            // Optionally, make an API call to update task's category in the backend
        }

        setActiveTask(null); // Reset active task after the drag
    };

    return (
        <div className="p-4 border rounded-lg bg-background flex flex-col">
            <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Task Board</h2>

            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-3 py-4 flex-grow">
                    {/* To-Do Column */}
                    <TaskColumn
                        category="To-Do"
                        tasks={toDoTasks}
                        onTaskCategoryUpdate={handleTaskCategoryUpdate}
                    />

                    {/* In Progress Column */}
                    <TaskColumn
                        category="In Progress"
                        tasks={inProgressTasks}
                        onTaskCategoryUpdate={handleTaskCategoryUpdate}
                    />

                    {/* Done Column */}
                    <TaskColumn
                        category="Done"
                        tasks={doneTasks}
                        onTaskCategoryUpdate={handleTaskCategoryUpdate}
                    />
                </div>

                <DragOverlay>
                    {activeTask ? <SortableTaskItem task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default ShowTask;
