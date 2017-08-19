export const ACTIVATE_DOMAIN = 'ACTIVATE_DOMAIN';

export function activateDomain(domain, index) {
  return {
    type: ACTIVATE_DOMAIN, 
    id: domain, 
    index: index
  }
};
