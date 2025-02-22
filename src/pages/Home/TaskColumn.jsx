import React, { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import axios from 'axios';  // Import axios
import SortableTaskItem from "./SortableTaskItem"; // Import SortableTaskItem for individual tasks

const TaskColumn = ({ category, tasks, onTaskCategoryUpdate }) => {
    const [localTasks, setLocalTasks] = useState(tasks);

    const filteredTasks = localTasks.filter((task) =>
        task.categories.some(
            (categoryObj) => categoryObj.name === category && categoryObj.active
        )
    );

    const handleCategoryChange = (taskId) => {
        if (onTaskCategoryUpdate) {
            onTaskCategoryUpdate(taskId, category); // Pass task ID and the new category
        }
    };

    // Define the handleTaskReorder function locally
    const handleTaskReorder = (updatedTaskList) => {
        axios.post("https://task-management-server-self-iota.vercel.app/tasks/reorder", {
            taskIds: updatedTaskList.map((task) => task._id)  // Extract task ids from the updated task list
        })
            .then((response) => {
                console.log("Task order updated successfully in the backend");

                // After successful update from the backend, update the local tasks state
                setLocalTasks(updatedTaskList);  // Update the UI with the new task order
            })
            .catch((error) => {
                console.error("Error updating task order in the backend:", error);
            });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // Ensure that there is a valid drop target
        if (!over) {
            console.log("Task was dropped outside a valid category");
            return; // Exit if no valid drop target is found
        }

        const draggedTaskId = active.id;
        const overTaskId = over.id;

        if (!draggedTaskId || !overTaskId) {
            console.log("Invalid task IDs, cannot reorder.");
            return;
        }

        const updatedTaskList = [...localTasks];
        const draggedIndex = updatedTaskList.findIndex((task) => task._id === draggedTaskId);
        const overIndex = updatedTaskList.findIndex((task) => task._id === overTaskId);

        if (draggedIndex >= 0 && overIndex >= 0) {
            const [draggedTask] = updatedTaskList.splice(draggedIndex, 1);
            updatedTaskList.splice(overIndex, 0, draggedTask);

            // Update the state with the new task order in the UI
            setLocalTasks(updatedTaskList);

            // Call the handleTaskReorder function to update the backend
            handleTaskReorder(updatedTaskList);  // Now use the locally defined function
        }
    };

    return (
        <div id={`category-${category}`} className="flex flex-col space-y-4 bg-background border-2 p-4 rounded-lg min-h-[300px]">
            <h3 className="text-lg font-semibold text-purple-700">{category}</h3>

            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={filteredTasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <SortableTaskItem
                                key={task._id}
                                task={task}
                                onCategoryChange={handleCategoryChange}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks in this category.</p>
                    )}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default TaskColumn;
