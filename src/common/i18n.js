
let language = sessionStorage.getItem('lang');

if(!language) {
  language = 'fr';
}

class I18N {

  static lang() {
    return language;
  }

  static changeLanguage(lang) { 
    language = lang;
    sessionStorage.setItem('lang', language);
  }
  
  static get(resource, pack) {
    if(!pack[resource]) {
      console.error(`Cannot find I18N resource: ${resource}`);
    }
    return pack[resource][I18N.lang()];
  }

  static format(resource, pack, ...params) {
    let value = pack[resource][I18N.lang()];
    return value.replace(/\{([^{}]*)\}/g, (match, index) => params[index]);
  }
}

export default I18N;