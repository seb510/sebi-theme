const { registerBlockType } = wp.blocks;
const {
    InspectorControls, // Панель налаштувань у бічній панелі редактора блоків
    MediaUpload, // Компонент для завантаження медіафайлів
    RichText, // Компонент для редагування тексту з підтримкою форматування
    ColorPalette, // Інструмент вибору кольорів
    BlockControls, // Панель налаштувань інструментів над блоком
    AlignmentToolbar, // Інструмент для вибору вирівнювання
} = wp.blockEditor;
const { PanelBody, Button } = wp.components; // Компоненти інтерфейсу WordPress (панель, кнопка)
const { __ } = wp.i18n; // Функція для перекладу тексту

// Константи для стилізації кнопки
const BUTTON_STYLES = {
    padding: '10px 20px',
    borderRadius: '5px',
    display: 'inline-block',
    marginTop: '10px',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s',
};

// Реєстрація блоку
registerBlockType('custom/modern-block', {
    title: __('Modern Block', 'custom-blocks'), // Назва блоку для редактора
    icon: 'star-filled', // Іконка для блоку
    category: 'design', // Категорія, в якій відображається блок
    attributes: { // Список атрибутів блоку
        text: { type: 'string', source: 'html', selector: 'h2' }, // Заголовок блоку
        image: { type: 'string', default: null }, // URL зображення
        buttonLabel: { type: 'string', default: __('Click Me', 'custom-blocks') }, // Текст кнопки
        buttonLink: { type: 'string', default: '#' }, // Посилання кнопки
        bgColor: { type: 'string', default: '#ffffff' }, // Колір фону блоку
        textColor: { type: 'string', default: '#000000' }, // Колір тексту (фон кнопки)
        buttonTextColor: { type: 'string', default: '#ffffff' }, // Колір тексту кнопки
        titleTextColor: { type: 'string', default: '#000000' }, // Колір тексту заголовка
        alignment: { type: 'string', default: 'center' }, // Вирівнювання тексту
    },
    edit: ({ attributes, setAttributes }) => { // Компонент для редагування блоку
        const {
            text,
            image,
            buttonLabel,
            buttonLink,
            bgColor,
            textColor,
            buttonTextColor,
            titleTextColor,
            alignment,
        } = attributes;

        // Функція для відображення палітри кольорів
        const renderColorPalette = (label, valueKey) => (
            <>
                <p>{label}</p> {/* Назва кольору */}
                <ColorPalette
                    value={attributes[valueKey]} // Поточне значення кольору
                    onChange={(value) => {
                        if (value) {
                            setAttributes({ [valueKey]: value }); // Зберігаємо вибраний колір
                        }
                    }}
                />
            </>
        );

        // Функція для відображення кнопки
        const renderButton = (label, link) => (
            <a
                href={link}
                className="modern-block-button"
                style={{
                    ...BUTTON_STYLES,
                    backgroundColor: textColor, // Колір фону кнопки
                    color: buttonTextColor, // Колір тексту кнопки
                    filter: 'contrast(1.5)', // Фільтр для покращення контрасту
                }}
            >
                {label}
            </a>
        );

        return (
            <>
                <InspectorControls> {/* Панель налаштувань у правій стороні */}
                    <PanelBody title={__('Block Settings', 'custom-blocks')}> {/* Група налаштувань */}
                        {renderColorPalette(__('Background Color', 'custom-blocks'), 'bgColor')} {/* Колір фону */}
                        {renderColorPalette(__('Title Text Color', 'custom-blocks'), 'titleTextColor')} {/* Колір заголовка */}
                        {renderColorPalette(__('Text Color (Button Background)', 'custom-blocks'), 'textColor')} {/* Колір фону кнопки */}
                        {renderColorPalette(__('Button Text Color', 'custom-blocks'), 'buttonTextColor')} {/* Колір тексту кнопки */}
                    </PanelBody>
                </InspectorControls>
                <BlockControls> {/* Панель інструментів над блоком */}
                    <AlignmentToolbar
                        value={alignment} // Поточне вирівнювання
                        onChange={(align) => setAttributes({ alignment: align })} // Зберігаємо вибране вирівнювання
                    />
                </BlockControls>
                <div
                    className="modern-block block-has-content"
                    aria-live="polite"
                    style={{
                        backgroundColor: bgColor, // Колір фону
                        color: textColor, // Колір тексту
                        textAlign: alignment, // Вирівнювання тексту
                    }}
                >
                    <MediaUpload
                        onSelect={(media) => media.url && setAttributes({ image: media.url })} // Вибір зображення
                        allowedTypes={['image']} // Дозволені типи файлів
                        render={({ open }) => (
                            <div>
                                <Button
                                    onClick={open}
                                    className={`block-editor-rich-text__editable wp-block-button__link wp-element-button rich-text ${image ? 'image-button' : 'button button-large'}`}
                                >
                                    {image
                                        ? __( `${image.title} Uploaded`, 'custom-blocks') // Якщо зображення завантажено
                                        : __('Upload Image', 'custom-blocks')} // Якщо зображення ще не завантажено
                                </Button>
                                {image && (
                                    <div className="cm-image">
                                        <img
                                            src={image}
                                            alt={
                                                image
                                                    ? __('Uploaded Image', 'custom-blocks')
                                                    : __('No Image', 'custom-blocks')
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    />
                    <RichText
                        tagName="h2"
                        aria-label={__('Editable Block Title', 'custom-blocks')}
                        placeholder={__('Add your text...', 'custom-blocks')} // Підказка для тексту
                        value={text} // Поточний текст
                        onChange={(value) => setAttributes({ text: value })} // Оновлення тексту
                        style={{ color: titleTextColor }} // Стиль тексту
                    />
                    <div>
                        <label htmlFor="button-text">
                            {__('Button Text:', 'custom-blocks')} {/* Мітка для тексту кнопки */}
                        </label>
                        <input
                            id="button-text"
                            type="text"
                            value={buttonLabel} // Поточний текст кнопки
                            placeholder={__('Button Text...', 'custom-blocks')} // Підказка для тексту кнопки
                            onChange={(e) => setAttributes({ buttonLabel: e.target.value })} // Оновлення тексту кнопки
                        />
                        <label htmlFor="button-link">
                            {__('Button Link:', 'custom-blocks')} {/* Мітка для посилання кнопки */}
                        </label>
                        <input
                            id="button-link"
                            type="url"
                            value={buttonLink} // Поточне посилання кнопки
                            placeholder={__('Button Link...', 'custom-blocks')} // Підказка для посилання кнопки
                            onChange={(e) => setAttributes({ buttonLink: e.target.value })} // Оновлення посилання кнопки
                        />
                    </div>
                    {renderButton(buttonLabel, buttonLink)} {/* Відображення кнопки */}
                </div>
            </>
        );
    },
    save: ({ attributes }) => { // Збереження структури блоку для фронтенду
        const {
            text,
            image,
            buttonLabel,
            buttonLink,
            bgColor,
            textColor,
            buttonTextColor,
            titleTextColor,
            alignment,
        } = attributes;

        const renderSavedButton = () => (
            <a
                href={/^https?:\/\//.test(buttonLink) ? buttonLink : '#'} // Валідація посилання
                style={{
                    ...BUTTON_STYLES,
                    backgroundColor: textColor, // Колір кнопки
                    color: buttonTextColor, // Колір тексту кнопки
                }}
            >
                {buttonLabel}
            </a>
        );

        return (
            <div
                className="modern-block"
                style={{
                    backgroundColor: bgColor, // Колір фону блоку
                    color: textColor, // Колір тексту блоку
                    textAlign: alignment, // Вирівнювання тексту
                }}
            >
                {image && (
                    <div className="cm-image">
                        <img src={image} alt={__('Block Image', 'custom-blocks')} /> {/* Зображення */}
                    </div>
                )}
                {text ? (
                    <RichText.Content
                        tagName="h2"
                        value={text} // Збереження тексту
                        style={{ color: titleTextColor }} // Збереження стилю заголовка
                    />
                ) : (
                    <span
                        className="richtext-placeholder"
                        aria-hidden="true"
                        style={{ color: titleTextColor }}
                    >
                        {__('Empty Block Title', 'custom-blocks')} {/* Текст-заглушка для порожнього блоку */}
                    </span>
                )}
                {renderSavedButton()} {/* Кнопка */}
            </div>
        );
    },
});
