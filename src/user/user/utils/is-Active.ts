export function isActive(lastSeen:Date): boolean {     
    const TOW_MINUTES = 2 * 60 * 1000; 
    return Date.now() - new Date(lastSeen).getTime() < TOW_MINUTES;
}