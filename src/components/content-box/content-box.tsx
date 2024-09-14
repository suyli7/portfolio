import { Component, Prop, h } from '@stencil/core';
import { BorderColor } from '../../common/namespaces';
import { BorderColorType } from '../../common/types';

const getClassname = (color: BorderColorType): string => `content-box content-box--${color}`;

@Component({
  tag: 'content-box',
  styleUrl: 'content-box.css',
  shadow: true,
})
export class ContentBox {
  @Prop() color?: BorderColorType = BorderColor.Default;

  render() {
    return (
      <div class={getClassname(this.color)}>
        <slot />
      </div>
    );
  }
}
