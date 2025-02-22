import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn"; // Import TaskColumn
import axios from "axios"; // For API call

const ShowTask = ({ tasks = [] }) => {
  const [taskList, setTaskList] = useState(tasks);

  // Handle reordering the tasks within a category
  const handleTaskReorder = async (draggedId, overId) => {
    const draggedTaskIndex = taskList.findIndex((task) => task._id === draggedId);
    const overTaskIndex = taskList.findIndex((task) => task._id === overId);
    
    const updatedTasks = [...taskList];
    // Move the dragged task to its new position
    const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);
    updatedTasks.splice(overTaskIndex, 0, draggedTask);

    setTaskList(updatedTasks);

    // Now, send the new task order to the server
    const taskIdsInOrder = updatedTasks.map((task) => task._id);

    try {
      await axios.post("https://task-management-server-self-iota.vercel.app/tasks/reorder", { taskIds: taskIdsInOrder });
      console.log("Task order updated successfully in the backend");
    } catch (error) {
      console.error("Error updating task order in the backend:", error);
      // Optionally, revert the order if the request fails
      setTaskList(tasks);
    }
  };

  // Handle updating the task category when moved to a different category
  const handleTaskCategoryUpdate = (taskId, newCategory) => {
    const updatedTasks = taskList.map((task) => {
      if (task._id === taskId) {
        return {
          ...task,
          categories: task.categories.map((category) =>
            category.name === newCategory ? { ...category, active: true } : { ...category, active: false }
          ),
        };
      }
      return task;
    });

    setTaskList(updatedTasks);
  };

  return (
    <div className="p-4 border rounded-lg bg-background flex flex-col">
      <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Task Board</h2>

      <DndContext onDragEnd={handleTaskReorder}>
        {/* Wrap the task columns in SortableContext */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-3 py-4 flex-grow">
          {/* To-Do Column */}
          <SortableContext items={taskList.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            <TaskColumn
              category="To-Do"
              tasks={taskList}
              onTaskCategoryUpdate={handleTaskCategoryUpdate}
              onTaskReorder={handleTaskReorder}
            />
          </SortableContext>

          {/* In Progress Column */}
          <SortableContext items={taskList.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            <TaskColumn
              category="In Progress"
              tasks={taskList}
              onTaskCategoryUpdate={handleTaskCategoryUpdate}
              onTaskReorder={handleTaskReorder}
            />
          </SortableContext>

          {/* Done Column */}
          <SortableContext items={taskList.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            <TaskColumn
              category="Done"
              tasks={taskList}
              onTaskCategoryUpdate={handleTaskCategoryUpdate}
              onTaskReorder={handleTaskReorder}
            />
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default ShowTask;
