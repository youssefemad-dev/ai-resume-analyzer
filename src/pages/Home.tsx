import ResumeCard from "../components/ResumeCard.tsx"
import Navbar from "../components/Navbar.tsx"
import { usePuterStore } from "../../lib/puter";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router";

function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!auth.isAuthenticated){
      navigate("/Auth?next=/");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if(!auth.isAuthenticated) return;

    const loadResumes = async () => {
      setIsLoading(true);
      try {
        const items = await kv.list("resume:*", true);
        if(!items || items.length === 0) {
          setResumes([]);
          return;
        }
        const parsed = (items as { key: string; value: string }[])
          .map((item) => {
            try { return JSON.parse(item.value) as Resume; }
            catch { return null; }
          })
          .filter(Boolean) as Resume[];
        setResumes(parsed);
      } catch(err) {
        console.error("Failed to load resumes:", err);
        setResumes([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumes();
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/public/images/bg-main.svg')] bg-cover bg-center w-full h-full">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1 className="text-gradient">AI Resume Analyzer</h1>
          <h2 className="text-gradient">Upload your resume and get AI-powered feedback on how to improve it.</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-gray-400 text-lg animate-pulse">Loading your resumes...</p>
          </div>
        ) : resumes.length > 0 ? (
          <section className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume}/>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <p className="text-gray-500 text-lg">You haven't analyzed any resumes yet.</p>
            <Link to="/upload" className="primary-button">Upload Your First Resume</Link>
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
