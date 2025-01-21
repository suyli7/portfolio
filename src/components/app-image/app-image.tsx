import { Host, Component, Prop, h, State } from '@stencil/core';

@Component({
	tag: 'app-image',
	styleUrl: 'app-image.css',
	shadow: true,
})
export class AppImage {
	@Prop() src: string = '';
	@Prop() alt?: string = '';
	@Prop() width?: number | string;
	@Prop() height?: number | string;
	@Prop() imgStyle?: { [key: string]: any } = {}

	@State() loaded?: boolean = false;

	private handleImageLoad = () => {
		this.loaded = true;
	};

	private calcSize = (value?: number | string): string => {
		if (!value) {
			return '100%';
		}

		if (typeof value === 'number') {
			return `${value}px`;
		}

		return value;
	}


	render() {
		return (
			<Host
				style={{
					width: this.calcSize(this.width),
					height: this.calcSize(this.height),
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
