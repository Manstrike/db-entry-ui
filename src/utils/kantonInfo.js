export function GetSelectedKanton() {
    const kanton = localStorage.getItem('kanton');

    return kanton || null;
}
