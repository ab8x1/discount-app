

let followHistory: string[] = [];

export const addToHistory = (url: string) => {
    followHistory.push(url);
}

export function prevInApp(){
    if(followHistory.length > 1) return true;
    else return false;
}