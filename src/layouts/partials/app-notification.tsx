import SideSlidingModal from "@/components/modal/wrapper/side-sliding-modal";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import TablePagination from "@/components/table/table-pagination";
import EmptyState from "@/components/empty-state";
import useApiRequest from "@/hooks/api-request/request";
import moment from "moment";
import Button from "@/components/form/button";
import { SuccessToast } from "@/utils/toast-notification";
import { bool } from "yup";

const AppNotification = ({data, setCurrentNotificationPage} : {setCurrentNotificationPage: (page: number) => void, data: any}) => {

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [notification, setNotification] = useState<NotificationType|null>(null);

    const [showNotification, setShowNotification] = useState<boolean>(false);
  

    const trigger = (
        <div className="relative cursor-pointer">
            <Bell size={18} />
            {data?.total_unread_notification > 0 && (
                <p className="absolute w-2 h-2 bg-red-500 rounded-full -right-0 -top-1 animate-ping"></p>
            )}
        </div>
    );

    const {
            Post,
            requestLoading,
        } = useApiRequest();

    const [markAllLoading, setMarkAllLoading] = useState<boolean>(false);
    const markAllAsRead = async () => {
        const request = await Post({endpoint: '/notification/mark-all-as-read', refreshEndpoint: '/notification'});
        if ( ! request ) return;
        SuccessToast('All notifications marked as read successfully')
    }

    const readNotification = async (notification:NotificationType) => {
        if ( notification.is_read ){
            setNotification(notification);
            return;
        }
        const request = await Post({endpoint: `/notification/${notification.uuid}/mark-as-read`, refreshEndpoint: '/notification'});
        if ( ! request ) return;
        setNotification(notification);
    }

    const [deleteAllLoading, setDeleteAllLoading] = useState<boolean>(false);
    const deleteAllNotification = async () => {
        const request = await Post({endpoint: '/notification/delete-all', refreshEndpoint: '/notification'});
        if ( ! request ) return;
        SuccessToast('All notifications deleted successfully')
    }
    
    return (
        <div>
            <SideSlidingModal slideTitle="Your notifications" buttonTrigger={trigger}>
                <div>
                    {(data && ! notification) &&(
                        <div className="mt-[3em] space-y-[3em]">
                            <div className="grid gap-3">
                                {data?.items?.map((item:NotificationType, index: number) => (
                                    <div
                                        key={index}
                                        className={`grid gap-2 p-5 cursor-pointer rounded-md ${
                                            item.is_read ? 'bg-white' : 'bg-blue-50'
                                        }`}
                                        style={{
                                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                                        }}
                                        onClick={() => readNotification(item)}
                                    >
                                        <div className="grid gap-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className={item.is_read ? 'font-medium' : 'font-semibold'}>{item.title}</h4>
                                                <div className="flex items-center gap-2">
                                                    {!item.is_read && (
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full" title="Unread" />
                                                    )}
                                                    <span className="text-sm themeTextMuted">{moment(item.created_at).fromNow()}</span>
                                                </div>
                                            </div>
                                            <span className="themeTextMuted">{item.body}</span>
                                        </div>
                                    </div>
                                ))}
                                {data?.items.length > 0 && (
                                    <div className="flex items-center justify-between mt-5">
                                    {data.total_unread_notification > 0 && <Button onClick={markAllAsRead} disabled={requestLoading}  isLoading={markAllLoading} design="" text="Mark all as read" className="themeTextMuted hover:underline"/>}
                                    <Button onClick={deleteAllNotification} isLoading={deleteAllLoading} disabled={requestLoading} design="" text="Delete all notifications" className="text-red-800 themeTextMuted hover:underline"/>
                                </div>
                                )}
                            </div>
                            <TablePagination
                                totalPages={data?.totalPages ?? 0} 
                                onPageChange={(page) => {setCurrentPage(page); setCurrentNotificationPage(page)}} 
                                currentPage={data?.page ?? currentPage}
                            />
                            {data?.items.length === 0 && <EmptyState page="notification"/>}
                        </div>
                    )}
                    {(notification) && (
                        <div className="mt-[3em] space-y-4">
                            <p className="themeTextSecondary font-[450]">{notification.title} {moment(notification.created_at).fromNow()}</p>
                            <p className="font-light themeTextSecondary">{notification.body}</p>
                            <Button onClick={() => setNotification(null)} design="" text="Close notification" className="themeTextMuted hover:underline"/>
                        </div>
                    )}
                </div>
            </SideSlidingModal>
        </div>
    );
}

export default AppNotification