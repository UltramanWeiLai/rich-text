import { formatBlock, defaultParagraphs, defaultConfig } from './config'
import { exec, querySelector, createElement, addEventListener } from './utils'

class RichText {

    constructor(selector, config) {

        if(typeof selector === 'string') 
            this.el = querySelector(selector)
        else 
            this.el = querySelector('body')
        
        this.el.classList.add('th-container')

        this.defaultParagraph = 'p'

        this.createEditNode()
        this.createToolbarNode(config)
    }

    createEditNode() {

        const editDiv = createElement('div')

        editDiv.setAttribute('contenteditable', true)
        editDiv.className = 'th-edit-box'
        editDiv.oninput = (el) => {
            const firstChild = el.target.firstChild
            if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${this.defaultParagraph}>`)
            else if (editDiv.innerHTML === '<div><br></div><div><br></div>') editDiv.innerHTML = ''
        }
        editDiv.onkeydown = event => {
            if (event.key === 'Enter' &&  (defaultParagraphs.indexOf(document.queryCommandValue(formatBlock)) != -1) ) {
                setTimeout(() => exec(formatBlock, `<${this.defaultParagraph}>`), 0)
            }
        }

        this.el.appendChild(editDiv)
    }

    createToolbarNode(config) {

        const configs = config ? 
            (
                config.map(item => {
                    if(typeof item === 'string') return defaultConfig[item]
                    else if(defaultConfig[item.name]) return {...defaultConfig[item.name], ...item}
                })
            )
            :
            Object.keys(defaultConfig).map(action => defaultConfig[action])
        
        const toolbarDiv = createElement('div')

        toolbarDiv.className = 'th-toolbar'

        configs.forEach(item => {
            const button = createElement('button')

            button.innerHTML = item.icon
            button.title = item.title
            button.setAttribute('type', 'button')
            button.onclick = () => {
                item.result()
            }

            // if(item.state) {

            //     const handler = () => {
            //         button.classList[item.state() ? 'add' : 'remove']('_active')
            //     }

            //     addEventListener(this.el, 'input', handler)
            //     addEventListener(this.el, 'mouseup', handler)
            //     addEventListener(button, 'click', handler)
            // }

            toolbarDiv.appendChild(button)
        })

        this.el.appendChild(toolbarDiv)
    }
}

module.exports = function(selector) {
    return new RichText(selector)
}