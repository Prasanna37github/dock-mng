import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, File, CheckCircle, XCircle, AlertCircle, Plus, Download, Trash2 } from 'lucide-react';

const FileUpload = () => {
  const [userName, setUserName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing uploads on component mount
  React.useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase
        .from('file_uploads')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching uploads:', error);
        setError('Failed to load existing uploads');
      } else {
        setUploads(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load existing uploads');
    } finally {
      setLoading(false);
    }
  };

  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/markdown',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/zip',
      'application/x-zip-compressed'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Please select a valid file type (PDF, Word, Markdown, Text, Image, or ZIP).';
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      return 'File size must be less than 100MB.';
    }

    return null;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile(file);
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async () => {
    if (!userName.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      // Step 1: Upload file to Supabase Storage
      const fileName = `${Date.now()}_${selectedFile.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('file-uploads')
        .upload(fileName, selectedFile, {
          contentType: selectedFile.type,
          cacheControl: '3600'
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      setUploadProgress(50);

      // Step 2: Get public URL
      const { data: { publicUrl } } = await supabase.storage
        .from('file-uploads')
        .getPublicUrl(fileName);

      setUploadProgress(75);

      // Step 3: Save file record to database
      const { error: dbError } = await supabase
        .from('file_uploads')
        .insert([
          {
            user_name: userName.trim(),
            file_name: selectedFile.name,
            file_type: selectedFile.type,
            file_size: selectedFile.size,
            file_url: publicUrl
          }
        ]);

      if (dbError) {
        throw new Error(`Failed to save file record: ${dbError.message}`);
      }

      setUploadProgress(100);
      setSuccess('File uploaded successfully!');
      
      // Clear form
      setUserName('');
      setSelectedFile(null);
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
      
      // Refresh uploads list
      await fetchUploads();
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message || 'Error uploading file. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('file_uploads')
        .delete()
        .eq('id', id);

      if (dbError) {
        throw new Error(`Failed to delete file record: ${dbError.message}`);
      }

      // Try to delete from storage
      try {
        await supabase.storage
          .from('file-uploads')
          .remove([fileName]);
      } catch (storageError) {
        console.warn('Storage cleanup failed:', storageError);
      }

      setSuccess('File deleted successfully!');
      await fetchUploads();
      
    } catch (error) {
      console.error('Error deleting file:', error);
      setError(error.message || 'Error deleting file. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Docky File Upload</h1>
        <p className="text-gray-600">Enter your name and upload your files</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <div className="mt-2 text-sm text-green-700">{success}</div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New File</h2>
        
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              id="user-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={uploading}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Supported formats: PDF, Word, Markdown, Text, Images, ZIP
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Maximum file size: 100MB
              </p>
              
              <input
                id="file-input"
                type="file"
                accept=".pdf,.doc,.docx,.md,.txt,.jpg,.jpeg,.png,.gif,.zip,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown,text/plain,image/jpeg,image/png,image/gif,application/zip,application/x-zip-compressed"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
              <label
                htmlFor="file-input"
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Choose File
              </label>
            </div>

            {selectedFile && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </button>
                </div>
                
                {uploading && (
                  <div className="mt-4">
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Uploading: {selectedFile.name}</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploads List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Uploaded Files ({uploads.length})
          </h2>
        </div>
        
        {uploads.length === 0 ? (
          <div className="text-center py-12">
            <File className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600">No files uploaded yet</p>
            <p className="text-sm text-gray-500">Upload your first file to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {uploads.map((upload) => (
              <div key={upload.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {upload.file_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Uploaded by: {upload.user_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(upload.uploaded_at)} • {formatFileSize(upload.file_size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {upload.file_url && (
                      <a
                        href={upload.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                        title="Download file"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(upload.id, upload.file_name)}
                      className="text-red-600 hover:text-red-500"
                      title="Delete file"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 