// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link component
// import Swal from 'sweetalert2';
// import { Helmet } from 'react-helmet-async';

// const ManageTask = () => {
//     const [taskList, setTaskList] = useState([]);  // Default to an empty array
//     const [loading, setLoading] = useState(false);

//     // Fetch tasks from the server when the component mounts
//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     // Fetch tasks from the server
//     const fetchTasks = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('https://task-management-server-self-iota.vercel.app/tasks'); // Update with the correct port
//             console.log(response.data); // Check if it's returning the correct JSON data
//             if (Array.isArray(response.data.tasks)) {
//                 setTaskList(response.data.tasks);
//             } else {
//                 console.error('Tasks data is not an array', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete task handler with SweetAlert confirmation
//     const handleDelete = async (taskId) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this action!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes, Delete it!',
//             cancelButtonText: 'Cancel',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     // Ensure you're sending the request to the correct backend port
//                     const response = await axios.delete(`https://task-management-server-self-iota.vercel.app/tasks/${taskId}`); // Update port here

//                     if (response.status === 200) {
//                         // Remove the task from the list in the local state
//                         setTaskList((prevState) =>
//                             prevState.filter((task) => task._id !== taskId)
//                         );
//                         Swal.fire('Task deleted!', '', 'success');
//                     } else {
//                         console.error('Failed to delete task');
//                         Swal.fire('Error', 'Failed to delete task!', 'error');
//                     }
//                 } catch (error) {
//                     console.error('Error deleting task:', error);
//                     Swal.fire('Error', 'Something went wrong while deleting the task!', 'error');
//                 }
//             }
//         });
//     };

//     if (loading) {
//         return <div>Loading tasks...</div>;
//     }

//     return (

//         <div>
//             <div>
//                 <Helmet>
//                     <title>Manage task | Task24/7 </title>
//                 </Helmet>
//             </div>
//             <div className="task-manager lg:w-7/12 w-[90%] border-2 rounded-lg mx-auto p-4">
//                 <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Manage Tasks</h2>

//                 <div className="task-list">
//                     {taskList.length === 0 ? (
//                         <div>No tasks available</div>
//                     ) : (
//                         taskList.map((task) => (
//                             <div key={task._id} className="task-card p-4 border mb-4">
//                                 <h3 className="font-semibold">{task.title}</h3>
//                                 <p>{task.description}</p>
//                                 <div className="task-actions">
//                                     {/* Use Link to go to the Edit page for this task */}
//                                     <Link
//                                         to={`/tasks/${task._id}`}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
//                                     >
//                                         Edit
//                                     </Link>
//                                     <button
//                                         className="bg-red-500 text-white px-3 py-1 rounded"
//                                         onClick={() => handleDelete(task._id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>


//     );
// };

// export default ManageTask;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import useAuth from '@/hooks/useAuth';
import Loader from '@/shared/LoaderSpinner';


const ManageTask = () => {
    const { user } = useAuth();  // Get the current user from the auth hook
    const email = user?.email;  // Extract email from the user object
    const [taskList, setTaskList] = useState([]);  // Default to an empty array
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch tasks for the specific user if the email is available
        if (email) {
            fetchTasks(email);
        }
    }, [email]);  // Re-fetch tasks if the email changes

    // Fetch tasks from the server for a specific user
    const fetchTasks = async (userEmail) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://task-management-server-self-iota.vercel.app/tasks/${userEmail}`);  // Update API endpoint to use the email
            console.log(response.data);  // Check if it's returning the correct JSON data
            if (Array.isArray(response.data.tasks)) {
                setTaskList(response.data.tasks);
            } else {
                console.error('Tasks data is not an array', response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    // Delete task handler with SweetAlert confirmation
    const handleDelete = async (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://task-management-server-self-iota.vercel.app/tasks/${taskId}`);
                    if (response.status === 200) {
                        setTaskList((prevState) =>
                            prevState.filter((task) => task._id !== taskId)
                        );
                        Swal.fire('Task deleted!', '', 'success');
                    } else {
                        console.error('Failed to delete task');
                        Swal.fire('Error', 'Failed to delete task!', 'error');
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                    Swal.fire('Error', 'Something went wrong while deleting the task!', 'error');
                }
            }
        });
    };

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'><Loader /></div>;
    }

    return (
        <div>
            <Helmet>
                <title>Manage task | Task24/7 </title>
            </Helmet>
            <div className="task-manager lg:w-7/12 w-[90%] border-2 rounded-lg mx-auto p-4">
                <h2 className="text-xl text-purple-700 font-bold mb-6 text-center">Manage Tasks</h2>

                <div className="task-list">
                    {taskList.length === 0 ? (
                        <div>No tasks available</div>
                    ) : (
                        taskList.map((task) => (
                            <div key={task._id} className="task-card p-4 border mb-4">
                                <h3 className="font-semibold">{task.title}</h3>
                                <p>{task.description}</p>
                                <div className="task-actions">
                                    <Link to={`/tasks/edit/${task._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                        Edit
                                    </Link>

                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTask;
