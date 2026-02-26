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
                <nav className="hidden lg:flex items-center gap-1">
                  <Link href="/dashboard">
                    <button className={`nav-link ${router.pathname === "/dashboard" ? "text-primary-400" : ""}`}>
                      Dashboard
                    </button>
                  </Link>
                  <Link href="/clients">
                    <button className={`nav-link ${router.pathname.startsWith("/clients") ? "text-primary-400" : ""}`}>
                      Clients
                    </button>
                  </Link>
                  <Link href="/team">
                    <button className={`nav-link ${router.pathname.startsWith("/team") ? "text-primary-400" : ""}`}>
                      Team
                    </button>
                  </Link>
                  <Link href="/contacts">
                    <button className={`nav-link ${router.pathname.startsWith("/contacts") ? "text-primary-400" : ""}`}>
                      Contacts
                    </button>
                  </Link>
                  <Link href="/leads">
                    <button className={`nav-link ${router.pathname.startsWith("/leads") ? "text-primary-400" : ""}`}>
                      Leads
                    </button>
                  </Link>
                  <Link href="/projects">
                    <button className={`nav-link ${router.pathname.startsWith("/projects") ? "text-primary-400" : ""}`}>
                      Projects
                    </button>
                  </Link>
                  <Link href="/campaigns">
                    <button className={`nav-link ${router.pathname.startsWith("/campaigns") ? "text-primary-400" : ""}`}>
                      Campaigns
                    </button>
                  </Link>
                  <Link href="/tasks">
                    <button className={`nav-link ${router.pathname.startsWith("/tasks") ? "text-primary-400" : ""}`}>
                      Tasks
                    </button>
                  </Link>
                  <Link href="/users">
                    <button className={`nav-link ${router.pathname.startsWith("/users") ? "text-primary-400" : ""}`}>
                      Users
                    </button>
                  </Link>
                </nav>
              )}
            </div>
            
            <div className="flex items-center gap-3">
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
                    className="btn btn-secondary flex items-center hover:bg-danger-600 hover:border-danger-500"
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
