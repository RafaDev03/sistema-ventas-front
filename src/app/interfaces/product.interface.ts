import { CategoryInterface } from './category.interface';
import { MarcaInterface } from './marca.interface';
import { ProviderInterface } from './provider.interface';
import { UserInterface } from './user.interface';

export interface ProductInterface {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen: string;
  categoria: CategoryInterface;
  proveedores: ProviderInterface[];
  marca: MarcaInterface | null;
  usuarioAlta: UserInterface | null;
  usuarioModi: UserInterface | null;
  fechaCreacion: string;
  fechaModi: string;
}
