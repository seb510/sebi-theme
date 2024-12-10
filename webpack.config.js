const path = require('path');

module.exports = {
    mode: 'development', // або 'production'
    entry: {
        'custom-block': './src/blocks/custom-block.js',
        'modern-block': './src/blocks/modern-block.js',
    },
    output: {
        path: path.resolve(__dirname, 'src/blocks'),
        filename: '[name].bundle.js', // Динамічне ім'я файлу
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
