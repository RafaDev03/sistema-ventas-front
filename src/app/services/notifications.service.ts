import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  showSuccess(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  showError(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  showConfirmacionEliminar(entidad: string, name: string): Promise<boolean> {
    return Swal.fire({
      title: 'Eliminar?',
      text: `Estas seguro de eliminar ${entidad}: ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar ahora!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado',
          text: `${entidad} eliminado`,
          icon: 'success',
        });
        return true;
      } else {
        return false;
      }
    });
  }
}
