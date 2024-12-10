const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, RichText, ColorPalette } = wp.blockEditor;
const { PanelBody, Button } = wp.components;
const { __ } = wp.i18n;

registerBlockType('custom/advanced-block', {
    title: __('Advanced Block', 'custom-blocks'),
    icon: 'smiley',
    category: 'design',
    attributes: {
        imageUrl: {
            type: 'string',
            default: null,
        },
        text: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        link: {
            type: 'string',
            default: '#',
        },
        textColor: {
            type: 'string',
            default: '#000000',
        },
        buttonBgColor: {
            type: 'string',
            default: '#ffffff',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { imageUrl, text, link, textColor, buttonBgColor } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'custom-blocks')}>
                        <p>{__('Text Color', 'custom-blocks')}</p>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                        <p>{__('Button Background Color', 'custom-blocks')}</p>
                        <ColorPalette
                            value={buttonBgColor}
                            onChange={(color) => setAttributes({ buttonBgColor: color })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div className="custom-advanced-block" style={{ color: textColor }}>
                    <MediaUpload
                        onSelect={(media) => setAttributes({ imageUrl: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                className={imageUrl ? 'image-button' : 'button button-large'}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt={__('Upload Image', 'custom-blocks')} />
                                ) : (
                                    __('Upload Image', 'custom-blocks')
                                )}
                            </Button>
                        )}
                    />

                    <RichText
                        tagName="p"
                        placeholder={__('Add text...', 'custom-blocks')}
                        value={text}
                        onChange={(value) => setAttributes({ text: value })}
                    />

                    <input
                        type="url"
                        value={link}
                        placeholder={__('Add URL...', 'custom-blocks')}
                        onChange={(e) => setAttributes({ link: e.target.value })}
                    />

                    <a
                        href={link}
                        className="custom-block-button"
                        style={{
                            backgroundColor: buttonBgColor,
                            color: textColor,
                            padding: '10px 15px',
                            display: 'inline-block',
                            textDecoration: 'none',
                            marginTop: '10px',
                        }}
                    >
                        {__('Click Me', 'custom-blocks')}
                    </a>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { imageUrl, text, link, textColor, buttonBgColor } = attributes;

        return (
            <div className="custom-advanced-block" style={{ color: textColor }}>
                {imageUrl && <img src={imageUrl} alt={__('Block Image', 'custom-blocks')} />}
                <RichText.Content tagName="p" value={text} />
                <a
                    href={link}
                    className="custom-block-button"
                    style={{
                        backgroundColor: buttonBgColor,
                        color: textColor,
                        padding: '10px 15px',
                        textDecoration: 'none',
                    }}
                >
                    {__('Click Me', 'custom-blocks')}
                </a>
            </div>
        );
    },
});
