(function (blocks, element, editor, components) {
    const { registerBlockType } = blocks;
    const { createElement: el } = element;
    const { MediaUpload, ColorPalette, InspectorControls, RichText, URLInput } = editor;
    const { Button, PanelBody } = components;

    registerBlockType('custom/modern-card-block', {
        title: 'Сучасна Картка (Modern Card)',
        icon: 'id-alt',
        category: 'layout',
        attributes: {
            backgroundImage: { type: 'string', default: '' },
            title: { type: 'string', default: 'Заголовок' },
            subtitle: { type: 'string', default: 'Підзаголовок' },
            buttonText: { type: 'string', default: 'Дізнатися більше' },
            buttonURL: { type: 'string', default: '#' },
            buttonColor: { type: 'string', default: '#ffffff' },
            textColor: { type: 'string', default: '#000000' },
        },
        edit: (props) => {
            const { attributes, setAttributes } = props;

            return el(
                'div',
                { className: 'modern-card-block-editor' },
                // Панель налаштувань
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Налаштування' },
                        el('p', null, 'Колір тексту'),
                        el(ColorPalette, {
                            value: attributes.textColor,
                            onChange: (color) => setAttributes({ textColor: color }),
                        }),
                        el('p', null, 'Колір кнопки'),
                        el(ColorPalette, {
                            value: attributes.buttonColor,
                            onChange: (color) => setAttributes({ buttonColor: color }),
                        }),
                        el('p', null, 'Посилання для кнопки'),
                        el(URLInput, {
                            value: attributes.buttonURL,
                            onChange: (url) => setAttributes({ buttonURL: url }),
                        })
                    )
                ),
                // Вибір зображення
                el(MediaUpload, {
                    onSelect: (media) => setAttributes({ backgroundImage: media.url }),
                    allowedTypes: ['image'],
                    render: ({ open }) =>
                        el(
                            Button,
                            { onClick: open, isPrimary: true },
                            attributes.backgroundImage ? 'Змінити фон' : 'Додати фон'
                        )
                }),
                attributes.backgroundImage &&
                el('div', {
                    className: 'modern-card-preview',
                    style: { backgroundImage: `url(${attributes.backgroundImage})` },
                }),
                // Редагування тексту
                el(RichText, {
                    tagName: 'h2',
                    value: attributes.title,
                    onChange: (title) => setAttributes({ title }),
                    placeholder: 'Введіть заголовок...',
                }),
                el(RichText, {
                    tagName: 'p',
                    value: attributes.subtitle,
                    onChange: (subtitle) => setAttributes({ subtitle }),
                    placeholder: 'Введіть підзаголовок...',
                }),
                el(RichText, {
                    tagName: 'a',
                    value: attributes.buttonText,
                    onChange: (buttonText) => setAttributes({ buttonText }),
                    placeholder: 'Текст кнопки...',
                })
            );
        },
        save: () => null, // Фронтенд обробляється PHP
    });
})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components);
