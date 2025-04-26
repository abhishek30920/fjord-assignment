import React, { useState, useMemo } from 'react';
import { FieldData } from '../../types/financial.types';

interface FinancialTableProps {
  rows: string[];
  initialData: FieldData[];
  onDataChange: (newData: FieldData[]) => void;
}

/**
 * Financial table component that displays financial data in a structured table format
 * with multiple columns and specialized row formatting.
 */
const FinancialTable: React.FC<FinancialTableProps> = ({ 
  rows, 
  initialData, 
  onDataChange 
}) => {
  const [data, setData] = useState<FieldData[]>(initialData);

  // Row numbers as shown in the design
  const rowNumbers = useMemo(() => [
    "1.", "=4", "-5", "-6", "-7", "-8", "=9", "-10", "=12", "+-13", "15", "16", "17"
  ], []);

  const handleChange = (rowIndex: number, field: keyof FieldData, value: string): void => {
    const newData = [...data];
    newData[rowIndex][field] = value;
    setData(newData);
    onDataChange(newData);
  };

  /**
   * Renders an input cell with appropriate styling
   */
  const renderInputCell = (
    rowIndex: number, 
    column: keyof FieldData, 
    backgroundColor: string = 'bg-transparent'
  ) => (
    <td className={`p-2 text-right border border-gray-200 ${backgroundColor}`}>
      <input
        type="text"
        className="w-full text-right p-1 bg-transparent outline-none"
        value={data[rowIndex][column]}
        onChange={(e) => handleChange(rowIndex, column, e.target.value)}
      />
    </td>
  );

  /**
   * Renders standard table header
   */
  const renderTableHeader = () => (
    <thead>
      {/* First header row */}
      <tr className="bg-gray-50 text-gray-700">
        <th className="p-3 font-medium text-center border border-gray-200 w-12" rowSpan={2}></th>
        <th className="p-3 font-medium text-center border border-gray-200 w-64"></th>
        <th className="p-3 font-medium text-center border border-gray-200 w-32">A</th>
        <th className="p-3 font-medium text-center border border-gray-200 w-32">B</th>
        <th className="p-3 font-medium text-center border border-gray-200 w-32">C</th>
      </tr>

      {/* Second header row */}
      <tr className="bg-gray-50 text-gray-700">
        <th className="p-3 font-medium text-center border border-gray-200 w-64">Regnskapsposter</th>
        <th className="p-3 font-medium text-center border border-gray-200">Sum i 1000 kr.</th>
        <th className="p-3 font-medium text-center border border-gray-200">Installasjons-avdeling</th>
        <th className="p-3 font-medium text-center border border-gray-200">Installasjons-avdeling</th>
      </tr>
    </thead>
  );

  /**
   * Renders a table row based on its index and content
   */
  const renderTableRow = (label: string, idx: number) => {
    // Row with green background for B column
    if (idx === 0) {
      return (
        <tr key={idx} className="border border-gray-200 bg-white">
          <td className="p-2 text-center text-gray-500 border border-gray-200">{rowNumbers[idx]}</td>
          <td className="p-2 border border-gray-200">{label}</td>
          {renderInputCell(idx, "A", "bg-gray-100")}
          <td className="p-2 text-right border border-green-300 bg-green-100">
            <input
              type="text"
              className="w-full text-right p-1 bg-transparent outline-none"
              value={data[idx]["B"]}
              onChange={(e) => handleChange(idx, "B", e.target.value)}
            />
          </td>
          {renderInputCell(idx, "C", "bg-white")}
        </tr>
      );
    }

    // Rows with gray background for all cells
    if (idx === 1 || idx === 6) {
      return (
        <tr key={idx} className="border border-gray-200">
          <td className="p-2 text-center text-gray-500 border border-gray-200">{rowNumbers[idx]}</td>
          <td className="p-2 border border-gray-200">{label}</td>
          {renderInputCell(idx, "A", "bg-gray-100")}
          {renderInputCell(idx, "B", "bg-gray-100")}
          {renderInputCell(idx, "C", "bg-gray-100")}
        </tr>
      );
    }

    // Row with calculation note
    if (idx === 7) {
      return (
        <tr key={idx} className="border border-gray-200">
          <td className="p-2 text-center text-gray-500 border border-gray-200">{rowNumbers[idx]}</td>
          <td className="p-2 border border-gray-200">{label}</td>
          {renderInputCell(idx, "A", "bg-white")}
          <td rowSpan={6} colSpan={2} className="p-2 text-left text-sm border border-gray-200 align-top text-red-600">
            <div>
              Beregnet lønnskostnad pr time = Rubrikk<br />
              6+7+8 / Rubrikk 16 = kr 439,-
            </div>
            <div className="mt-2">
              Snittlønn forrige år: 377,-
            </div>
          </td>
        </tr>
      );
    }

    // Rows with merged C column
    if (idx > 2 && idx < 6) {
      return (
        <tr key={idx} className="border border-gray-200">
          <td className="p-2 text-center text-gray-500 border border-gray-200">{rowNumbers[idx]}</td>
          <td className="p-2 border border-gray-200">{label}</td>
          {renderInputCell(idx, "A", "bg-gray-100")}
          {renderInputCell(idx, "B")}
          {idx === 3 && <td className="p-2 text-center border border-gray-200 align-middle" rowSpan={3}></td>}
        </tr>
      );
    }

    // Rows after the calculation note
    if (idx > 7 && idx <= 12) {
      const bgColor = [7, 9, 11, 12].includes(idx) ? 'bg-white' : 'bg-gray-100';
      return (
        <tr key={idx} className="border border-gray-200">
          <td className="p-2 text-center text-gray-500 border border-gray-200">{rowNumbers[idx]}</td>
          <td className="p-2 border border-gray-200">{label}</td>
          {renderInputCell(idx, "A", bgColor)}
          {/* No B and C cells due to rowspan from calculation note */}
        </tr>
      );
    }

    // Default row rendering
    return (
      <tr key={idx} className="border border-gray-200">
        <td className="p-2 text-center text-gray-500 border border-gray-200">{rowNumbers[idx]}</td>
        <td className="p-2 border border-gray-200">{label}</td>
        {renderInputCell(idx, "A", "bg-gray-100")}
        {renderInputCell(idx, "B")}
        {renderInputCell(idx, "C")}
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-white rounded-b-3xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          {renderTableHeader()}
          <tbody>
            {rows.map((label, idx) => renderTableRow(label, idx))}
          </tbody>
        </table>
      </div>

      {/* Bottom note */}
      <div className="p-2">
        <div className="bg-yellow-100 border-yellow-600 border p-3 text-sm text-gray-700 rounded-md w-full">
          <div className="font-bold mb-1 text-yellow-600 font-mono">Post 1B:</div>
          <div>Utfakturert installasjonsomsetning (ekskl. mva) iflg. regnskapet.</div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTable;