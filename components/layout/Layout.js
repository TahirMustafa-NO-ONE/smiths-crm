import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  // Don't show header/footer on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-30">
        <div className="container-custom"> 
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-8">
              <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200">
                  <Image 
                    src="/smith-logo.png" 
                    alt="Smith Marketing Agency Logo" 
                    width={48} 
                    height={48}
                    className="rounded-lg"
                  />
                  {/* <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient">
                    Smith Marketing Agency
                  </h1> */}
                </div>
              </Link>
              
              {/* Navigation Menu - only show for admin */}
              {session?.user?.role === "admin" && (
                <nav className="hidden md:flex items-center gap-2">
                  <Link href="/">
                    <button className={`nav-link ${router.pathname === "/" ? "text-primary-400" : ""}`}>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Clients
                    </button>
                  </Link>
                  <Link href="/users">
                    <button className={`nav-link ${router.pathname === "/users" ? "text-primary-400" : ""}`}>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Users
                    </button>
                  </Link>
                </nav>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/add-customer">
                <button className="btn btn-primary flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Client
                </button>
              </Link>
              
              {session && (
                <>
                  {/* User Profile */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                    {/* Avatar with initials */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {session.user.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                    </div>
                    
                    {/* User info */}
                    <div className="hidden sm:block">
                      <div className="text-sm font-semibold text-slate-200">
                        {session.user.name || 'User'}
                      </div>
                      <div className="text-xs text-slate-400 capitalize">
                        {session.user.role || 'user'}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="btn btn-secondary flex items-center border-danger-500/30 hover:bg-danger-600 hover:border-danger-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container-custom py-6">
        {children}
      </main>
      
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 mt-auto">
        <div className="container-custom py-6">
          <div className="text-center text-slate-400">
            <Link href="/" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Smith Marketing Agency
            </Link>
            {" "}<span className="text-slate-600">|</span>{" "}
            <span className="text-sm">Customer Relationship Management System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
