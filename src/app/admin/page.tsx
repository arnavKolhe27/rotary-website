"use client";
import { useState, useRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("members");

  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Member Form State
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("President");
  const [year, setYear] = useState("2026-2027");
  const [achievements, setAchievements] = useState("");
  const [projects, setProjects] = useState("");
  const [milestones, setMilestones] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  
  // Cropper State
  const [image, setImage] = useState("");
  const cropperRef = useRef<ReactCropperElement>(null);
  
  // Account Transition State
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Project State
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("Education");
  const [projectOperatingYear, setProjectOperatingYear] = useState("2024-2025");
  const [projectShortDescription, setProjectShortDescription] = useState("");
  const [projectFullDetails, setProjectFullDetails] = useState("");
  
  // Donation State
  const [donationData, setDonationData] = useState({
    bankName: "", accountName: "", accountNumber: "", ifscCode: "", qrCodeBase64: ""
  });
  
  // Lists State
  const [memberList, setMemberList] = useState<any[]>([]);
  const [projectList, setProjectList] = useState<any[]>([]);

  const loadMembers = () => fetch("/api/members").then(r => r.json()).then(d => setMemberList(d));
  const loadProjects = () => fetch("/api/projects").then(r => r.json()).then(d => setProjectList(d));

  // Board Image State
  const [boardImageSrc, setBoardImageSrc] = useState<string>("");
  const [boardImageFile, setBoardImageFile] = useState<string>("");
  const [boardImageError, setBoardImageError] = useState<string>("");
  const [boardImageLoading, setBoardImageLoading] = useState(false);

  const loadBoardImage = () =>
    fetch("/api/board-image")
      .then(r => r.json())
      .then(d => { if (d.imageUrl) setBoardImageSrc(d.imageUrl); });

  // Event State
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const event = { title: eventTitle, date: eventDate, time: eventTime, location: eventLocation };
    const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(event) });
    if (res.ok) {
      alert("Event saved successfully!");
      setEventTitle(""); setEventDate(""); setEventTime(""); setEventLocation("");
    } else {
      alert("Error saving event.");
    }
  };

  const onBulletinFileChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const bulletin = { name: file.name, pdfBase64: reader.result as string };
        const res = await fetch("/api/bulletins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(bulletin) });
        if (res.ok) alert("Bulletin uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Historical State
  const [histName, setHistName] = useState("");
  const [histStart, setHistStart] = useState("");
  const [histEnd, setHistEnd] = useState("");
  const [histAchievements, setHistAchievements] = useState("");
  const [histProjects, setHistProjects] = useState("");
  const [histMilestones, setHistMilestones] = useState("");

  const handleSaveHistorical = async (e: React.FormEvent) => {
    e.preventDefault();
    let photoURL = "";
    if (image && cropperRef.current && cropperRef.current?.cropper) {
      photoURL = cropperRef.current.cropper.getCroppedCanvas({ width: 400, height: 400 }).toDataURL("image/jpeg", 0.8);
    }
    const member = {
      name: histName,
      designation: "President",
      year: `${histStart}-${histEnd}`,
      displayOrder: 1,
      photoURL,
      bio: { achievements: histAchievements, projects: histProjects, milestones: histMilestones }
    };
    const res = await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(member) });
    if (res.ok) {
      alert("Historical record saved!");
      setHistName(""); setHistStart(""); setHistEnd(""); setHistAchievements(""); setHistProjects(""); setHistMilestones(""); setImage("");
      loadMembers();
    }
  };

  // Load Data when tab changes
  useEffect(() => {
    if (activeTab === "donations") {
      fetch("/api/donation").then(r => r.json()).then(d => setDonationData(d));
    } else if (activeTab === "members") {
      loadMembers();
    } else if (activeTab === "projects") {
      loadProjects();
    } else if (activeTab === "boardImage") {
      loadBoardImage();
    }
  }, [activeTab]);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    let photoURL = "";
    if (image && cropperRef.current && cropperRef.current?.cropper) {
      photoURL = cropperRef.current.cropper.getCroppedCanvas({ width: 800, height: 600 }).toDataURL("image/jpeg", 0.8);
    }
    const project = { 
      title: projectTitle, 
      category: projectCategory, 
      operatingYear: projectOperatingYear, 
      shortDescription: projectShortDescription, 
      fullDetails: projectFullDetails, 
      photoURL 
    };
    const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(project) });
    if (res.ok) {
      alert("Project saved successfully!");
      setProjectTitle(""); setProjectOperatingYear("2024-2025"); setProjectShortDescription(""); setProjectFullDetails(""); setImage("");
    } else {
      alert("Error saving project.");
    }
  };

  const handleSaveDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData)
    });
    if (res.ok) alert("Donation details updated successfully!");
    else alert("Failed to update donation details.");
  };

  const onDonationFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setDonationData({...donationData, qrCodeBase64: reader.result as string});
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    
    if (res.ok) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const onFileChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files && files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let photoURL = "";
    if (image && cropperRef.current && cropperRef.current?.cropper) {
      // Force 1:1 crop to base64
      photoURL = cropperRef.current.cropper.getCroppedCanvas({
        width: 400,
        height: 400
      }).toDataURL("image/jpeg", 0.8);
    }

    const member = {
      name,
      designation,
      year,
      displayOrder: Number(displayOrder),
      photoURL,
      bio: { achievements, projects, milestones }
    };

    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member)
    });

    if (res.ok) {
      alert("Member saved successfully!");
      // Reset form
      setName(""); setImage("");
      setAchievements(""); setProjects(""); setMilestones("");
    } else {
      alert("Error saving member.");
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently remove this member?")) return;
    const res = await fetch(`/api/members?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Member removed.");
      loadMembers();
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently remove this project?")) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Project removed.");
      loadProjects();
    }
  };

  const handleTogglePin = async (id: string, currentPinnedStatus: boolean) => {
    const newPinnedStatus = !currentPinnedStatus;
    setProjectList(prev => prev.map(p => p.id === id ? { ...p, pinned: newPinnedStatus } : p));
    
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pinned: newPinnedStatus })
      });
      if (!res.ok) throw new Error("Failed");
    } catch (e) {
      setProjectList(prev => prev.map(p => p.id === id ? { ...p, pinned: currentPinnedStatus } : p));
      alert("Failed to update pin status.");
    }
  };

  const handleAccountTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail, newPassword })
    });
    if (res.ok) {
      alert("Account credentials updated successfully.");
      setNewEmail(""); setNewPassword("");
    } else {
      alert("Error updating credentials.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-gray p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-extrabold text-primary mb-2 text-center">Admin Gateway</h1>
          <p className="text-gray-500 text-sm mb-8 text-center">Secure portal for authorized personnel</p>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && <div className="text-red-500 text-sm font-semibold">{loginError}</div>}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</label>
              <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Password</label>
              <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all" required />
            </div>
            <button type="submit" className="w-full btn-primary mt-4">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-gray p-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary">Admin Dashboard</h1>
          <a href="/api/backup" download className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Download Insurance Copy
          </a>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => setActiveTab("members")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "members" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Member Manager</button>
          <button onClick={() => setActiveTab("historical")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "historical" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Historical Back-Population</button>
          <button onClick={() => setActiveTab("projects")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "projects" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Projects Ledger</button>
          <button onClick={() => setActiveTab("events")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "events" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Club Calendar & Events</button>
          <button onClick={() => setActiveTab("bulletin")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "bulletin" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Weekly Bulletin Archives</button>
          <button onClick={() => setActiveTab("boardImage")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "boardImage" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Board Poster Image</button>
          <button onClick={() => setActiveTab("donations")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "donations" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Manage Donation & Bank</button>
          <button onClick={() => setActiveTab("settings")} className={`px-6 py-3 rounded-full font-bold text-sm ${activeTab === "settings" ? "bg-primary text-white" : "bg-white text-gray-600 shadow-sm"}`}>Account Transition</button>
        </div>

        {activeTab === "members" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Add / Update Member</h2>
            <form onSubmit={handleSaveMember} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Designation</label>
                    <select value={designation} onChange={e => setDesignation(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3">
                      <option>President</option>
                      <option>Vice President</option>
                      <option>Secretary</option>
                      <option>Treasurer</option>
                      <option>Club Trainer</option>
                      <option>Vocational Service</option>
                      <option>Community Service Medical</option>
                      <option>Community Non-Medical</option>
                      <option>Club Services</option>
                      <option>International</option>
                      <option>New Generation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Operating Year</label>
                    <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Display Order (for Symmetry)</label>
                  <input type="number" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} className="w-full border border-gray-200 rounded-lg p-3" min={1} />
                </div>

                {(designation === "President" || designation === "Club President") && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Bio Metrics</h3>
                    <textarea placeholder="Key Achievements" value={achievements} onChange={e => setAchievements(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" />
                    <textarea placeholder="Major Projects" value={projects} onChange={e => setProjects(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" />
                    <textarea placeholder="Milestones" value={milestones} onChange={e => setMilestones(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Smartphone Photo (Auto-Cropper)</label>
                <input type="file" onChange={onFileChange} className="w-full border border-dashed border-gray-300 p-6 rounded-xl text-center mb-4 text-sm" accept="image/*" />
                
                {image ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <Cropper
                      src={image}
                      style={{ height: 300, width: "100%" }}
                      aspectRatio={NaN}
                      guides={true}
                      ref={cropperRef}
                      viewMode={1}
                      dragMode="move"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl h-[300px] flex items-center justify-center text-gray-400 text-sm">
                    No photo uploaded. Fallback SVG will be used automatically.
                  </div>
                )}

                <button type="submit" className="w-full btn-primary mt-8">Save Profile</button>
              </div>
            </form>

            <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold mb-6">Active Directory Ledger</h2>
              <div className="space-y-4">
                {memberList.map(member => (
                  <div key={member.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.designation} ({member.year})</p>
                    </div>
                    <button onClick={() => handleDeleteMember(member.id)} className="text-red-600 hover:text-red-800 text-sm font-bold transition-colors">Delete Member</button>
                  </div>
                ))}
                {memberList.length === 0 && <p className="text-sm text-gray-500">No members found.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bulletin" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Bulletin PDF Manager</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
              <svg className="w-12 h-12 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <h3 className="font-bold text-lg mb-1">Drag and drop PDF here</h3>
              <p className="text-sm text-gray-500">The latest upload will automatically display on the homepage.</p>
              <input type="file" onChange={onBulletinFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" />
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-xl font-bold mb-6">Club Calendar & Events</h2>
            <form onSubmit={handleSaveEvent} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Event Title</label>
                <input type="text" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Event Date</label>
                  <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Event Time</label>
                  <input type="text" placeholder="e.g., 6:30 PM" value={eventTime} onChange={e => setEventTime(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Event Location / Platform</label>
                <input type="text" placeholder="e.g., Hotel Grand Ambika or Zoom" value={eventLocation} onChange={e => setEventLocation(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
              </div>
              <button type="submit" className="w-full btn-primary mt-4">Save Event</button>
            </form>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Projects Manager</h2>
            <form onSubmit={handleSaveProject} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Project Title</label>
                  <input type="text" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Project Category Avenues</label>
                  <select value={projectCategory} onChange={e => setProjectCategory(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3">
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Other Initiatives">Other Initiatives</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Project Operational Year</label>
                  <select value={projectOperatingYear} onChange={e => setProjectOperatingYear(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3">
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Short Project Teaser Summary (Displays on Main Grid Cards)</label>
                  <textarea value={projectShortDescription} onChange={e => setProjectShortDescription(e.target.value)} maxLength={120} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" required></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Complete Long-Form Project Narrative Details (Displays on View More Dynamic Page)</label>
                  <textarea value={projectFullDetails} onChange={e => setProjectFullDetails(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[150px]" required></textarea>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Project Photo (Cropper)</label>
                <input type="file" onChange={onFileChange} className="w-full border border-dashed border-gray-300 p-6 rounded-xl text-center mb-4 text-sm" accept="image/*" />
                {image ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <Cropper
                      src={image}
                      style={{ height: 300, width: "100%" }}
                      aspectRatio={NaN}
                      guides={true}
                      ref={cropperRef}
                      viewMode={1}
                      dragMode="move"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl h-[300px] flex items-center justify-center text-gray-400 text-sm">No photo uploaded.</div>
                )}
                <button type="submit" className="w-full btn-primary mt-8">Save Project</button>
              </div>
            </form>

            <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold mb-2">Existing Projects Ledger</h2>
              {projectList.filter(p => p.pinned).length > 10 && (
                <div className="mb-4 text-sm text-yellow-800 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                  10+ projects pinned — for the best homepage layout, consider unpinning a few.
                </div>
              )}
              <div className="space-y-4">
                {projectList.map(project => (
                  <div key={project.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-800">{project.title}</p>
                      <p className="text-sm text-gray-500">{project.category} ({project.operatingYear || 'No Year'})</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleTogglePin(project.id, !!project.pinned)}
                        className={`text-sm flex items-center justify-center p-2 rounded-full transition-colors ${project.pinned ? 'text-[#0079C1] bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
                        title={project.pinned ? "Unpin from homepage" : "Pin to homepage"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={project.pinned ? "currentColor" : "none"} stroke="currentColor" className="w-5 h-5" strokeWidth={project.pinned ? "0" : "1.5"}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:text-red-800 text-sm font-bold transition-colors">Delete Project</button>
                    </div>
                  </div>
                ))}
                {projectList.length === 0 && <p className="text-sm text-gray-500">No projects found.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-xl font-bold mb-6">Manage Donation & Bank parameters</h2>
            <form onSubmit={handleSaveDonation} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Bank Name</label>
                  <input type="text" value={donationData.bankName} onChange={e => setDonationData({...donationData, bankName: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Account Name</label>
                  <input type="text" value={donationData.accountName} onChange={e => setDonationData({...donationData, accountName: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Account Number</label>
                  <input type="text" value={donationData.accountNumber} onChange={e => setDonationData({...donationData, accountNumber: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">IFSC Code</label>
                  <input type="text" value={donationData.ifscCode} onChange={e => setDonationData({...donationData, ifscCode: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">QR Code Graphic</label>
                {donationData.qrCodeBase64 && (
                  <div className="mb-4">
                    <img src={donationData.qrCodeBase64} alt="QR Code" className="w-32 h-32 object-contain border rounded-lg p-2" />
                  </div>
                )}
                <input type="file" onChange={onDonationFileChange} className="w-full border border-dashed border-gray-300 p-6 rounded-xl text-center text-sm" accept="image/*" />
              </div>
              <button type="submit" className="w-full btn-primary mt-4">Save Donation Details</button>
            </form>
          </div>
        )}

        {activeTab === "historical" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Historical Back-Population</h2>
            <form onSubmit={handleSaveHistorical} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">President Name</label>
                  <input type="text" value={histName} onChange={e => setHistName(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Term Start Year</label>
                    <input type="number" placeholder="2024" value={histStart} onChange={e => setHistStart(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Term End Year</label>
                    <input type="number" placeholder="2025" value={histEnd} onChange={e => setHistEnd(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Bio Metrics</h3>
                  <textarea placeholder="Key Achievements" value={histAchievements} onChange={e => setHistAchievements(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" />
                  <textarea placeholder="Major Projects" value={histProjects} onChange={e => setHistProjects(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" />
                  <textarea placeholder="Milestones" value={histMilestones} onChange={e => setHistMilestones(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 min-h-[80px]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">President Profile Photo (1:1)</label>
                <input type="file" onChange={onFileChange} className="w-full border border-dashed border-gray-300 p-6 rounded-xl text-center mb-4 text-sm" accept="image/*" />
                
                {image ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <Cropper
                          src={image}
                          style={{ height: 300, width: "100%" }}
                          aspectRatio={NaN}
                          guides={true}
                          ref={cropperRef}
                          viewMode={1}
                          dragMode="move"
                        />
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl h-[300px] flex items-center justify-center text-gray-400 text-sm">
                    No photo uploaded. Fallback SVG will be used automatically.
                  </div>
                )}

                <button type="submit" className="w-full btn-primary mt-8">Save Historical Record</button>
              </div>
            </form>

            <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold mb-6">Historical Ledger</h2>
              <div className="space-y-4">
                {memberList.filter(m => m.designation === "President" || m.designation === "Club President").map(member => (
                  <div key={member.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.designation} ({member.year})</p>
                    </div>
                    <button onClick={() => handleDeleteMember(member.id)} className="text-red-600 hover:text-red-800 text-sm font-bold transition-colors">Delete Historical Profile</button>
                  </div>
                ))}
                {memberList.filter(m => m.designation === "President" || m.designation === "Club President").length === 0 && <p className="text-sm text-gray-500">No historical records found.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "boardImage" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-xl font-bold mb-2">Board Poster Image</h2>
            <p className="text-sm text-gray-500 mb-6">Upload the official board-of-directors group photo. Maximum 5 MB. This replaces what is shown on the public /board page.</p>

            {/* Current image preview */}
            {boardImageSrc && (
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Current Active Image</p>
                <img src={boardImageSrc} alt="Current board poster" className="w-full max-h-80 object-contain rounded-xl border border-gray-100" />
              </div>
            )}

            {/* Error display */}
            {boardImageError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                ⚠️ {boardImageError}
              </div>
            )}

            {/* File picker */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer relative mb-6">
              <svg className="w-10 h-10 text-accent mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p className="text-sm font-semibold text-gray-600">Click to select image (JPG, PNG — max 5 MB)</p>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  setBoardImageError("");
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    setBoardImageError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed is 5 MB.`);
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => setBoardImageFile(reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
            </div>

            {/* Preview of newly selected file */}
            {boardImageFile && (
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Selected (not yet saved)</p>
                <img src={boardImageFile} alt="Preview" className="w-full max-h-80 object-contain rounded-xl border border-blue-100" />
              </div>
            )}

            <button
              disabled={!boardImageFile || boardImageLoading}
              onClick={async () => {
                if (!boardImageFile) return;
                setBoardImageLoading(true);
                setBoardImageError("");
                try {
                  const res = await fetch("/api/board-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageBase64: boardImageFile }),
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    setBoardImageError(data.error || "Upload failed.");
                  } else {
                    setBoardImageSrc(boardImageFile);
                    setBoardImageFile("");
                    alert("Board image updated successfully!");
                  }
                } catch {
                  setBoardImageError("Network error — please try again.");
                } finally {
                  setBoardImageLoading(false);
                }
              }}
              className="w-full btn-primary mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {boardImageLoading ? "Uploading..." : "Save & Publish Board Image"}
            </button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-lg">
            <h2 className="text-xl font-bold mb-6">Account Transition</h2>
            <p className="text-sm text-gray-600 mb-6">
              Use this tool to securely hand over administrative access to the incoming officers.
            </p>
            <form onSubmit={handleAccountTransition} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Incoming Secretary Email</label>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Outgoing Password Reset</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3" required />
              </div>
              <button type="submit" className="w-full btn-primary mt-4">Confirm Handover</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
