class Eqio {
  constructor(el) {
    if (!el) {
      return;
    }

    this.init(el);
  }

  init(el) {
    this.el = el;

    this.createStyles();
    this.createTriggers();
    this.createObservers();
  }

  createStyles() {
    if (!document.getElementById('eqio-req-css')) {
      const style = document.createElement('style');
      const css = `
        .eqio {
          position: relative;
        }

        .eqio__trigger {
          height: 1px;
          left: 0;
          pointer-events: none;
          position: absolute;
          top: 0;
          visibility: hidden;
          z-index: -1;
        }`;

      style.id = 'eqio-req-css';
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      document.head.insertBefore(style, document.head.children[0]);
    }
  }

  createTriggers() {
    this.sizesArray = JSON.parse(this.el.attributes['data-eqio-sizes'].value);
    this.triggerEls = [];
    let triggerEl;
    const fragment = document.createDocumentFragment();

    this.sizesArray.forEach((trigger) => {
      triggerEl = document.createElement('div');
      triggerEl.className = 'eqio__trigger';
      triggerEl.setAttribute('data-eqio-size', trigger);
      triggerEl.style.width = `${trigger.slice(1)}px`;

      this.triggerEls.push(triggerEl);
      fragment.appendChild(triggerEl);
    });

    this.el.appendChild(fragment);
  }

  createObservers() {
    const prefix = this.el.attributes['data-eqio-prefix'] ? `${this.el.attributes['data-eqio-prefix'].value}-` : '';
    const className = `${prefix}eqio-`;
    const observerOptions = {
      root: this.el,
      rootMargin: '0px',
      threshold: 1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const size = entry.target.dataset.eqioSize;

          if (size.indexOf('>') === 0) {
            if (entry.intersectionRatio === 1) {
              this.el.classList.add(`${className}${size}`);
            }
            else {
              this.el.classList.remove(`${className}${size}`);
            }
          }
          else if (entry.intersectionRatio === 1) {
            this.el.classList.remove(`${className}${size}`);
          }
          else {
            this.el.classList.add(`${className}${size}`);
          }
        }
      });
    };

    this.observer = new IntersectionObserver(observerCallback, observerOptions);
    this.sizesArray.forEach((size, index) => {
      this.observer.observe(this.triggerEls[index]);
    });
  }

  stop() {
    this.el.removeAttribute('data-eqio-sizes');

    this.sizesArray.forEach((size, index) => {
      this.observer.unobserve(this.triggerEls[index]);
    });

    this.triggerEls.forEach((trigger) => {
      this.el.removeChild(trigger);
    });

    delete this.el;
    delete this.observer;
    delete this.sizesArray;
    delete this.triggerEls;
  }
}

module.exports = Eqio;
