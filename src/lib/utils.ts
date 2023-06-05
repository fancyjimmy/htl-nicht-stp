export const avatars: { [key: string]: string } = {
    "riesi": "/images/riesi.jpg",
    "mausi": "/images/mausi.png",
    "weber": "/images/weber.jpg",
    "kein Avatar": ""
}

export function getSrc(icon: string): string {
    return avatars[icon];
}

export function range(from: number, to: number, step = 1) {
    const arr = [];
    for (let i = from; i <= to; i += step) {
        arr.push(i);
    }
    return arr;
}


export const emailEnd = "@htlstp.at";