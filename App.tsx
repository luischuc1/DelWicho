
import React, { useState } from 'react';
import { CLASIFICADOR_GASTO, UNIDADES_ADMINISTRATIVAS } from './data';
import { TabType } from './types';
import SearchTable from './components/SearchTable';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.GASTO);

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Consultor de Formatos
          </h1>
          <p className="text-slate-500 mt-1">Municipio de Bacalar, Quintana Roo</p>
        </div>
        <div className="bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm flex inline-flex w-fit">
          <button
            onClick={() => setActiveTab(TabType.GASTO)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === TabType.GASTO
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Objeto del Gasto
          </button>
          <button
            onClick={() => setActiveTab(TabType.UNIDADES)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === TabType.UNIDADES
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Unidades Administrativas
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {activeTab === TabType.GASTO ? (
          <SearchTable
            key="gasto-table"
            title="Clasificador por Objeto del Gasto"
            data={CLASIFICADOR_GASTO}
            placeholder="Buscar por partida (ej. 21101) o por nombre (ej. papelería)..."
            searchFields={['partida', 'nombre']}
            columns={[
              { key: 'partida', label: 'Partida', className: 'w-32 font-mono font-bold' },
              { key: 'nombre', label: 'Nombre / Concepto' }
            ]}
          />
        ) : (
          <SearchTable
            key="unidades-table"
            title="Catálogo de Unidades Administrativas"
            data={UNIDADES_ADMINISTRATIVAS}
            placeholder="Buscar por código (ej. E0101) o nombre de la unidad..."
            searchFields={['codigo', 'nombre', 'tipo']}
            columns={[
              { key: 'codigo', label: 'Código UA', className: 'w-32 font-mono font-bold' },
              { key: 'nombre', label: 'Nombre de la Unidad' },
              { key: 'tipo', label: 'Tipo', className: 'w-40 italic text-slate-500' }
            ]}
          />
        )}
      </main>

      <footer className="mt-8 pt-6 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} - Herramienta de Consulta Local - Bacalar</p>
      </footer>
    </div>
  );
};

export default App;
