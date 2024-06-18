import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // Assuming you have a Layout component

const XrayPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));

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
        'http://medibot-ensemble-model-docker.icyflower-27afbae0.uaenorth.azurecontainerapps.io/predict',
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
        {/* <div className="mt-2">
          <h4 className="text-md font-medium">Probabilities:</h4>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(response[model].probabilities, null, 2)}
          </pre>
        </div> */}
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
          {/* <div className="mt-2">
            <h4 className="text-md font-medium">Probabilities:</h4>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(ensemble.probabilities, null, 2)}
            </pre>
          </div> */}
        </div>
        {/* <h2 className="text-xl font-bold mb-4">Model Results</h2>
        {Object.keys(models).map((model) => renderModelResults(model))} */}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-6">Upload X-ray Image</h1>
        <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-lg w-full max-w-md">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full p-2 border rounded"
          />

        {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="X-ray preview" className="max-h-64 w-auto mx-auto" />
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

export default XrayPage;
