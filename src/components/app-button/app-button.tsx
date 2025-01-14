import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.css',
  shadow: true,
})
export class AppButton {

  @Prop() buttonStyle?: { [key: string]: any } = {}

  render() {
    return (
      <button class="app-button" style={this.buttonStyle}>
        <slot />
      </button>
    );
  }
}
