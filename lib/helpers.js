import { useEffect } from "react"
import Router from 'next/router'

export const isObject = v => v && v.constructor !== Array && v === Object(v) && typeof v !== 'function' && v instanceof Promise === false && v instanceof Date === false;

export const cookie = {
    set: (cname, cvalue, exdays=1) => {
        if(typeof window === 'undefined') return false
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    get: cname => {
        if(typeof window === 'undefined') return false
        var name = cname + "=";
        return document.cookie.split(';')
            .map(s => s.trim())
            .filter(s => ~s.indexOf(name))
            .map(s => s.replace(name, ''))
            [0] || ''
    },
    getFromString: (cname, string) => {
        if(!string) return ''
        var name = cname + "=";
        return string.split(';')
            .map(s => s.trim())
            .filter(s => ~s.indexOf(name))
            .map(s => s.replace(name, ''))
            [0] || ''
    }
}

export const scrollWindowTo = (destination, duration = 200, easing = 'easeInOutCubic', callback) => {
    const easings = {
        linear: t => t,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    };

    if(!destination && destination !== 0) return

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }

    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easings[easing](time);
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        if (Math.ceil(window.pageYOffset) === Math.ceil(destinationOffsetToScroll)) {
            if (callback) {
                callback();
            }
            return;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}

export const getElementOffsetY = element => {
    if(typeof window === 'undefined' || !element) return 0

    const bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect()

    return elemRect.top - bodyRect.top
}

export const isServer = typeof window === 'undefined'

export const hex2rgb = hex => {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length === 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255].join(',');
    }
    throw new Error('Invalid HEX value provided for BarLoader prop "color" ');
}

export const capitalize = str => String(str)
    .split(' ')
    .map(w => (w[0].toUpperCase() + w.slice(1)))
    .join(' ')

export const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export const truncate = (fullStr, strLen) => {
    if(typeof fullStr !== 'string') return ''

    if (fullStr.length <= strLen) return fullStr

    const separator = '...'
    const sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) +
           separator +
           fullStr.substr(fullStr.length - backChars)
}

export const snakeToCamel = str => {
    return str.replace(
        /([-_][a-z])/g,
        (group) => group.toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
    )
}

export const toCamel = str => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9ĄĆĘŁŃÓŚŹŻąćęłńóśźż]+(.)/g, (m, chr) => chr.toUpperCase())
}

export const camelToSnake = str => {
    return str
        .replace(/(.)([A-Z][a-z]+)/, '$1_$2')
        .replace(/([a-z0-9])([A-Z])/, '$1_$2')
        .toLowerCase()
}

export const onClickOutside = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) callback()
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    })
}

export const stringContainsOneOf = (string, array) => {
    return array.reduce((acc, item) => {
        return ~string.indexOf(item) ? true : acc
    }, false)
}

export const stringStartsWithOneOf = (string, array) => {
    return array.reduce((acc, item) => {
        return string.indexOf(item) === 0 ? true : acc
    }, false)
}

export const goTo = (path, as, asNewTab) => {
    if(typeof window === 'undefined') return
    if(asNewTab) {
        return window.open(process.env.NEXT_PUBLIC_APP_URL + (as || path), '_blank').focus()
    }
    if(window.event && (window.event.metaKey || window.event.ctrlKey)) {
        return window.open(process.env.NEXT_PUBLIC_APP_URL + (as || path), '_blank')
    }
    Router.push(path, as || path).then(() => window.scrollTo(0, 0))
    return null
}

export const kebabToCamel = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

export const sortByPath = (array=[], path='', asNumber=false) => {
    const pathParts = path.split('.');
    return [...array].sort((a, b) => {

        let A = a[pathParts[0]];
        if(pathParts.length > 1) A = a[pathParts[0]][pathParts[1]];
        if(pathParts.length > 2) A = a[pathParts[0]][pathParts[1]][pathParts[2]];
        A = asNumber ? Number(A) : A.toUpperCase();

        let B = b[pathParts[0]];
        if(pathParts.length > 1) B = b[pathParts[0]][pathParts[1]];
        if(pathParts.length > 2) B = b[pathParts[0]][pathParts[1]][pathParts[2]];
        B = asNumber ? Number(B) : B.toUpperCase();

        let comparison;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    });
}

export const roundTo = (number, precision=0) => {
    const power = Math.pow(10, precision);
    return Math.ceil((number || 0) * power) / power;
}

export const arraysEqual = (a, b) => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
}

export const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        const context = this
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait)
    }
}

export const trim2 = val =>  parseInt(val * 100)/100

export const trim1 = val =>  parseInt(val * 10)/10

export const percentOf = (x, y) => Math.ceil((x / (y || 1)) * 100)

export const percentToNum = (per, max) => Math.ceil((max / 100) * per)