// import React, { useState } from 'react';
// import axios from 'axios';
// import Layout from '../components/Layout'; // Assuming you have a Layout component
// import imageCompression from 'browser-image-compression';


// const LabReportsPage: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [response, setResponse] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [filePreview, setFilePreview] = useState<string | null>(null);
//   const [isLab, setIsLab] = useState<boolean | null>(true);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedFile = event.target.files[0];
//       setFile(selectedFile);
//       if (selectedFile.type.startsWith('image/')) {
//         setFilePreview(URL.createObjectURL(selectedFile));
//       } else {
//         setFilePreview(null);
//       }
//     }
//   };


//   const classifyImage = async (imageFile: File) => {
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     try {
//       const res = await axios.post(
//         'https://your-classify-endpoint/api/classify-image',  // Replace with your actual classification API endpoint
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return res.data;
//     } catch (error) {
//       console.error('Error classifying image:', error);
//       return null;
//     }
//   };



//   const convertToPng = async (file: File): Promise<File> => {
//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 1920,
//       useWebWorker: true,
//       fileType: 'image/png',
//     };
//     try {
//       const compressedFile = await imageCompression(file, options);
//       return compressedFile;
//     } catch (error) {
//       console.error('Error converting to PNG:', error);
//       return file;
//     }
//   };

//   const toBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         if (reader.result) {
//           resolve((reader.result as string).split(',')[1]);
//         }
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

// const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!file) return;

//     setLoading(true);

//     let processedFile = file;

//     // Check if the file is a JPEG and convert to PNG if needed
//     if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
//       processedFile = await convertToPng(file);
//     }

//     const formData = new FormData();
//     formData.append('file', processedFile);
    
//     const classifyRes = await axios.post('https://final-image-classification.icysea-c7b6b719.uaenorth.azurecontainerapps.io/classify-image/', {
//       image_base64: await toBase64(processedFile),
//       image_extension: 'png',
//     });

//     // Continue with the upload

    
//     try {
//       const res = await axios.post(
//         'https://final-medibot-lab-reports.icysea-c7b6b719.uaenorth.azurecontainerapps.io/upload',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       setResponse(res.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderResults = () => {
//     if (!response) return null;

//     // Assuming the response structure is similar to the X-ray page
//     const { ensemble, ...models } = response;
//     const renderModelResults = (model: string) => (
//       <div key={model} className="border p-4 rounded-lg shadow-md mb-4">
//         <h3 className="text-lg font-semibold mb-2 capitalize">{model}</h3>
//         <ul className="list-disc list-inside">
//           {response[model].predicted_labels.length > 0 ? (
//             response[model].predicted_labels.map((label: string, index: number) => (
//               <li key={index}>{label}</li>
//             ))
//           ) : (
//             <li>No positive predictions</li>
//           )}
//         </ul>
//       </div>
//     );

//     return (
//       <div className="mt-6 w-full max-w-3xl">
//         <h2 className="text-xl font-bold mb-4">Model Results</h2>
//         <div className="border p-4 rounded-lg shadow-md mb-6">
//           <h3 className="text-lg font-semibold mb-2">Combined Prediction</h3>
//           <ul className="list-disc list-inside">
//             {ensemble.predicted_labels.length > 0 ? (
//               ensemble.predicted_labels.map((label: string, index: number) => (
//                 <li key={index}>{label}</li>
//               ))
//             ) : (
//               <li>No positive predictions</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen flex flex-col items-center justify-center py-12">
//         <h1 className="text-3xl font-bold mb-6">Upload Lab Report</h1>
//         <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg w-full max-w-md">
//           <input
//             type="file"
//             accept="image/*,.pdf"
//             onChange={handleFileChange}
//             className="mb-4 w-full p-2 border rounded"
//           />

//           {filePreview && (
//             <div className="mb-4">
//               <img src={filePreview} alt="File preview" className="max-h-64 w-auto mx-auto" />
//             </div>
//           )}

//           {file && file.type === 'application/pdf' && (
//             <div className="mb-4">
//               <p className="text-center">PDF file selected: {file.name}</p>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//             disabled={loading}
//           >
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//         </form>
//         {loading && <p className="mt-4">Processing...</p>}
//         {(isLab == false || isLab!= true) && <p className="mt-4">The image is not a Lab Report.</p>}
//         {renderResults()}
//       </div>
//     </Layout>
//   );
// };

// export default LabReportsPage;

import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // Assuming you have a Layout component
import imageCompression from 'browser-image-compression';
import ReactMarkdown from 'react-markdown'; // Make sure to install react-markdown

const LabReportsPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLabReport, setIsLabReport] = useState<boolean | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const convertToPng = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/png',
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error converting to PNG:', error);
      return file;
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve((reader.result as string).split(',')[1]);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {

    setLoading(true);

    event.preventDefault();
    if (!file) return;

    let processedFile = file;

    // Check if the file is a JPEG and convert to PNG if needed
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      processedFile = await convertToPng(file);
    }

    const formData = new FormData();
    formData.append('file', processedFile);


    try {
      const classifyRes = await axios.post('https://final-image-classification.icysea-c7b6b719.uaenorth.azurecontainerapps.io/classify-image/', {
        image_base64: await toBase64(processedFile),
        image_extension: 'png',
      });

      if (classifyRes.data['lab-report']) {
        const analyzeRes = await axios.post(
          'https://final-medibot-lab-reports.icysea-c7b6b719.uaenorth.azurecontainerapps.io/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(analyzeRes.data.report);
        setResponse(analyzeRes.data.report);
        setIsLabReport(true);
      } else {
        console.error('The uploaded image is not a lab report.');
        setIsLabReport(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-6">Upload Lab Report Image</h1>
        <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg w-full max-w-md">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full p-2 border rounded"
          />
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Lab report preview" className="max-h-64 w-auto mx-auto" />
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
        {isLabReport === false && <p className="mt-4">Please Upload a Lab Report Image</p>}
        {response && (
          <div className="mt-6 w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
            <ReactMarkdown className="prose">{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LabReportsPage;

