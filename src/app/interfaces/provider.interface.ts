export interface ProviderInterface {
  id: number;
  nombre: string;
  correo: string;
  ruc: string;
  direccion: string;
  telefono: string | null;
  imagen: string;
  estado: boolean;
}
