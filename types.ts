
export interface GastoItem {
  partida: string;
  nombre: string;
}

export interface UnidadItem {
  codigo: string;
  nombre: string;
  tipo: string;
}

export enum TabType {
  GASTO = 'GASTO',
  UNIDADES = 'UNIDADES'
}
