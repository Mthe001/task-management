import React, { useEffect, useState } from 'react';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set the visibility state to true after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`about-container w-[90%] border-2 my-9 p-8 bg-background  rounded-lg shadow-lg transition-all duration-700 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
        >
            <h1 className="text-3xl font-semibold text-center text-purple-700 mb-4">
                About Task Manager
            </h1>

            <p className="text-lg text-gray-700 mb-6">
                Welcome to our Task Manager Application! This app is designed to help you stay organized and productive by managing your tasks effectively.
            </p>

            <h2 className="text-2xl font-semibold text-purple-600 mb-2">Features:</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Organize tasks into categories such as "To-Do", "In Progress", and "Done".</li>
                <li>Reorder tasks via drag-and-drop functionality for an intuitive task flow.</li>
                <li>Update task categories to reflect their current status.</li>
                <li>Keep track of your tasks with custom labels and due dates.</li>
                <li>Simple and clean user interface for a seamless experience.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-purple-600 mb-2">How It Works:</h2>
            <p className="text-lg text-gray-700 mb-6">
                Our app allows you to create tasks, assign them to categories, and manage their progress. You can drag and drop tasks between categories to update their status or reorder them as needed.
            </p>

            <h2 className="text-2xl font-semibold text-purple-600 mb-2">Built With:</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>React for building a responsive user interface.</li>
                <li>Axios for handling API requests.</li>
                <li>MongoDB for database storage.</li>
                <li>Drag-and-drop functionality powered by DnD-kit.</li>
            </ul>

            <p className="text-lg text-gray-700">
                We're constantly working to improve the app, so stay tuned for future updates! If you have any questions or feedback, feel free to reach out to us.
            </p>
        </div>
    );
};

export default About;
