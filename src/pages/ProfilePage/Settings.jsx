import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";  // Assuming you have a custom hook for authentication

const Settings = () => {
    const { user } = useAuth();  // Assuming you have the user data
    const [name, setName] = useState(user?.displayName || "");
    const [location, setLocation] = useState(user?.location || "");
    const [description, setDescription] = useState(user?.description || "");
    const [image, setImage] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Assuming you have an image upload function
            imageUpload(file).then((url) => setImage(url));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = {
                email: user.email,
                name,
                location,
                description,
                image,
            };
            // Make PUT request to update user info
            const response = await axios.put("http://localhost:5000/users", updatedUser);
            console.log("User updated:", response.data);
            alert("Profile updated successfully!");
        } catch (err) {
            setError("Failed to update profile");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Image upload function (similar to what we discussed earlier)
    const imageUpload = async (imageData) => {
        const formData = new FormData();
        formData.append("file", imageData);
        formData.append("upload_preset", "your_cloudinary_preset");

        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
            formData
        );
        return data.secure_url;
    };

    return (
        <div className="settings-container">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Profile Picture */}
                <div className="mb-4">
                    <label className="block text-lg">Profile Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mt-2"
                    />
                    {image && <img src={image} alt="Profile" className="mt-4 w-24 h-24 rounded-full" />}
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-lg">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label className="block text-lg">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-lg">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                        rows="4"
                    />
                </div>

                {/* Submit */}
                <div className="mb-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
