// src/pages/Profile.jsx (UPDATED)
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useImageUpload } from "../hooks/useImageUpload";
import Spinner from "../components/Spinner";

export default function Profile() {
  const { user, logout } = useAuth();
  const { profilePicture, uploading, error, uploadProfilePicture, loadProfilePicture } = useImageUpload(user?.uid);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      loadProfilePicture();
    }
  }, [user]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG or PNG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    await uploadProfilePicture(file);
  };

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div>
        {/* Profile Picture */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--color-portal-green)',
            backgroundColor: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {uploading ? (
              <Spinner />
            ) : profilePicture || preview ? (
              <img 
                src={preview || profilePicture} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '3rem' }}>👤</span>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-portal-green)',
              color: '#1d1d1d',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Profile Picture'}
          </button>

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{error}</p>
          )}

          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            Accepted: JPG, PNG (max 5MB)
          </p>
        </div>

        {/* User Info */}
        <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.uid}</p>
          <p><strong>Account Created:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
        </div>

        <button 
          onClick={logout}
          style={{
            marginTop: '30px',
            padding: '12px 30px',
            backgroundColor: '#a30000',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}