export interface BurgerInterface {
  isOpen: boolean;
}

export interface LoginFormData {
  login: string;
  password: string;
}

export interface ErrorMessage {
  error: boolean;
  message: string;
}

export interface ErrorStates {
  inn: ErrorMessage;
  documentsCount: ErrorMessage;
  dates: ErrorMessage;
}
