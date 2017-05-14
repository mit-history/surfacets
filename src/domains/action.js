const ACTIVATE_DOMAIN = 'ACTIVATE_DOMAIN';

function activateDomain(domain, index) {
  return {type: ACTIVATE_DOMAIN, id: domain, index: index}
};

export {ACTIVATE_DOMAIN, activateDomain};