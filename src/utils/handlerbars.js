const moment = require("moment");
const Handlerbars = require("handlebars");

module.exports = {
    sum: (a, b) => a + b,
    formatLocal: (utcString, fmt = "HH:mm DD/MM/YYYY") => {
        return moment(utcString).format(fmt);
    },
    sortable: (field, sort) => {
        // Define icon, nextType, label
        const isCurrentField = field === sort.col;
        const currentType = isCurrentField ? sort.type : "default";

        // Mapping for labels and types
        const sortConfig = {
            default: { label: "mặc định", nextType: "desc" },
            asc: { label: "tăng dần", nextType: "desc" },
            desc: { label: "giảm dần", nextType: "asc" },
        };

        const config = sortConfig[currentType];
        const icon =
            currentType === "asc" ? "↑" : currentType === "desc" ? "↓" : "";

        const address = Handlerbars.escapeExpression(
            `?_sort&col=${field}&type=${config?.nextType}`
        );

        const ouput = `<a href="${address}" title="Sắp xếp ${config?.label}">
                        ${icon} ${config?.label}
                    </a>`;

        return new Handlerbars.SafeString(ouput);
    },
};
