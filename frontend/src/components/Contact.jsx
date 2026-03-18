import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ submitting: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: null });
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus({ submitting: false, success: false, error: 'Failed to send message. Please try again later.' });
        }
    };

    return (
        <section id="contact" className="w-full px-6 md:px-20 py-20 min-h-screen snap-start snap-always flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-4xl mx-auto w-full relative z-10">
                <motion.div
                    className="relative text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] leading-none pointer-events-none uppercase tracking-tighter whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Contact
                    </motion.span>
                    <h2 className="relative text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                        Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">Out.</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400">Have a question or want to work together? Leave a message.</p>
                </motion.div>

                <motion.div
                    className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Decorative blur */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-light"
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-light"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute top-0 left-0 pl-4 pt-4 pointer-events-none">
                                <MessageSquare className="text-gray-500 group-focus-within:text-accent transition-colors" size={20} />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Your Message..."
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-light resize-none"
                            ></textarea>
                        </div>

                        {status.error && (
                            <p className="text-red-400 text-sm">{status.error}</p>
                        )}
                        {status.success && (
                            <p className="text-green-400 text-sm">Message sent successfully!</p>
                        )}

                        <button
                            type="submit"
                            disabled={status.submitting}
                            className="mt-2 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70 group overflow-hidden relative"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {status.submitting ? 'Sending...' : 'Send Message'}
                                <Send size={18} className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${status.submitting ? 'hidden' : ''}`} />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-0 w-full text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} Harsh Kumar. All rights reserved.</p>
            </div>
        </section>
    );
};

export default Contact;
