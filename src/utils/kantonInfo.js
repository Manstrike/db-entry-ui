export function GetSelectedKanton() {
    const kanton = JSON.parse(sessionStorage.getItem('kanton'));
    return kanton;
}
