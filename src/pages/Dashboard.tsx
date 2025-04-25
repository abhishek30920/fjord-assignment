import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/dashboard/layout/Header";
import ActionBar from "../components/dashboard/ActionBar";
import FinancialTable from "../components/dashboard/FinancialTable";
import { useIsMobile } from "../hooks/useIsMobile";
import { FieldData } from "../types/financial.types";

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

const Dashboard: React.FC = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Resultat");
  
  // Initialize data with default values
  const [data, setData] = useState<FieldData[]>(
    rows.map((_, idx) => {
      if (idx === 4) return { A: "800", B: "800", C: "0" };
      if (idx === 5) return { A: "80", B: "80", C: "0" };
      if (idx === 7) return { A: "-660", B: "-660", C: "0" };
      if (idx === 9) return { A: "5000", B: "", C: "" };
      if (idx === 10) return { A: "-208", B: "", C: "" };
      if (idx === 11) return { A: "-4568", B: "", C: "" };
      return { A: "0", B: "0", C: "0" };
    })
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
    <div className="flex h-screen font-sans bg-gray-50 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isMobile={isMobile} 
        currentPage="documents" 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Component */}
        <Header 
          title="Finansiell Rapport 2024–25" 
          username={username || 'Bruker'} 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile} 
          onLogout={handleLogout} 
        />

        {/* Action Bar Component */}
        <ActionBar 
          tabs={["Resultat", "Balanse", "Sysselsetting", "Omsetning"]} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

      
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