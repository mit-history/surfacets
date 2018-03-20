
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

  static formatPrefix(resource, pack, prefix) { // resource == entry
    // if () {
// TODO format may be done in action.js
    // }
  }

  //0100- 0199 l.
  // comédie-drame (1)

  /**
   *
   * Places de Premieres à 6 liv.
   * Places de Galerie à 4 liv.
   * Places de Secondes à 3 liv.
   * Places de Parquet à 2 liv. 8 sous.
   * Places de Troisiemes à 2 liv.
   * Places de Paradis à 1 liv 10 sous
   */
}

export default I18N;