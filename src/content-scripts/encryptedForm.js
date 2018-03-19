import FormContainer from "./encryptedFormContainer";

/**
 * PgpEncryptedForm custom HTMLElement
 */
class PgpEncryptedForm extends HTMLElement {
  static get observedAttributes() {
    return ['hash', 'signature', 'version', 'comment', 'encryptedContent'];
  }

  // Invoked when the custom element is first connected to the document's DOM.
  connectedCallback() {
    this.dispatchEvent(new Event('onConnected'));

    let errorMsg;
    if (typeof this.getAttribute('id') === 'undefined') {
      errorMsg = 'No form id defined. Please add a unique form identifier.';
      return this.onError(errorMsg);
    }

    const form = this.querySelector('form');
    if (form === null) {
      return this.onError('The form definition is invalid the form tag is missing.');
    }

    const html = form.outerHTML;
    if (typeof html === 'undefined') {
      errorMsg = 'No form data included in pgp-encrypted-form tag.';
      return this.onError(errorMsg);
    }

    const id = this.getAttribute('id');
    if (typeof id === 'undefined') {
      errorMsg = 'No form included in pgp-encrypted-tag. Please add form definition.';
      return this.onError(errorMsg);
    }

    const signature = this.getAttribute('signature');
    if (typeof signature === 'undefined') {
      errorMsg = 'No signature included in pgp-encrypted-tag. Please add a signature.';
      return this.onError(errorMsg);
    }

    // window.mailvelope.createEncryptedFormContainer(id, html, signature)
    // .then(data => this.onEncrypt(data), error => this.onError(error));

    const container = new FormContainer(id, html, signature);
    // containers.set(container.id, container);
    container.create(function(done) {
      console.log(done);
    });

  }

  onError(error) {
    this.dispatchEvent(new ErrorEvent('error', {
      error,
      message: error.message
    }));
  }

  // EVENT DEMO
  constructor() {
    super();
    this.onSomething();
    this.onSomethingElse();
  }

  // triggering events using custom event
  onSomething() {
    this.dispatchEvent(new CustomEvent('onSomething', {
      detail: {
        something: 'some data',
      },
      bubbles: true,
      cancelable: true
    }));
  }

  onSomethingElse() {
    this.somethingElse = 'encryptedContent';
    this.dispatchEvent(new Event('onSomethingElse'));
  }

  // // Invoked when the custom element is moved to a new document.
  // adoptedCallback() {
  //   // console.log('PgpEncryptedForm::adoptedCallback');
  // }
  //
  // // Invoked when one of the custom element's attributes is added, removed, or changed.
  // attributeChangedCallback(attrName, oldValue, newValue) {
  //   // console.log('PgpEncryptedForm::attributeChangedCallback');
  // }
  // // Invoked when the custom element is disconnected from the document's DOM.
  // disconnectedCallback() {
  //   // console.log('PgpEncryptedForm::disconnectedCallback');
  // }
}

export function init() {
  if (window.customElements === null) {
    console.error('Custom elements are not supported.')
  } else {
    window.customElements.define('pgp-encrypted-form', PgpEncryptedForm);
  }
}
