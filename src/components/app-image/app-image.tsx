import { Host, Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'app-image',
    shadow: true,
})
export class AppText {
    @Prop() src: string = '';
    @Prop() alt?: string = '';
    @Prop() objectFit?: 'cover' | 'contain' = 'cover';
    @Prop() width?: number;
    @Prop() height?: number;

    render() {
        return (
            <Host>
                <img
                    src={this.src}
                    alt={this.alt}
                    style={{
                        width: this.width ? `${this.width}px` : '100%',
                        height: this.height ? `${this.height}px` : '100%',
                        objectFit: this.objectFit
                    }}
                />
            </Host>
        );
    }
}
