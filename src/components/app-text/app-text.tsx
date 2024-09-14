import { Host, Component, Prop, h } from '@stencil/core';
import {
  TextColor,
  TextSize,
  TextVariant
} from '../../common/namespaces';
import type {
  TextColorType,
  TextSizeType,
  TextVariantType
} from '../../common/types';

const getClassname = (color: TextColorType, variant: TextVariantType, size: TextSizeType): string => `app-text--${color} app-text--${variant} app-text--${size}`;

@Component({
  tag: 'app-text',
  styleUrl: 'app-text.css',
  shadow: true,
})
export class AppText {
  @Prop() variant?: TextVariantType = TextVariant.Body;
  @Prop() color?: TextColorType = TextColor.Sub;
  @Prop() size?: TextSizeType = TextSize.Small;

  render() {
    return (
      <Host class={getClassname(this.color, this.variant, this.size)}>
        {
          this.variant === TextVariant.Accent && <span><slot/></span>
        }
        {
          this.variant === TextVariant.Body && <p><slot/></p>
        }
      </Host>
    );
  }
}
