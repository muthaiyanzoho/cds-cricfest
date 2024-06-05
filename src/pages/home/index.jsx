import { Link } from "react-router-dom";
import { useUser } from "../../context/user";
import { useEffect } from "react";

export default function HomePage() {
  const { getUserDetails } = useUser();
  const userDetails = getUserDetails();

  useEffect(() => {
    window.catalyst.auth.signIn("embededAuth", { signin_providers_only: true });
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="relative px-6 isolate pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="flex items-center">
            <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  CDS Cricfest
                </h1>
               
                <div className="flex items-center justify-center mt-10 gap-x-6">
                  {userDetails ? (
                    <Link
                      to="/dashboard"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <div id="embededAuth"></div>
                  )}
                
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
}
