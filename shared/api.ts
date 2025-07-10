/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Contact form data structure
 */
export interface ContactFormData {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
}

/**
 * Contact form submission response
 */
export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
}
