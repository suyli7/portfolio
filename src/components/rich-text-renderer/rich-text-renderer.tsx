import { Component, Prop, Host, h } from '@stencil/core';
import { asHTML } from '@prismicio/client';
import type { RichTextField } from '@prismicio/client';

@Component({
  tag: 'rich-text-renderer',
  shadow: false,
})
export class AppHome {

  @Prop() field: RichTextField = [];

  private injectStyles(html: string): string {
    return html?.replace(/<p>/g, '<p style="margin: var(--space-s) 0; line-height: 1.3">');
  }

  render() {
    const styledHTML = this.injectStyles(asHTML(this.field));

    return (
      <Host class="rich-text-renderer" innerHTML={styledHTML} />
    );
  }
}
