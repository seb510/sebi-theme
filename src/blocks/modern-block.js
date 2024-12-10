const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, RichText, ColorPalette, BlockControls, AlignmentToolbar } = wp.blockEditor;
const { PanelBody, Button } = wp.components;
const { __ } = wp.i18n;

registerBlockType('custom/modern-block', {
    title: __('Modern Block', 'custom-blocks'),
    icon: 'star-filled',
    category: 'design',
    attributes: {
        text: { type: 'string', source: 'html', selector: 'h2' },
        image: { type: 'string', default: null },
        buttonLabel: { type: 'string', default: __('Click Me', 'custom-blocks') },
        buttonLink: { type: 'string', default: '#' },
        bgColor: { type: 'string', default: '#ffffff' },
        textColor: { type: 'string', default: '#000000' },
        alignment: { type: 'string', default: 'center' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { text, image, buttonLabel, buttonLink, bgColor, textColor, alignment } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Block Settings', 'custom-blocks')}>
                        <p>{__('Background Color', 'custom-blocks')}</p>
                        <ColorPalette
                            value={bgColor}
                            onChange={(color) => setAttributes({ bgColor: color })}
                        />
                        <p>{__('Text Color', 'custom-blocks')}</p>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                    </PanelBody>
                </InspectorControls>

                <BlockControls>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={(align) => setAttributes({ alignment: align })}
                    />
                </BlockControls>

                <div
                    className="modern-block"
                    style={{ backgroundColor: bgColor, color: textColor, textAlign: alignment }}
                >
                    <MediaUpload
                        onSelect={(media) => setAttributes({ image: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                className={image ? 'image-button' : 'button button-large'}
                            >
                                {image ? (
                                    <img src={image} alt={__('Upload Image', 'custom-blocks')} />
                                ) : (
                                    __('Upload Image', 'custom-blocks')
                                )}
                            </Button>
                        )}
                    />
                    <RichText
                        tagName="h2"
                        placeholder={__('Add your text...', 'custom-blocks')}
                        value={text}
                        onChange={(value) => setAttributes({ text: value })}
                    />
                    <div>
                        <input
                            type="text"
                            value={buttonLabel}
                            placeholder={__('Button Text...', 'custom-blocks')}
                            onChange={(e) => setAttributes({ buttonLabel: e.target.value })}
                        />
                        <input
                            type="url"
                            value={buttonLink}
                            placeholder={__('Button Link...', 'custom-blocks')}
                            onChange={(e) => setAttributes({ buttonLink: e.target.value })}
                        />
                    </div>
                    <a
                        href={buttonLink}
                        className="modern-block-button"
                        style={{
                            backgroundColor: textColor,
                            color: bgColor,
                            padding: '10px 20px',
                            borderRadius: '5px',
                            display: 'inline-block',
                            marginTop: '10px',
                            textDecoration: 'none',
                        }}
                    >
                        {buttonLabel}
                    </a>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { text, image, buttonLabel, buttonLink, bgColor, textColor, alignment } = attributes;

        return (
            <div
                className="modern-block"
                style={{ backgroundColor: bgColor, color: textColor, textAlign: alignment }}
            >
                {image && <img src={image} alt={__('Block Image', 'custom-blocks')} />}
                <RichText.Content tagName="h2" value={text} />
                <a
                    href={buttonLink}
                    className="modern-block-button"
                    style={{
                        backgroundColor: textColor,
                        color: bgColor,
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                    }}
                >
                    {buttonLabel}
                </a>
            </div>
        );
    },
});
