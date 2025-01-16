import { Host, Component, Prop, h } from '@stencil/core';

@Component({
	tag: 'app-image',
	styleUrl: 'app-image.css',
	shadow: true,
})
export class AppImage {
	@Prop() src: string = '';
	@Prop() alt?: string = '';
	@Prop() width?: number;
	@Prop() height?: number;
	@Prop() imgStyle?: { [key: string]: any } = {}

	render() {
		return (
			<Host
				style={{
					width: this.width ? `${this.width}px` : '100%',
					height: this.height ? `${this.height}px` : '100%',
				}}
			>
				<img
					class="app-image"
					src={this.src}
					alt={this.alt}
					style={this.imgStyle}
				/>
			</Host>
		);
	}
}
