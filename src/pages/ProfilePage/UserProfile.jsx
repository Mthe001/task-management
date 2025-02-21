import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const Profile = () => {
    const [user, setUser] = useState(null); // To store user profile data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state
    const [isEditing, setIsEditing] = useState(false); // For editing description
    const [newDescription, setNewDescription] = useState(""); // To store the new description

    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!currentUser) {
                setError("No user is logged in");
                setLoading(false);
                return;
            }

            const email = currentUser.email; // Get the email of the logged-in user

            try {
                const response = await axios.get(`http://localhost:5000/users/${email}`);
                setUser(response.data.user);
                setNewDescription(response.data.user.description || ""); // Set initial description
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [currentUser]);

    const handleEditDescription = () => {
        setIsEditing(true);
    };

    const handleSaveDescription = async () => {
        if (!newDescription) {
            setError("Description cannot be empty");
            return;
        }

        try {
            const email = currentUser.email;  // Get the current user's email

            // Prepare the data for the update request
            const updateData = {
                email: email,
                description: newDescription,
                name: user.name,          // Assuming user.name is already available
                location: user.location,  // Assuming user.location is already available
                image: user.image,        // Assuming user.image is already available
            };

            // Send the PUT request to update user data
            const response = await axios.put('http://localhost:5000/users', updateData);

            console.log('User updated successfully:', response.data);
            setIsEditing(false); // Stop editing after save
            setUser((prevUser) => ({
                ...prevUser,
                description: newDescription,
            }));
            setError(null); // Clear any previous error messages
        } catch (error) {
            console.error("Error updating description:", error);
            setError("Failed to update description");
        }
    };


    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewDescription(user?.description || ""); // Reset to original description
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <div className="flex justify-center mb-6">
                <img
                    src={user?.image || "/path/to/default-avatar.jpg"}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
            </div>

            <h2 className="text-center text-3xl font-semibold text-blue-600 mb-4">
                {user?.name || "No Name Provided"}
            </h2>

            <div className="text-center mb-4">
                <p className="text-lg text-gray-700">{user?.email || "No Email Provided"}</p>
                <p className="text-lg text-gray-700">{user?.location || "No Location Provided"}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">About Me</h3>

                {/* Display description or edit form */}
                {isEditing ? (
                    <div>
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Write something about yourself"
                        />
                        <div className="mt-4">
                            <button
                                onClick={handleSaveDescription}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="ml-4 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700">{user?.description || "No Description Available"}</p>
                )}

                {!isEditing && (
                    <button
                        onClick={handleEditDescription}
                        className="mt-4 text-blue-600 hover:text-blue-700"
                    >
                        Edit Description
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
