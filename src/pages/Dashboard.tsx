import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/dashboard/layout/Header";
import FinancialTable from "../components/dashboard/FinancialTable";
import { useIsMobile } from "../hooks/useIsMobile";
import { FieldData } from "../types/financial.types";

const rows = [
  "Omsetning eksklusiv MVA",
  "Korrigert omsetningsplikt (1,2 og 3)",
  "varekjøp",
  "Lønn + sosiale kostnader montører, lærlinger",
  "Lønn + sosiale kostnader installatør som montør",
  "Innleid arbeid (se også post 16 og 43)",
  "Bruttofortjeneste",
  "Øvrige driftskostnader",
  "Brutto driftsresultat",
  "Finansinntekter / finanskostnader",
  "Netto driftsresultat før ekstraordinære poster og årsoppgjørsdisp.",
  "Sum utfakturerte (produktive) timer",
  "Antatt anbuds omsetning i prosent av total omsetning (frivillig)",
];

const Dashboard: React.FC = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Resultat");
  
  // Initialize data with values from the screenshot
  const [data, setData] = useState<FieldData[]>(
    [
      { A: "0", B: "28526", C: "0" }, // Omsetning eksklusiv MVA
      { A: "0", B: "0", C: "0" }, // Korrigert omsetningsplikt
      { A: "0", B: "0", C: "0" }, // varekjøp
      { A: "0", B: "0", C: "0" }, // Lønn + sosiale kostnader montører, lærlinger
      { A: "800", B: "800", C: "0" }, // Lønn + sosiale kostnader installatør som montør
      { A: "60", B: "60", C: "0" }, // Innleid arbeid
      { A: "-860", B: "-860", C: "0" }, // Bruttofortjeneste
      { A: "5000", B: "", C: "" }, // Øvrige driftskostnader
      { A: "-5860", B: "", C: "" }, // Brutto driftsresultat
      { A: "-208", B: "", C: "" }, // Finansinntekter / finanskostnader
      { A: "-6068", B: "", C: "" }, // Netto driftsresultat før ekstraordinære poster
      { A: "139", B: "", C: "" }, // Sum utfakturerte timer
      { A: "0", B: "", C: "" }, // Antatt anbuds omsetning
    ]
  );

  // Load username from localStorage if not available in context
  useEffect(() => {
    const storedUsername = localStorage.getItem('currentUser');
    if (storedUsername && !username) {
      setUsername(storedUsername);
    }
  }, [username, setUsername]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Clear user data and redirect to login
    setUsername('');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleDataChange = (newData: FieldData[]) => {
    setData(newData);
    // Here you could also save to API or localStorage
  };

  return (
    <div className="flex h-screen font-sans bg-sky-800  overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isMobile={isMobile} 
        currentPage="documents" 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white mx-4 my-4 rounded-lg shadow-lg">
        {/* Header Component */}
        <Header 
          title="Finansiell Rapport 2024–25" 
          username="Bauta Electro AS" 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile} 
          onLogout={handleLogout} 
        />

        {/* Tabs */}
        <div className="border-b border-gray-300">

          <div className="flex">
            {["Resultat", "Balanse", "Sysselsetting", "Omsetning"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 text-sm font-medium ${
                  tab === activeTab
                    ? "text-sky-600 border-b-2 border-sky-600"
                    : "text-gray-400 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Financial Table Component */}
          <FinancialTable 
            rows={rows} 
            initialData={data} 
            onDataChange={handleDataChange} 
          />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;