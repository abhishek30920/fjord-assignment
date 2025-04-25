import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { FieldData } from '../../types/financial.types';

interface FinancialTableProps {
  rows: string[];
  initialData: FieldData[];
  onDataChange: (newData: FieldData[]) => void;
}

const FinancialTable: React.FC<FinancialTableProps> = ({ rows, initialData, onDataChange }) => {
  const [data, setData] = useState<FieldData[]>(initialData);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const handleChange = (i: number, field: keyof FieldData, value: string): void => {
    const newData = [...data];
    newData[i][field] = value;
    setData(newData);
    onDataChange(newData);
  };

  return (
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
              // Row 0 (index 0) with green cell as given in screenshot 
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
              
              // Row 10 (index 9) - Financial income/expenses with merged cell 
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
  );
};

export default FinancialTable;