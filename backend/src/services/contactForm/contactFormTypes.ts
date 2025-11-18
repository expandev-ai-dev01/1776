/**
 * @interface ContactFormCreateRequest
 * @description Request structure for creating a contact form submission
 *
 * @property {number} idVehicle - Vehicle identifier
 * @property {string} nomeCompleto - Full name of the contact
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Contact preference (Telefone, E-mail, WhatsApp)
 * @property {string} melhorHorario - Best time to contact
 * @property {string} assunto - Subject of inquiry
 * @property {string} mensagem - Message content
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} receberNovidades - Opt-in for newsletter
 * @property {string} ipUsuario - User IP address
 */
export interface ContactFormCreateRequest {
  idVehicle: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: string;
  melhorHorario: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  receberNovidades: boolean;
  ipUsuario: string;
}

/**
 * @interface ContactFormCreateResponse
 * @description Response structure for created contact form
 *
 * @property {number} idContactForm - Contact form identifier
 * @property {string} protocolo - Protocol number
 * @property {string} status - Contact status
 * @property {string} dateCreated - Creation timestamp
 * @property {string} modelo - Vehicle model
 * @property {string} marca - Vehicle brand
 * @property {number} anoModelo - Vehicle year
 */
export interface ContactFormCreateResponse {
  idContactForm: number;
  protocolo: string;
  status: string;
  dateCreated: string;
  modelo: string;
  marca: string;
  anoModelo: number;
  nomeCompleto?: string;
  email?: string;
  telefone?: string;
  preferenciaContato?: string;
  melhorHorario?: string;
  assunto?: string;
  mensagem?: string;
  financiamento?: boolean;
  receberNovidades?: boolean;
  ipUsuario?: string;
}
