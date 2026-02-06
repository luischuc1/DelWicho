import React, { useState, useMemo } from 'react';

// Added optional key property to SearchTableProps to resolve TS errors when passing 'key' attribute to the generic component
interface SearchTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string; className?: string }[];
  searchFields: (keyof T)[];
  placeholder: string;
  title: string;
  key?: React.Key;
}

const SearchTable = <T extends Record<string, any>>({ 
  data, 
  columns, 
  searchFields, 
  placeholder,
  title 
}: SearchTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item => 
      searchFields.some(field => 
        String(item[field]).toLowerCase().includes(lowerTerm)
      )
    );
  }, [data, searchTerm, searchFields]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 text-sm text-slate-500">
          Mostrando {filteredData.length} resultados de {data.length}
        </div>
      </div>

      <div className="flex-grow overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="overflow-auto h-full max-h-[calc(100vh-320px)]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-100 z-10 border-b border-slate-200">
              <tr>
                {columns.map(col => (
                  <th key={String(col.key)} className={`px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider ${col.className}`}>
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider w-16 text-center">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                    {columns.map(col => (
                      <td key={String(col.key)} className={`px-6 py-4 text-sm text-slate-700 ${col.className}`}>
                        {item[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => copyToClipboard(String(item[columns[0].key]))}
                        className={`p-1.5 rounded-md transition-all ${
                          copiedId === String(item[columns[0].key]) 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-slate-100 text-slate-400 hover:bg-blue-100 hover:text-blue-600'
                        }`}
                        title="Copiar Clave"
                      >
                        {copiedId === String(item[columns[0].key]) ? (
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-20 text-center text-slate-400">
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>No se encontraron resultados para "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchTable;