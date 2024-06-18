import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // Assuming you have a Layout component

const LabReportsPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const res = await axios.post(
        'http://example-api-url.com/predict', // Replace with your actual API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResponse(res.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (!response) return null;

    // Assuming the response structure is similar to the X-ray page
    const { ensemble, ...models } = response;
    const renderModelResults = (model: string) => (
      <div key={model} className="border p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2 capitalize">{model}</h3>
        <ul className="list-disc list-inside">
          {response[model].predicted_labels.length > 0 ? (
            response[model].predicted_labels.map((label: string, index: number) => (
              <li key={index}>{label}</li>
            ))
          ) : (
            <li>No positive predictions</li>
          )}
        </ul>
      </div>
    );

    return (
      <div className="mt-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Model Results</h2>
        <div className="border p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-2">Combined Prediction</h3>
          <ul className="list-disc list-inside">
            {ensemble.predicted_labels.length > 0 ? (
              ensemble.predicted_labels.map((label: string, index: number) => (
                <li key={index}>{label}</li>
              ))
            ) : (
              <li>No positive predictions</li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-6">Upload Lab Report</h1>
        <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg w-full max-w-md">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="mb-4 w-full p-2 border rounded"
          />

          {filePreview && (
            <div className="mb-4">
              <img src={filePreview} alt="File preview" className="max-h-64 w-auto mx-auto" />
            </div>
          )}

          {file && file.type === 'application/pdf' && (
            <div className="mb-4">
              <p className="text-center">PDF file selected: {file.name}</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {loading && <p className="mt-4">Processing...</p>}
        {renderResults()}
      </div>
    </Layout>
  );
};

export default LabReportsPage;
