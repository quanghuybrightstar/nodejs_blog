const slugify = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD") // tách dấu
        .replace(/[\u0300-\u036f]/g, "") // xoá dấu
        .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const generateUniqueSlug = async (Model, title) => {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;

    while (await Model.exists({ slug })) {
        slug = `${baseSlug}-${count++}`;
    }

    return slug;
};

module.exports = { generateUniqueSlug };
