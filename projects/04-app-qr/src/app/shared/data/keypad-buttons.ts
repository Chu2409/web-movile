import { KeypadButton } from '../interfaces/keypad.interface'

export const keypadButtons: KeypadButton[] = [
  {
    icon: 'cloud_download',
    tooltip: 'EXPORTAR',
    color: 'accent',
    action: 'DOWNLOAD',
  },
  { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
]
