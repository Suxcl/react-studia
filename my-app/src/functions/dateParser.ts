export const getDate =():string =>{
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Month is zero-based, so we add 1
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`
}