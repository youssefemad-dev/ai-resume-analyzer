import { resumes } from "../../constants/index.ts"
import ResumeCard from "../components/ResumeCard.tsx"
import Navbar from "../components/Navbar.tsx"
import { usePuterStore } from "../../lib/puter";
import { useEffect } from "react"
import { useNavigate } from "react-router";

function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!auth.isAuthenticated){
      navigate("/Auth?next=/");
    }
  }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/public/images/bg-main.svg')] bg-cover bg-center w-full h-full">
            <Navbar />

      <section className="main-section">
          <div className="page-heading">
            <h1 className="text-gradient">AI Resume Analyzer</h1>
            <h2 className="text-gradient">Upload your resume and get AI-powered feedback on how to improve it.</h2>
          </div>
        
        {resumes.length > 0 && (
          <section className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume}/>
          ))}
          </section>
        )}
    </section>

    </main>
  )
}

export default Home
