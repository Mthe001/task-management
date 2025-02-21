import React from "react";
import { useSortable } from "@dnd-kit/sortable"; // Hook for making the task draggable
import { SlCalender } from "react-icons/sl";
import { IoIosTimer } from "react-icons/io";
import { FaPenFancy } from "react-icons/fa6";

const SortableTaskItem = ({ task }) => {
    // Check if the task is defined and has the necessary properties
    if (!task || !task._id || !task.title || !task.timestamp) {
        return null; // Return nothing if task is not valid
    }

    const { setNodeRef, attributes, listeners, transform, isDragging } = useSortable({
        id: task._id, // Use _id as the unique identifier
    });

    // Apply smooth transition for drag movement
    const style = transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
            transition: "transform 0.2s ease", // Smooth transition for drag
        }
        : {};

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`p-4 bg-white rounded shadow border border-gray-300 cursor-pointer ${isDragging ? "opacity-50" : ""}`}
        >
            <h4 className="font-semibold text-lg text-purple-700 flex items-center gap-2">
                <span className="text-black">
                    <FaPenFancy />
                </span>
                {task.title}
            </h4>
            <p className="text-gray-600 flex items-center gap-2">
                <SlCalender /> {task.description || "No description"}
            </p>
            <p className="text-gray-500 flex items-center gap-2">
                <IoIosTimer />
                {/* Format the timestamp with toLocaleString(), fallback to an empty string if invalid */}
                {task.timestamp ? new Date(task.timestamp).toLocaleString() : "No timestamp"}
            </p>
        </div>
    );
};

export default SortableTaskItem;
