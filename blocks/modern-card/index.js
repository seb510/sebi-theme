import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import './style.css';
import './editor.css';

registerBlockType('custom/modern-card', {
    title: 'Modern Card',
    icon: 'screenoptions',
    category: 'common',
    attributes: {
        title: { type: 'string', source: 'html', selector: 'h3' },
        content: { type: 'string', source: 'html', selector: 'p' },
    },
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({ className: 'modern-card' });

        return (
            <div {...blockProps}>
                <RichText
                    tagName="h3"
                    placeholder="Enter card title"
                    value={attributes.title}
                    onChange={(value) => setAttributes({ title: value })}
                />
                <RichText
                    tagName="p"
                    placeholder="Enter card content"
                    value={attributes.content}
                    onChange={(value) => setAttributes({ content: value })}
                />
            </div>
        );
    },
    save({ attributes }) {
        const blockProps = useBlockProps.save({ className: 'modern-card' });

        return (
            <div {...blockProps}>
                <RichText.Content tagName="h3" value={attributes.title} />
                <RichText.Content tagName="p" value={attributes.content} />
            </div>
        );
    },
});
