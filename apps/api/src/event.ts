import EventEmitter  from "node:stream";

const channels = new Map<number, EventEmitter>(); 

export function getWorkspaceChannel( workspaceId : number) : EventEmitter {
    let channel = channels.get(workspaceId);

    if (!channel) {
        channel = new EventEmitter();
        channels.set(workspaceId, channel); 
    }

    return channel; 
}