import { Server } from 'http';

import * as socketIo from 'socket.io';

import { Message } from '../model/message';
import { Action } from '../model/action';
import { Metric } from '../model/metric';

const LOG = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  socket: require('debug')('socket_service')
};

export class SocketService {
  private io: SocketIO.Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  public init(server: Server) {
    this.io = socketIo(server);
    this.io.on('connect', (socket: SocketIO.Socket) => this.connectSocket(socket));
  }

  private messages(message: Message, socketID: string) {
    switch (message.action) {
      case Action.JOINED:
        console.log('joined: ' + socketID);
        break;

      default:
        LOG.socket('Unhandled action');
        break;
    }
  }

  public sendUpdate(metric: Metric): boolean {
    const msg: Message = {
      content: JSON.stringify(metric),
      action: Action.NEWMETRIC
    };

    this.io.emit('message', msg);
    return true;
  }

  public connectSocket(socket: SocketIO.Socket) {
    LOG.socket('Connected client on port %s.', this.port);

    socket.on('message', (message: Message) => {
      LOG.socket('[server](message): %s', JSON.stringify(message));
      this.messages(message, socket.id);
    });

    socket.on('error', (err) => {
      LOG.socket(err);
    });
  }

  public closeSession(socketID: string): void {
    const msg: Message = {
      action: Action.LEFT,
      content: ''
    };

    this.io.to(socketID).emit('message', msg);
  }

}
