import React, { useState } from 'react';

function Resources() {
    const [resources, setResources] = useState([]);
    const [newResource, setNewResource] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setNewResource(e.target.files[0]);
    };

    const handleUpload = () => {
        if (newResource) {
            setUploading(true);
            // Simulate an upload process
            setTimeout(() => {
                setResources([...resources, newResource]);
                setNewResource(null);
                setUploading(false);
            }, 1000);
        }
    };

    const handleDelete = (index) => {
        const updatedResources = resources.filter((_, i) => i !== index);
        setResources(updatedResources);
    };

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Resources</h2>

            <div className="mb-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ marginRight: '10px' }}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleUpload}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            {resources.length > 0 && (
                <div className="list-group">
                    {resources.map((resource, index) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {resource.name}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Resources;
