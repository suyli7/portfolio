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
  @Prop() titleText?: string = '';

  render() {
    return (
      <fieldset class="content-box">
        {
          this.titleText && (
            <legend>
              <app-text color={TextColor.Main} variant={TextVariant.Title} size={TextSize.Small}>
                {this.titleText}
              </app-text>
            </legend>
          )
        }
        <slot />
      </fieldset>
    );
  }
}
