const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'modern-card': './blocks/modern-card/index.js',
        'product-card': './blocks/product-card/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'blocks'),
        filename: '[name]/build/[name].js',
    },
    plugins: [
        ...defaultConfig.plugins.filter(plugin => plugin.constructor.name !== 'CleanWebpackPlugin'),
        new MiniCssExtractPlugin({
            filename: ({ chunk }) => `${chunk.name}/build/style.css`,
            filename: ({ chunk }) => `${chunk.name}/build/editor.css`,
        }),
    ],
    module: {
        rules: [
            ...defaultConfig.module.rules.map(rule => {
                // Застосовуємо MiniCssExtractPlugin для стилів
                if (rule.test && rule.test.toString().includes('css')) {
                    return {
                        ...rule,
                        use: [
                            MiniCssExtractPlugin.loader,
                            ...rule.use.slice(1), // Забираємо решту конфігурацій стилів
                        ],
                    };
                }
                return rule;
            }),
        ],
    },
};
