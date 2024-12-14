const {registerBlockType} = wp.blocks;
const {InspectorControls, MediaUpload, RichText, ColorPalette, BlockControls, AlignmentToolbar} = wp.blockEditor;
const {PanelBody, Button} = wp.components;
const {__} = wp.i18n;

// Constants for reusable styles
const BUTTON_STYLES = {
    padding: '10px 20px',
    borderRadius: '5px',
    display: 'inline-block',
    marginTop: '10px',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s',
};

registerBlockType('custom/modern-block', {
    title: __('Modern Block', 'custom-blocks'),
    icon: 'star-filled',
    category: 'design',
    attributes: {
        text: {type: 'string', source: 'html', selector: 'h2'},
        image: {type: 'string', default: null},
        buttonLabel: {type: 'string', default: __('Click Me', 'custom-blocks')},
        buttonLink: {type: 'string', default: '#'},
        bgColor: {type: 'string', default: '#ffffff'},
        textColor: {type: 'string', default: '#000000'},
        alignment: {type: 'string', default: 'center'},
    },
    edit: ({attributes, setAttributes}) => {
        const {text, image, buttonLabel, buttonLink, bgColor, textColor, alignment} = attributes;

        const renderColorPalette = (label, valueKey) => (
            <>
                <p>{label}</p>
                <ColorPalette
                    value={attributes[valueKey]}
                    onChange={(value) => {
                        if (value) {
                            setAttributes({[valueKey]: value});
                        }
                    }}
                />
            </>
        );

        const renderButton = (label, link) => (
            <a
                href={link}
                className="modern-block-button"
                style={{
                    ...BUTTON_STYLES,
                    backgroundColor: textColor,
                    color: bgColor,
                    filter: 'contrast(1.5)',
                }}
            >
                {label}
            </a>
        );

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Block Settings', 'custom-blocks')}>
                        {renderColorPalette(__('Background Color', 'custom-blocks'), 'bgColor')}
                        {renderColorPalette(__('Text Color', 'custom-blocks'), 'textColor')}
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={(align) => setAttributes({alignment: align})}
                    />
                </BlockControls>
                <div
                    className="modern-block block-has-content"
                    aria-live="polite"
                    style={{backgroundColor: bgColor, color: textColor, textAlign: alignment}}
                >
                    <MediaUpload
                        onSelect={(media) => media.url && setAttributes({image: media.url})}
                        allowedTypes={['image']}
                        render={({open}) => (
                            <div>
                                <Button onClick={open} className={image ? 'image-button' : 'button button-large'}>
                                    {image ? (
                                        __('Uploaded Image', 'custom-blocks')
                                    ) : (
                                        __('Upload Image', 'custom-blocks')
                                    )}
                                </Button>
                                {image && (
                                    <div className="cm-image">
                                        <img src={image}
                                             alt={image ? __('Uploaded Image', 'custom-blocks') : __('No Image', 'custom-blocks')}/>
                                    </div>
                                )}
                            </div>
                        )}
                    />
                    <RichText
                        tagName="h2"
                        aria-label={__('Editable Block Title', 'custom-blocks')}
                        placeholder={__('Add your text...', 'custom-blocks')}
                        value={text}
                        onChange={(value) => setAttributes({text: value})}
                    />
                    <div>
                        <label htmlFor="button-text">{__('Button Text:', 'custom-blocks')}</label>
                        <input
                            id="button-text"
                            type="text"
                            value={buttonLabel}
                            placeholder={__('Button Text...', 'custom-blocks')}
                            onChange={(e) => setAttributes({buttonLabel: e.target.value})}
                        />
                        <label htmlFor="button-link">{__('Button Link:', 'custom-blocks')}</label>
                        <input
                            id="button-link"
                            type="url"
                            value={buttonLink}
                            placeholder={__('Button Link...', 'custom-blocks')}
                            onChange={(e) => setAttributes({buttonLink: e.target.value})}
                        />
                    </div>
                    {renderButton(buttonLabel, buttonLink)}
                </div>
            </>
        );
    },
    save: ({attributes}) => {
        const {text, image, buttonLabel, buttonLink, bgColor, textColor, alignment} = attributes;

        const renderSavedButton = () => (
            <a
                href={buttonLink}
                href={/^https?:\/\//.test(buttonLink) ? buttonLink : '#'}
                style={{
                    ...BUTTON_STYLES,
                    backgroundColor: textColor,
                    color: bgColor,
                }}
            >
                {buttonLabel}
            </a>
        );

        return (
            <div
                className="modern-block"
                style={{backgroundColor: bgColor, color: textColor, textAlign: alignment}}
            >
                {image && (
                    <div className="cm-image">
                        <img src={image} alt={__('Block Image', 'custom-blocks')}/>
                    </div>
                )}
                {text ? (
                    <RichText.Content tagName="h2" value={text}/>
                ) : (
                    <span className="richtext-placeholder" aria-hidden="true">
        {__('Empty Block Title', 'custom-blocks')}
    </span>
                )}
                {renderSavedButton()}
            </div>
        );
    },
});