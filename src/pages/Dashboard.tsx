import { useState, useEffect } from "react";
import { FaChartBar, FaUsers, FaCog, FaFileAlt, FaBars, FaTimes, FaDownload, FaPrint, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdExit } from "react-icons/io";

const rows = [
  "Omsetning eksklusiv MVA",
  "Korrigert omsetningsplikt (1, 2 og 3)",
  "varekjop",
  "Lonn + sosiale kostnader montorer, larlinger",
  "Lonn + sosiale kostnader installator som montor",
  "Innleid arbeid (se ogsa post 16 og 43)",
  "Bruttofortjeneste",
  "ovrige driftskostnader",
  "Brutto driftsresultat",
  "Finansinntekter / finanskostnader",
  "Netto driftsresultat for ekstraordinare poster og arsoppgjorsdisp.",
  "Sum utfakturerte [produktive] timer",
  "Antatt anbuds omsetning i prosent av total omsetning (frivillig)",
];

const FinancialReport = () => {
  const [currentUsername, setCurrentUsername] = useState("Bruker");

  useEffect(() => {
    const storedUsername = localStorage.getItem('currentUser');
    if (storedUsername) {
      setCurrentUsername(storedUsername);
    }
  }, []);

  const [data, setData] = useState(
    rows.map((_, idx) => {
    // already defined 
      if (idx === 4) return { A: "800", B: "800", C: "0" };
      if (idx === 5) return { A: "80", B: "80", C: "0" };
      if (idx === 7) return { A: "-660", B: "-660", C: "0" };
      if (idx === 9) return { A: "5000", B: "", C: "" };
      if (idx === 10) return { A: "-208", B: "", C: "" };
      if (idx === 11) return { A: "-4568", B: "", C: "" };
      return { A: "0", B: "0", C: "0" };
    })
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate] = useState(new Date());
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // mobile responsive checking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleChange = (i, field, value) => {
    const newData = [...data];
    newData[i][field] = value;
    setData(newData);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('nb-NO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`${isMobile ? 'fixed left-0 top-0 h-full z-20' : ''} w-16 bg-blue-900 text-white flex flex-col items-center py-4 space-y-6`}
        variants={sidebarVariants}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (sidebarOpen ? "open" : "closed") : "open"}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
        >
          <FaChartBar className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
        >
          <FaUsers className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer bg-blue-700"
        >
          <FaFileAlt className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer"
        >
          <FaCog className="text-xl" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-blue-800 cursor-pointer mt-auto"
          onClick={toggleSidebar}
        >
          {sidebarOpen && isMobile ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </motion.div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center">
              {isMobile && (
                <button onClick={toggleSidebar} className="mr-3">
                  <FaBars className="text-gray-600" />
                </button>
              )}
              <h1 className="text-lg font-bold text-blue-900">Finansiell Rapport 2024–25</h1>
            </div>
            
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <img
                src={`https://ui-avatars.com/api/?name=${currentUsername}&background=0062cc&color=fff`}
                alt="Profile"
                className="w-8 h-8 rounded-full shadow-sm"
              />
              <span className="text-gray-700 font-medium">{currentUsername} </span>
              <motion.button 
                className="text-red-500 font-semibold hover:text-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
               <IoMdExit />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gray-50 px-4 py-2 flex flex-wrap gap-2 justify-between items-center border-b">
          {/* Tabs */}
          <div className="flex flex-wrap">
            {["Resultat", "Balanse", "Sysselsetting", "Omsetning"].map((tab, idx) => (
              <motion.button
                key={idx}
                className={`px-3 py-2 ${
                  tab === "Resultat"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                custom={idx}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {tab}
              </motion.button>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <motion.button
              className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload size={14} /> 
              <span className="hidden sm:inline">Eksport</span>
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPrint size={14} /> 
              <span className="hidden sm:inline">Skriv ut</span>
            </motion.button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Table Container */}
          <motion.div 
            className="bg-white shadow rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Table for all screen sizes with horizontal scroll */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden min-w-max">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 border-b border-gray-300">
                    <th className="p-3 font-semibold text-center border-r border-gray-300 w-12">#</th>
                    <th className="p-3 font-semibold border-r border-gray-300 w-64">Regnskapsposter</th>
                    <th className="p-3 font-semibold text-center border-r border-gray-300 w-32">
                      A<br />Sum i 1000 kr.
                    </th>
                    <th className="p-3 font-semibold text-center border-r border-gray-300 w-32">
                      B<br />Installasjons-avdeling
                    </th>
                    <th className="p-3 font-semibold text-center w-32">
                      C<br />Installasjons-avdeling
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((label, idx) => {
                    // Row 0 (index 0) with green cell
                    if (idx === 0) {
                      return (
                        <motion.tr 
                          key={idx} 
                          className="border-b border-gray-300 hover:bg-gray-50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <td className="p-2 text-center text-gray-500 border-r border-gray-200">{idx + 1}.</td>
                          <td className="p-2 border-r border-gray-200">{label}</td>
                          <td className="p-2 text-center border-r border-gray-200 bg-gray-100">
                            <input
                              type="text"
                              className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                              value={data[idx]["A"]}
                              onChange={(e) => handleChange(idx, "A", e.target.value)}
                            />
                          </td>
                          <td className="p-2 text-center border-r border-gray-200 bg-green-200">
                            <input
                              type="text"
                              className="w-full text-center p-1 border border-gray-300 rounded bg-green-200 font-semibold focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none transition-all"
                              value={data[idx]["B"]}
                              onChange={(e) => handleChange(idx, "B", e.target.value)}
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="text"
                              className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                              value={data[idx]["C"]}
                              onChange={(e) => handleChange(idx, "C", e.target.value)}
                            />
                          </td>
                        </motion.tr>
                      );
                    }
                    
                    // Row 10 (index 9) - Financial income/expenses with merged cell for note
                    if (idx === 9) {
                      return (
                        <motion.tr 
                          key={idx} 
                          className="border-b border-gray-300 hover:bg-gray-50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <td className="p-2 text-center text-gray-500 border-r border-gray-200">{idx + 1}.</td>
                          <td className="p-2 border-r border-gray-200">
                            <div className="flex items-center">
                              {label}
                              <div className="relative ml-2">
                                <FaInfoCircle 
                                  className="text-blue-500 cursor-pointer" 
                                  onMouseEnter={() => setTooltipVisible(true)}
                                  onMouseLeave={() => setTooltipVisible(false)}
                                />
                                {tooltipVisible && (
                                  <div className="absolute z-10 w-48 p-2 bg-blue-800 text-white text-xs rounded shadow-lg -top-2 left-6">
                                    Inkluderer alle finansielle inntekter og kostnader for regnskapsperioden.
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-center border-r border-gray-200 bg-gray-100">
                            <input
                              type="text"
                              className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                              value={data[idx]["A"]}
                              onChange={(e) => handleChange(idx, "A", e.target.value)}
                            />
                          </td>
                          <td colSpan={2} className="p-2 text-red-600 text-sm">
                            <div className="flex flex-col sm:flex-row">
                              <div>
                                Beregnet lonnskostnad pr time = Rubrikk<br />
                                6+7+8 / Rubrikk 16 = kr 439.
                              </div>
                              <div className="sm:ml-2 mt-1 sm:mt-0">
                                Snittlonn forrige ar: 377.-
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    }
                    
                    // Rows 11 and 12 (indices 10 and 11) with merged cells
                    if (idx === 10 || idx === 11) {
                      return (
                        <motion.tr 
                          key={idx} 
                          className="border-b border-gray-300 hover:bg-gray-50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <td className="p-2 text-center text-gray-500 border-r border-gray-200">{idx + 1}.</td>
                          <td className="p-2 border-r border-gray-200">{label}</td>
                          <td className="p-2 text-center border-r border-gray-200 bg-gray-100">
                            <input
                              type="text"
                              className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                              value={data[idx]["A"]}
                              onChange={(e) => handleChange(idx, "A", e.target.value)}
                            />
                          </td>
                          <td colSpan={2} className="p-2"></td>
                        </motion.tr>
                      );
                    }
                    
                    // All other rows
                    return (
                      <motion.tr 
                        key={idx} 
                        className="border-b border-gray-300 hover:bg-gray-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <td className="p-2 text-center text-gray-500 border-r border-gray-200">{idx + 1}.</td>
                        <td className="p-2 border-r border-gray-200">{label}</td>
                        <td className="p-2 text-center border-r border-gray-200 bg-gray-100">
                          <input
                            type="text"
                            className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                            value={data[idx]["A"]}
                            onChange={(e) => handleChange(idx, "A", e.target.value)}
                          />
                        </td>
                        <td className="p-2 text-center border-r border-gray-200">
                          <input
                            type="text"
                            className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                            value={data[idx]["B"]}
                            onChange={(e) => handleChange(idx, "B", e.target.value)}
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="text"
                            className="w-full text-center p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                            value={data[idx]["C"]}
                            onChange={(e) => handleChange(idx, "C", e.target.value)}
                          />
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom notes */}
            <motion.div 
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm text-gray-800">
                <strong>Post 1B:</strong> Uttfakturert installasjonsomsetning (ekskl. mva) iflg. regnskapet.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;