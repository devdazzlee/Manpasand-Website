export const MANPASAND_WHATSAPP_E164 = '923423344040';

export function buildBankTransferWhatsAppUrl(input: {
  orderNumber: string;
  total: number;
  customerName: string;
  city?: string;
  phone?: string;
}): string {
  const lines = [
    'Assalam o Alaikum Manpasand,',
    '',
    'I placed an order and want to pay by bank transfer.',
    '',
    `Order: ${input.orderNumber}`,
    `Amount: Rs. ${Number(input.total || 0).toLocaleString()}`,
    `Name: ${input.customerName}`,
  ];
  if (input.city) lines.push(`City: ${input.city}`);
  if (input.phone) lines.push(`Phone: ${input.phone}`);
  lines.push('', 'Please share account details so I can transfer.');

  return `https://wa.me/${MANPASAND_WHATSAPP_E164}?text=${encodeURIComponent(lines.join('\n'))}`;
}
