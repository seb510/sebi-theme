(function (blocks, element, editor, components) {
    const { registerBlockType } = blocks;
    const { createElement: el } = element;
    const { MediaUpload, ColorPalette, InspectorControls, RichText } = editor;
    const { Button, PanelBody } = components;

    registerBlockType('custom/image-text-block', {
        title: 'Картинка + Текст Block',
        icon: 'format-image',
        category: 'widgets',
        attributes: {
            imageURL: { type: 'string', default: '' },
            text: { type: 'string', default: 'Ваш текст' },
            textColor: { type: 'string', default: '#000000' },
        },
        edit: (props) => {
            const { attributes, setAttributes } = props;

            return el(
                'div',
                { className: 'image-text-block-editor' },
                // Панель налаштувань
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Налаштування тексту' },
                        el(ColorPalette, {
                            value: attributes.textColor,
                            onChange: (color) => setAttributes({ textColor: color }),
                        })
                    )
                ),
                // Вибір зображення
                el(MediaUpload, {
                    onSelect: (media) => setAttributes({ imageURL: media.url }),
                    allowedTypes: ['image'],
                    render: ({ open }) =>
                        el(
                            Button,
                            { onClick: open, isPrimary: true },
                            attributes.imageURL ? 'Змінити картинку' : 'Вибрати картинку'
                        )
                }),
                attributes.imageURL && el('img', { src: attributes.imageURL, alt: 'Картинка' }),
                // Редагування тексту
                el(RichText, {
                    tagName: 'p',
                    value: attributes.text,
                    onChange: (text) => setAttributes({ text }),
                    placeholder: 'Введіть текст...',
                    style: { color: attributes.textColor },
                })
            );
        },
        save: () => null, // Фронтенд обробляється PHP
    });
})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components);
