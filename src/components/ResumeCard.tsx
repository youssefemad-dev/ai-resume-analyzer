import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "../../lib/puter";

export default function ResumeCard({resume}: {resume: Resume}) {
    const {fs} = usePuterStore();
    const [resumeurl, setResumeUrl] = useState<string>("");
      useEffect(() => {
        const loadResume = async () => {
          const blob  = await fs.read(resume.imagePath);
          if(!blob) return ;
          const url = URL.createObjectURL(blob);
          setResumeUrl(url);
    
        }
        loadResume();
      }, [resume.imagePath]);

    return (
        <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    <h2 className="!text-black font-bold break-words">
                        {resume.companyName}
                    </h2>
                    <h3 className="text-lg break-words text-gray-500">
                        {resume.jobTitle}
                    </h3>
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={resume.feedback.overallScore} />
                </div>
            </div>
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full overflow-hidden rounded-lg">
                    {resumeurl ? (
                        <img 
                            src={resumeurl} 
                            alt={`${resume.companyName} resume`} 
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" 
                        />
                    ) : (
                        <div className="w-full h-[350px] max-sm:h-[200px] flex items-center justify-center bg-gray-100 animate-pulse">
                            <span className="text-gray-400 text-sm">Loading preview...</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
