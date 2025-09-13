export function getPagination(query: { page?: string | number; perPage?: string | number }) {
    const page = Number(query.page) || 1;
    const perPage = Number(query.perPage) || 10;
    const skip = (page - 1) * perPage;
    const take = perPage;

    return { page, perPage, skip, take };
}
