import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function ContactDetailsPage() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { contactId } = router.query;

  useEffect(() => {
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  const fetchContact = async () => {
    try {
      const res = await fetch(`/api/contact/${contactId}`);
      const data = await res.json();
      if (data.status === "success") {
        setContact(data.data);
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const res = await fetch(`/api/contact/${contactId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/contacts");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="spinner w-8 h-8" />
        </div>
      </Layout>
    );
  }

  if (!contact) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Contact not found</h2>
            <Link href="/contacts">
              <button className="btn btn-primary">Back to Contacts</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="mb-4">
          <Link href="/contacts">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Contacts
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {contact.firstName} {contact.lastName}
              </h1>
              <div className="flex gap-2">
                {contact.isPrimary && (
                  <span className="badge badge-success">Primary Contact</span>
                )}
                <span className="badge badge-info capitalize">
                  {contact.preferredContact}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Full Name</h3>
                <p className="text-slate-100">{contact.firstName} {contact.lastName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Email</h3>
                <p className="text-primary-400">
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Phone</h3>
                <p className="text-slate-100">
                  {contact.phone ? (
                    <a href={`tel:${contact.phone}`} className="hover:underline text-primary-400">
                      {contact.phone}
                    </a>
                  ) : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Job Title</h3>
                <p className="text-slate-100">{contact.jobTitle || "N/A"}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Client</h3>
                <p className="text-slate-100">
                  {contact.client?.companyName || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Preferred Contact Method</h3>
                <p className="text-slate-100 capitalize">{contact.preferredContact}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">LinkedIn</h3>
                {contact.linkedInUrl ? (
                  <a 
                    href={contact.linkedInUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    View Profile
                  </a>
                ) : (
                  <p className="text-slate-400">N/A</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(contact.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Contact
            </button>
            <Link href={`/contacts/edit/${contact._id}`}>
              <button className="btn btn-primary">
                Edit Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactDetailsPage;
