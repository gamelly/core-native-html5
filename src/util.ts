export function hexToStr(n: number) {
    return (n >>> 0).toString(16).padStart(8, '0')
}

export function blockFunc(f: Function) {
    (async () => await f())()
}
