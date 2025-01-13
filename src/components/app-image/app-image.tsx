import { Host, Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'app-image',
    styleUrl: 'app-image.css',
    shadow: true,
})
export class AppText {
    @Prop() src: string = '';
    @Prop() alt?: string = '';
    @Prop() objectFit?: 'cover' | 'contain' = 'cover';

    render() {
        return (
            <Host>
                <img class="img-el" src={this.src} alt={this.alt} style={{ objectFit: this.objectFit }} />
            </Host>
        );
    }
}
