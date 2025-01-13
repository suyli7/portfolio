import { Host, Component, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-horizontal-scroll',
  styleUrl: 'app-horizontal-scroll.css',
  shadow: true,
})
export class AppText {
  @State() shouldScroll?: boolean = false;
  /* hack alert: hardcoding a value to reflect parent container width so
                 that overflow:hidden would work
  */
  @Prop() wrapperWidth?: string = '11vw';

  wrapperEl!: HTMLElement;
  contentEl!: HTMLElement;

  componentDidLoad() {
    if (this.contentEl.offsetWidth > this.wrapperEl.offsetWidth) {
      this.shouldScroll = true;
    }
  }

  render() {
    return (
      <Host
        ref={el => (this.wrapperEl = el)}
        style={{
          width: this.wrapperWidth
        }}
      >
        <div
          class={{
            'app-horizontal-scroll--content': true,
            'app-horizontal-scroll--animate': this.shouldScroll,
          }}
          ref={el => (this.contentEl = el)}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
