export function parseAccountIds(accountIds: string): number[] {
    return accountIds
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => !isNaN(id));
}
