import classnames from 'classnames';
import hexToRGBA from '../../utils/hex-to-rgba';
import getIcon from '../../utils/get-icon';

// Import CSS
import './editor.scss';

const { Component } = wp.element;

const { __ } = wp.i18n;

const {
	Tooltip,
	BaseControl,
	ColorPicker,
	RangeControl,
	Popover,
} = wp.components;

const {
	ColorPalette,
} = wp.blockEditor;

export default class GenerateBlocksColorPicker extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showPicker: false,
			showPalette: 'palette' === generateBlocksInfo.colorComponentDiplay,
			colorKey: false,
		};
	}

	render() {
		const {
			value,
			onChange,
			onOpacityChange,
			label,
			alpha = false,
			valueOpacity,
		} = this.props;

		const {
			colorKey,
		} = this.state;

		const toggleVisible = () => {
			this.setState( { isVisible: true } );
		};

		const toggleClose = () => {
			if ( this.state.isVisible === true ) {
				this.setState( { isVisible: false } );
			}
		};

		return (
			<BaseControl
				className="gblocks-component-color-picker-wrapper"
			>
				<div className="gblocks-color-component-label">
					<span>{ label }</span>
				</div>

				<div className="gblocks-color-picker-area">
					{ ! this.state.isVisible &&
						<div className={ classnames( 'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color' ) }>
							<Tooltip text={ __( 'Choose Color', 'generateblocks' ) }>
								<button
									type="button"
									aria-expanded={ this.state.isVisible }
									className="components-color-palette__item components-circular-option-picker__option"
									onClick={ toggleVisible }
									aria-label={ __( 'Custom color picker', 'generateblocks' ) }
									style={ { color: value ? hexToRGBA( value, valueOpacity ) : 'transparent' } }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					}

					{ this.state.isVisible &&
						<div className={ classnames( 'components-color-palette__item-wrapper components-circular-option-picker__option-wrapper', value ? '' : 'components-color-palette__custom-color' ) }>
							<Tooltip text={ __( 'Choose Color', 'generateblocks' ) }>
								<button
									type="button"
									aria-expanded={ this.state.isVisible }
									className="components-color-palette__item components-circular-option-picker__option"
									onClick={ toggleClose }
									aria-label={ __( 'Custom color picker', 'generateblocks' ) }
									style={ { color: value ? hexToRGBA( value, valueOpacity ) : 'transparent' } }
								>
									<span className="components-color-palette__custom-color-gradient" />
								</button>
							</Tooltip>
						</div>
					}

					{ this.state.isVisible &&
						<Popover position="top left" className="gblocks-component-color-picker" onClose={ toggleClose }>
							<BaseControl key={ colorKey }>
								<ColorPicker
									key={ colorKey }
									color={ value ? value : '' }
									onChangeComplete={ ( color ) => {
										onChange( color.hex );
									} }
									disableAlpha
								/>
							</BaseControl>

							{ alpha &&
								<div className="gblocks-component-color-opacity">
									<Tooltip text={ __( 'Opacity', 'generateblocks' ) }>
										{ getIcon( 'gradient' ) }
									</Tooltip>

									<RangeControl
										value={ valueOpacity ? valueOpacity : 0 }
										onChange={ ( opacityValue ) => onOpacityChange( opacityValue ) }
										min={ 0 }
										max={ 1 }
										step={ 0.01 }
										initialPosition={ 1 }
									/>
								</div>
							}

							<BaseControl
								label={ false }
								className="gblocks-component-color-picker-palette"
							>
								<ColorPalette
									value={ value }
									onChange={ ( color ) => {
										onChange( color );

										this.setState( {
											colorKey: color,
										} );
									} }
									disableCustomColors={ true }
								/>
							</BaseControl>
						</Popover>
					}
				</div>
			</BaseControl>
		);
	}
}
