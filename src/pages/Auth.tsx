import { usePuterStore } from "../../lib/puter";
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router";

function Auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if(auth.isAuthenticated){
      navigate(next || "/");
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/public/images/bg-auth.svg')] bg-cover bg-center w-full h-full flex justify-center items-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 rounded-2xl bg-white p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <h2>Login to Continue</h2>
          </div>
          <div>
            {isLoading ?(
              <button className="auth-button animate-pulse">Signing you in...</button>
            ) : (
              <>
              {auth.isAuthenticated ? (
                <button className="auth-button" onClick={auth.signOut}><p>Log Out</p></button>
              ) : (
                <button className="auth-button" onClick={auth.signIn}><p>Login</p></button>
              )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Auth
