import { Component, Prop, h } from '@stencil/core';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';

@Component({
  tag: 'content-box',
  styleUrl: 'content-box.css',
  shadow: true,
})
export class ContentBox {
  @Prop() title?: string = '';

  render() {
    return (
      <div class="content-box">
        <div class="content-box--title">
          {
            this.title && (
            <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.Medium}>
                {this.title}
            </app-text>
            )
          }
        </div>
        <slot />
      </div>
    );
  }
}
