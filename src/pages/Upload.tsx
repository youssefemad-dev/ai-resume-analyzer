import Navbar from "../components/Navbar";
import FileUploader from "../components/FlieUploader";
import { useState } from "react";
export default function Upload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!companyName || !jobTitle || !jobDescription) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsProcessing(true);
      setStatusText("Processing your resume...");

      // Simulate processing - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatusText("Analyzing content...");
      setIsProcessing(false);

      // Navigate to results page or show results
      // For now, just log the submission
      console.log({ companyName, jobTitle, jobDescription, file });
    } catch (error) {
      console.error(error);
      setStatusText("Error processing resume");
      setIsProcessing(false);
    }
  };

  const handleFileSelected = (file: File | null) => {
    setFile(file);
  };
  return (
    <main className="bg-[url('/public/images/bg-main.svg')] bg-cover bg-center w-full h-full">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1 className="text-gradient">Smart Resume Analyzer</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>
              Upload your resume and get AI-powered feedback on how to improve
              it.
            </h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleUpload}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelected={handleFileSelected} />
              </div>
              <button type="submit" className="primary-button">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
