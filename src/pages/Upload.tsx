import Navbar from "../components/Navbar";
import FileUploader from "../components/FlieUploader";
import { useState } from "react";
import { convertPdfToImage } from "../../lib/pdf2Img";
import { usePuterStore } from "../../lib/puter";
import { useNavigate } from "react-router-dom";
import { generateUUID } from "../utils/format";
import { prepareInstructions } from "../../constants";
export default function Upload() {
  const { auth, fs, ai, isLoading, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const haandleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Processing your resume...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: failed to upload");
    setStatusText("Converting to image...");

    const imageFile = await convertPdfToImage(file);
    if (imageFile.error || !imageFile.file) {
      console.error("PDF conversion error:", imageFile.error);
      return setStatusText(`Error: ${imageFile.error || "failed to convert"}`);
    }
    setStatusText("Analyzing resume...");

    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: failed to upload");
    setStatusText("Analyzing resume...");

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing resume...");
    try {
      const feedback = await ai.feedback(
        uploadedImage.path, // Use image path instead of PDF
        prepareInstructions({ jobTitle, jobDescription }),
      );
      if (!feedback)
        return setStatusText("Error: AI did not return a response");

      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : JSON.stringify(feedback.message.content);

      console.log("Raw feedback:", feedbackText);

      // Try to parse the feedback as JSON
      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(feedbackText);
      } catch {
        // If it's not valid JSON, try to extract JSON from the text
        const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedFeedback = JSON.parse(jsonMatch[0]);
        } else {
          console.error("Could not parse feedback as JSON");
          return setStatusText("Error: AI response was not in expected format");
        }
      }

      console.log("Parsed feedback:", parsedFeedback);
      data.feedback = parsedFeedback; // Store as parsed object
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete!");
      console.log(data);
      // navigate(`/resume/${uuid}`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Analysis error:", err);
      return setStatusText(`Error: Failed to analyze resume - ${errorMsg}`);
    }
  };

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
    haandleAnalyze({ companyName, jobTitle, jobDescription, file });
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
