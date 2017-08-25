class I18N {
  static lang() {
    return 'fr';
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