export default defineNuxtRouteMiddleware((to, from) => {
    const oldParams = storage.getSessionItem('urlParameterString') || {};

    // Merge old and new query params
    const mergedParams = { ...oldParams, ...to.query };

    // Check if redirection is needed
    if (JSON.stringify(to.query) !== JSON.stringify(mergedParams)) {
        // Save immediately before redirecting
        storage.setSessionItem('urlParameterString', mergedParams);

        // Redirect with merged query params BEFORE the page loads
        return navigateTo({ path: to.path, query: mergedParams }, { replace: true });
    }

    // Save the final parameters in session storage
    storage.setSessionItem('urlParameterString', mergedParams);
});
