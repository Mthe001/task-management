import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskItem = ({ task }) => {
    // Check if task is defined and has the necessary properties
    if (!task || !task.id || !task.title) {
        return null; // Return nothing if task is invalid
    }

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    // Apply smooth transition for drag movement
    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : {};

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="p-4 bg-white rounded shadow border border-gray-300 cursor-pointer"
        >
            <h4 className="font-semibold text-lg text-purple-700">{task.title}</h4>
            <p className="text-gray-600">{task.category || "No category"}</p>
        </div>
    );
};

export default TaskItem;
