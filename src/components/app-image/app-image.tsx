import { Host, Component, Prop, h, State } from '@stencil/core';

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

	@State() loaded?: boolean = false;

	private handleImageLoad = () => {
		this.loaded = true;
	};


	render() {
		return (
			<Host
				style={{
					width: this.width ? `${this.width}px` : '100%',
					height: this.height ? `${this.height}px` : '100%',
				}}
			>
				{!this.loaded && (
					<img
						class="app-image--placeholder"
						src='/assets/icons/icon_loading.png'
						alt="Loading placeholder"
					/>
				)}
				<img
					class="app-image"
					src={this.src}
					alt={this.alt}
					onLoad={this.handleImageLoad}
					style={this.imgStyle}
				/>
			</Host>
		);
	}
}
