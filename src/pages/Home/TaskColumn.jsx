import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem"; // Import SortableTaskItem for individual tasks

const TaskColumn = ({ category, tasks, onTaskCategoryUpdate }) => {
    // Filter tasks that have the current category set as active
    const filteredTasks = tasks.filter((task) =>
        task.categories.some(
            (categoryObj) => categoryObj.name === category && categoryObj.active
        )
    );

    // Handle category change on task drop
    const handleCategoryChange = (taskId) => {
        if (onTaskCategoryUpdate) {
            onTaskCategoryUpdate(taskId, category); // Pass task ID and the new category
        }
    };

    return (
        <div id={`category-${category}`} className="flex flex-col space-y-4 bg-background border-2 p-4 rounded-lg min-h-[300px]">
            <h3 className="text-lg font-semibold text-purple-700">{category}</h3>
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
        </div>
    );
};

export default TaskColumn;
