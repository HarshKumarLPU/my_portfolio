import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Award, ExternalLink, X, Calendar, ShieldCheck, Bookmark } from 'lucide-react';

const CertificateCard = ({ cert, onClick }) => {
    return (
        <motion.div
            onClick={() => onClick(cert)}
            className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl cursor-pointer hover:border-purple-500/50 transition-all duration-500 overflow-hidden flex flex-col h-[400px]"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Image Section - Larger and more visible */}
            <div className="relative w-full h-[70%] overflow-hidden">
                <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent"></div>

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#050510]/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-purple-500/80 transition-colors duration-500">
                    <Award className="text-white" size={18} />
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-white/[0.02]">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                        {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium">
                        {cert.issuer}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{cert.date}</span>
                    <div className="flex items-center text-purple-400 text-[10px] font-bold tracking-widest uppercase group-hover:translate-x-1 transition-transform duration-300">
                        Details <ExternalLink size={12} className="ml-1.5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CertificateModal = ({ cert, onClose }) => {
    if (!cert) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10"
        >
            <motion.div
                className="absolute inset-0 bg-[#050510]/90 backdrop-blur-xl"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            ></motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-[#0a0a15] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto hide-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section */}
                {/* <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden relative group shrink-0">
                    <img
                        // src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a15]/50 md:to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a15] to-transparent md:hidden"></div>
                </div> */}

                {/* Content Section */}
                <div className="p-6 sm:p-8 md:p-12 flex-1 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-20 group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div>
                        <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-4">
                            Verified Achievement
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-2 leading-tight">
                            {cert.title}
                        </h2>
                        <p className="text-purple-400 text-base sm:text-lg mb-6 sm:mb-8 font-medium italic">
                            {cert.issuer}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <Calendar size={18} className="text-purple-400" />
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Date</p>
                                    <p className="text-xs sm:text-sm font-medium text-gray-200">{cert.date}</p>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <Bookmark size={18} className="text-purple-400" />
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">ID</p>
                                    <p className="text-[10px] sm:text-xs font-mono text-gray-200 break-all">{cert.credentialId}</p>
                                </div>
                            </div> */}
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed capitalize">
                                    Official credential verified and issued by {cert.issuer}. This certification validates core competencies and advanced problem-solving skills.
                                </p>
                            </div>

                            <motion.a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all group justify-center sm:justify-start"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Verify Credential <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    const certificates = [
        {
            id: 1,
            title: "The Bits and Bytes of Computer Networking",
            issuer: "Coursera",
            date: "September 2024",
            credentialId: "COURSERA-NET-2024-BITS",
            link: "https://drive.google.com/file/d/1AyvR-FSopJJ1ZtZXJhdoRUc9-Y5LyE2J/view",
            image: "/Bits and bytes.png"
        },
        {
            id: 2,
            title: "Data Structures and Algorithms Using C++",
            issuer: "Cipher Schools",
            date: "November 2024",
            credentialId: "CIPHER-DSA-2024-CPP",
            link: "https://drive.google.com/file/d/1Fn-5TA0UBn4CAccj3W0O9LGkKE9s_xMn/view",
            image: "/Cipher Schools.png"
        },
        {
            id: 3,
            title: "Computer Communications Specialization",
            issuer: "Coursera",
            date: "November 2024",
            credentialId: "COURSERA-COMM-2024-SPEC",
            link: "https://drive.google.com/file/d/1PN7TGTlLDeOnoXvVbtIGgydAS4mIcJ-M/view",
            image: "/Computer Communications.png"
        },
        {
            id: 4,
            title: "Participated in Hackathon",
            issuer: "Binary Blitz",
            date: "March 2024",
            credentialId: "BINARY-BLITZ-2024-HACK",
            link: "https://drive.google.com/file/d/1sE-4qHOKLztGxijrhZCempW43pJm1Z27/view",
            image: "/Binary blitz.png"
        }
    ];

    return (
        <section id="certificates" className="relative w-full px-6 md:px-20 py-24 overflow-hidden snap-start snap-always flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    className="relative text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.02] leading-none pointer-events-none uppercase tracking-tighter whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Verified
                    </motion.span>
                    <h2 className="relative text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tight">
                        Certifications.
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates.map((cert) => (
                        <CertificateCard
                            key={cert.id}
                            cert={cert}
                            onClick={(c) => setSelectedCert(c)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCert && (
                    <CertificateModal
                        cert={selectedCert}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
