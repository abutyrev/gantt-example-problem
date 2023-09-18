import GSTC from "gantt-schedule-timeline-calendar";

export function genRows(size) {
    const rows = []
    for (let n = 1; n <= size; n++) {
        rows.push({
            id: n,
            label: `Row ${n}`,
        })
    }
    return rows
}
export function genItems(size) {
    let items = []
    for (let n = 1; n <= size; n++) {
        items = [
            ...items,
            ...[
                {
                    id: `${n}-item`,
                    label: `Item ${n} row ${n}`,
                    rowId: `${n}`,
                    time: {
                        start: GSTC.api.date("2020-01-01").startOf("day").valueOf(),
                        end: GSTC.api.date("2020-01-02").endOf("day").valueOf(),
                    },
                }
            ]
        ]
    }
    return items
}
export const columnsFromDB = [
    {
        id: "id",
        label: "ID",
        data: ({ row }) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
        sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
        width: 80,
        header: {
            content: "ID",
        },
    },
    {
        id: "label",
        data: "label",
        sortable: "label",
        isHTML: false,
        width: 230,
        header: {
            content: "Label",
        },
    },
];
