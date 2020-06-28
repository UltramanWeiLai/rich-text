import { exec, queryCommandState } from './utils'

const configs = {
    formatBlock: 'formatBlock',
    defaultParagraphs: ['', 'div'],
    defaultConfig: {
        bold: {
            icon: '<b>B</b>',
            title: '加粗',
            state: () => queryCommandState('bold'),
            result: () => exec('bold')
        },
        res: {
            icon: '<b>红色</b>',
            title: '红色',
            state: () => queryCommandState('foreColor'),
            result: () => exec('foreColor', '#F00')
        },
        blue: {
            icon: '<b>蓝色</b>',
            title: '蓝色',
            state: () => queryCommandState('foreColor'),
            result: () => exec('foreColor', '#00F')
        },
        block: {
            icon: '<b>黑色</b>',
            title: '黑色',
            state: () => queryCommandState('foreColor'),
            result: () => exec('foreColor', '#000')
        },
        h1: {
            icon: '<b>H<sub>1</sub></b>',
            title: '标题1',
            result: () => exec(configs.formatBlock, '<h1>')
        },
        h2: {
            icon: '<b>H<sub>2</sub></b>',
            title: '标题2',
            result: () => exec(configs.formatBlock, '<h2>')
        },
        h3: {
            icon: '<b>H<sub>3</sub></b>',
            title: '标题3',
            result: () => exec(configs.formatBlock, '<h3>')
        }
    }
}

module.exports = configs
