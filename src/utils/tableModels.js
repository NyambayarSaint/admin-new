export const tableProcess = {
    order_number: { label: 'Захиалгын дугаар', columnFilter: true, columnOrder: true },
    branch: { label: 'Салбар' },
    address: { label: 'Хаяг', columnFilter: true },
    channel: { label: 'Суваг' },
    phone: { label: 'Утас', columnOrder: true, columnFilter: true },
    payTypeText: { label: 'Төлбөрийн төрөл' },
    is_paid_text: { label: 'Урьдчилж төлсөн эсэх' },
    invoice_number: { label: 'Гүйлгээний утга' },
    order_status_text: { label: 'Төлөв' },
    operator: { label: 'Оператор' },
    created_at: { label: 'Огноо', sticky: true }
}
export const tableEditAddress = {
    city: { label: 'Хот' },
    district: { label: 'Дүүрэг', columnFilter: true },
    horoo: { label: 'Хороо' },
    bairname: { label: 'Хаяг' },
    podph: { label: 'Под PH' }
}
export const tableComplaint = {
    category: { label: 'Ангилал' },
    channel: { label: 'Суваг' },
    created_at: { label: 'Үүсгэсэн огноо' },
    custComplaint: { label: 'Гомдол' },
    custPhone: { label: 'Хэрэглэгчийн утас' },
    id: { label: 'id' },
    isSolved: { label: 'Шийдвэрлэсэн эсэх' },
    level: { label: 'level' },
    operator: { label: 'operator' },
    orderDate: { label: 'orderDate' },
    orderNumber: { label: 'orderNumber', columnOrder: true },
    outlet: { label: 'outlet' },
    resolvedAt: { label: 'resolvedAt' },
    resolvedEmp: { label: 'resolvedEmp' },
    resolvedNote: { label: 'resolvedNote' },
    updated_at: { label: 'updated_at' },
}