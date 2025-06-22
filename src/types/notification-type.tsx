interface NotificationType {
    type: 'mark_transaction' | 'new_transaction' | 'new_subscription'
    uuid: string
    created_at: string
    title: string
    body: string
    type_id: string
    is_read: boolean
    is_resolved: boolean,
    total_unread_notification: number,
}