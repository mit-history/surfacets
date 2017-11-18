class FacetUtils {
    static sortDomains(domains) {
      const sortedDomains = new Array(domains.length).fill(null);
      domains.forEach(domain => {
        if(domain.index && !isNaN(domain.index)) {
          sortedDomains[domain.index - 1] = domain;
        }
      });
      const nonActiveDomains = domains.filter(domain => !domain.active);
      let index = 0;
      sortedDomains.forEach((domain, domainIndex) => {
        if(!sortedDomains[domainIndex]) {
          sortedDomains[domainIndex] = nonActiveDomains[index];
          index++;
        }
      });      
      
      return sortedDomains;
    }
  }
  
  export default FacetUtils;