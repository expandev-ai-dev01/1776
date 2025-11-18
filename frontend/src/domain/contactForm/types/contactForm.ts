export type PreferenciaContato = 'Telefone' | 'E-mail' | 'WhatsApp';
export type MelhorHorario = 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';
export type Assunto =
  | 'Informações gerais'
  | 'Agendamento de test drive'
  | 'Negociação de preço'
  | 'Financiamento'
  | 'Outro';

export interface ContactFormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: PreferenciaContato;
  melhorHorario: MelhorHorario;
  assunto: Assunto;
  mensagem: string;
  financiamento: boolean;
  receberNovidades: boolean;
  termos_privacidade: boolean;
}

export interface ContactFormSubmitData extends ContactFormData {
  idVehicle: number;
}

export interface ContactFormResponse {
  idContactForm: number;
  protocolo: string;
  status: string;
  dateCreated: string;
  modelo: string;
  marca: string;
  anoModelo: number;
}
