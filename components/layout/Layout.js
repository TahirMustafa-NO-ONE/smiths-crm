import Link from "next/link";

function Layout({ children }) {
  return (
    <>
      <header className="header">
        <h2>Smith Marketing Agency</h2>
        <Link href="/add-customer">Add Customer</Link>
      </header>
      <div className="main">{children}</div>
      <footer className="footer">
      <a href='#' target='_top' rel='noreferrer'>Smith Marketing Agency</a> | Customer Relationship Management System
      </footer>
    </>
  );
}

export default Layout;
