import Link from "next/link";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-30">
        <div className="container-custom"> 
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient cursor-pointer hover:scale-105 transition-transform duration-200">
                Smith Marketing Agency
              </h1>
            </Link>
            <Link href="/add-customer">
              <button className="btn btn-primary flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Client
              </button>
            </Link>
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
