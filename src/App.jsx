import React, { useState } from "react";
import ShowTask from "./pages/Home/ShowTask";


const App = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Complete React Project", category: "To-Do" },
        { id: 2, title: "Fix Bugs", category: "In Progress" },
        { id: 3, title: "Deploy to Production", category: "Done" },
    ]);

    return (
        <div className="container mx-auto p-4">
            <ShowTask tasks={tasks} />
        </div>
    );
};

export default App;
