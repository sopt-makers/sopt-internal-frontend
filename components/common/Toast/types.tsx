export interface ToastEntry {
  option: ToastOption;
}

export interface ToastOption {
  title?: string;
  message: string;
}

export interface ToastController {
  show: (option: ToastOption) => void;
}
