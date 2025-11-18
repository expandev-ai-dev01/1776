import { ContactForm } from '@/domain/contactForm';
import type { VehicleDetailContactProps } from './types';

export const VehicleDetailContact = ({ vehicleId, vehicleName }: VehicleDetailContactProps) => {
  return <ContactForm vehicleId={vehicleId} vehicleName={vehicleName} />;
};
