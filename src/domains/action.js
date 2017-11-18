export const ACTIVATE_DOMAIN = 'ACTIVATE_DOMAIN';
export const ACTIVATE_DOMAINS = 'ACTIVATE_DOMAINS';
export const RESET_DOMAINS = 'RESET_DOMAINS';

export function activateDomain(domain, index, fromIndex) {
  return {
    type: ACTIVATE_DOMAIN, 
    id: domain, 
    index: index,
    fromIndex: fromIndex
  };
}

export function activateDomains() {
  return {
    type: ACTIVATE_DOMAINS
  };
}

export function resetDomains() {
  return {
    type: RESET_DOMAINS
  };
}
