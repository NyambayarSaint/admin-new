export const formEditAddress = {
    city: { label: 'Хот', type: 'Text' },
    district: { label: 'Дүүрэг', type: 'SelectDistrict' },
    horoo: { label: 'Хороо', type: 'SelectKhoroo' },
    bairname: { label: 'Хаяг', type: 'Text' },
    bairnote: { label: 'Албан бус хаяг', type: 'Text' },
    podcode: { label: 'Х/Бүс', type: 'Text', required: true },
    podph: { label: 'PH Х/Бүс', type: 'Text' }
}

export const formComplaint = {
    category: { label: 'Ангилал', type: 'Text' },
    channel: { label: 'Суваг', type: 'Text', required: true },
    created_at: { label: 'Үүсгэсэн огноо', type: 'Text' },
    custComplaint: { label: 'Гомдол', type: 'Text' },
    custPhone: { label: 'Хэрэглэгчийн утас', type: 'Text' },
    isSolved: { label: 'Шийдвэрлэсэн эсэх', type: 'Text' },
    level: { label: 'level', type: 'Text' },
    operator: { label: 'operator', type: 'Text' },
    orderDate: { label: 'orderDate', type: 'Text' },
    orderNumber: { label: 'orderNumber', type: 'Text' },
    outlet: { label: 'outlet', type: 'Text' },
    resolvedAt: { label: 'resolvedAt', type: 'Text' },
    resolvedEmp: { label: 'resolvedEmp', type: 'Text' },
    resolvedNote: { label: 'resolvedNote', type: 'Text' },
    updated_at: { label: 'updated_at', type: 'Text' },
}