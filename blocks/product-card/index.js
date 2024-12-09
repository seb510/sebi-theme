import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import './style.css';
import './editor.css';

registerBlockType('custom/product-card', {
    title: 'Product Card',
    icon: 'cart',
    category: 'common',
    attributes: {
        title: { type: 'string', source: 'html', selector: 'h3' },
        description: { type: 'string', source: 'html', selector: 'p' },
        imageUrl: { type: 'string', source: 'attribute', selector: 'img', attribute: 'src' },
    },
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({ className: 'product-card' });

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Product Image">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url })}
                            type="image"
                            value={attributes.imageUrl}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    Select Image
                                </Button>
                            )}
                        />
                    </PanelBody>
                </InspectorControls>
                {attributes.imageUrl && <img src={attributes.imageUrl} alt="Product Image" />}
                <RichText
                    tagName="h3"
                    placeholder="Enter product title"
                    value={attributes.title}
                    onChange={(value) => setAttributes({ title: value })}
                />
                <RichText
                    tagName="p"
                    placeholder="Enter product description"
                    value={attributes.description}
                    onChange={(value) => setAttributes({ description: value })}
                />
            </div>
        );
    },
    save({ attributes }) {
        const blockProps = useBlockProps.save({ className: 'product-card' });

        return (
            <div {...blockProps}>
                {attributes.imageUrl && <img src={attributes.imageUrl} alt="Product Image" />}
                <RichText.Content tagName="h3" value={attributes.title} />
                <RichText.Content tagName="p" value={attributes.description} />
            </div>
        );
    },
});
