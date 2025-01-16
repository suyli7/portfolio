import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.css',
  shadow: true,
})
export class AppButton {

  @Prop() buttonStyle?: { [key: string]: any } = {}
  @Prop() secondary?: boolean = false;

  render() {
    return (
      <button
        class={{
          "app-button": true,
          "app-button--secondary": this.secondary
        }}
        style={this.buttonStyle}>
        <slot />
      </button>
    );
  }
}
