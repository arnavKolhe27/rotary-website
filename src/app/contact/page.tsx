"use client";

export default function ContactPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">Contact Us</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          We welcome inquiries from fellow Rotarians, volunteers, and organizations looking to partner with us for community service projects.
        </p>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">Email</h3>
            <p className="text-accent font-medium">rcamravatiambika@gmail.com</p>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">Meetings</h3>
            <p className="text-navy-900 font-medium">
              When: Wednesday at 21:00 | Twice a month / In Person<br/>
              Where (In-Person): The Oak Restaurant, Rajapeth Square, Amravati, 444605, India
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-6">Send an Inquiry</h2>
        <form className="space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = Object.fromEntries(new FormData(form));
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            alert('Message sent!');
            form.reset();
          } else {
            alert('Error sending message');
          }
        }}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">First Name</label>
              <input name="firstName" type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Last Name</label>
              <input name="lastName" type="text" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-accent" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <input name="email" type="email" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-accent" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea name="message" className="w-full border border-gray-200 rounded-lg p-3 min-h-[150px] outline-none focus:border-accent" required></textarea>
          </div>
          <button type="submit" className="w-full btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
}
