export function getMockWhatsAppMessages() {
  return [
    { id: 'msg_1', conversationId: 'conv_1', direction: 'INBOUND', body: 'Hello, I want to buy $50,000', status: 'READ', sentAt: new Date(Date.now() - 300000).toISOString() },
    { id: 'msg_2', conversationId: 'conv_1', direction: 'OUTBOUND', body: 'Good afternoon! Current USD rate is 1592.00. How would you like to proceed?', status: 'DELIVERED', sentAt: new Date(Date.now() - 240000).toISOString() },
    { id: 'msg_3', conversationId: 'conv_2', direction: 'INBOUND', body: 'Is the rate still 1592?', status: 'READ', sentAt: new Date(Date.now() - 600000).toISOString() },
    { id: 'msg_4', conversationId: 'conv_2', direction: 'OUTBOUND', body: 'Yes, rate is locked at 1592.00 for the next 15 minutes.', status: 'DELIVERED', sentAt: new Date(Date.now() - 540000).toISOString() },
    { id: 'msg_5', conversationId: 'conv_3', direction: 'INBOUND', body: 'Please confirm receipt', status: 'UNREAD', sentAt: new Date(Date.now() - 900000).toISOString() },
    { id: 'msg_6', conversationId: 'conv_5', direction: 'INBOUND', body: 'Do you handle GBP?', status: 'READ', sentAt: new Date(Date.now() - 1500000).toISOString() },
    { id: 'msg_7', conversationId: 'conv_5', direction: 'OUTBOUND', body: 'Yes, we handle GBP. Current rate is 2050.00', status: 'DELIVERED', sentAt: new Date(Date.now() - 1440000).toISOString() },
    { id: 'msg_8', conversationId: 'conv_7', direction: 'INBOUND', body: 'Payment sent via GTBank', status: 'READ', sentAt: new Date(Date.now() - 2100000).toISOString() },
    { id: 'msg_9', conversationId: 'conv_7', direction: 'OUTBOUND', body: 'Received NGN 5,000,000. Your USD will be ready shortly.', status: 'DELIVERED', sentAt: new Date(Date.now() - 2040000).toISOString() },
    { id: 'msg_10', conversationId: 'conv_9', direction: 'INBOUND', body: 'What is the minimum amount?', status: 'READ', sentAt: new Date(Date.now() - 2700000).toISOString() },
    { id: 'msg_11', conversationId: 'conv_9', direction: 'OUTBOUND', body: 'Minimum transaction is $1,000 or equivalent.', status: 'DELIVERED', sentAt: new Date(Date.now() - 2640000).toISOString() },
  ];
}
