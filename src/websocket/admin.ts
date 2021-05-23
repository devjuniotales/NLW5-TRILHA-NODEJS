import {io} from '../http'
import { ConnectionsServices } from '../services/ConnectionServices'
import { MessagesService } from '../services/MessagesService';


io.on('connect',async  (socket) => {
    const connectionsService = new ConnectionsServices();
    const messsagesService = new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin()
   
    io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

    socket.on('admin_list_messages_by_user',async  (params, callback) => {
        const {user_id} = params;

        const allMessages = await messsagesService.listByUser(user_id)
    
        callback(allMessages)
    });
    socket.on('admin_send_messages',async (params) => {
        const {user_id, text} = params;

        await messsagesService.create({
            text,
            user_id,
            admin_id : socket.id
        });
        const {socket_id} = await connectionsService.findByUserId(user_id)
        
        io.to(socket_id).emit("admin_send_to_client",{
            text,
            socket_id : socket_id,
        });
    });
})