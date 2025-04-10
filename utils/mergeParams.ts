export async function mergeParams(currentQuery: Record<string, any>): Promise<Record<string, any>> {
    const storedParams = await storage.getSessionItem('urlParameterString') || '{}';
    return { ...storedParams, ...currentQuery };
}
