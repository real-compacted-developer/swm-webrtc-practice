class Room {
  constructor() {
    this.rooms = new Map();
  }

  getRoomObject() {
    const roomObject = {
      number: "",
      users: new Map(),
    };
    return roomObject;
  }

  findRoom(roomNumber) {
    return this.rooms.has(`${roomNumber}`);
  }

  addRoom(roomNumber) {
    const roomObject = this.getRoomObject();
    roomObject.number = `${roomNumber}`;

    this.rooms.set(`${roomNumber}`, roomObject);

    return true;
  }

  deleteRoom(roomNumber) {
    return this.rooms.delete(`${roomNumber}`);
  }

  addUser(roomNumber, User) {
    const roomTarget = this.rooms.get(`${roomNumber}`);

    if (roomTarget === undefined) return false;
    // check duplicate
    if (roomTarget.users.has(`${User.id}`)) {
      return false;
    }
    roomTarget.users.set(`${User.id}`, User);

    return true;
  }

  removeUser(roomNumber, User) {
    const roomTarget = this.rooms.get(`${roomNumber}`);
    if (roomTarget === undefined) return false;

    return roomTarget.users.delete(`${User.id}`);
  }

  /**
   * 현재 방의 User 객채의 목록을 받아옴
   * @param {string} roomNumber
   * @returns Array<User>
   */
  getUserList(roomNumber) {
    const roomTarget = this.rooms.get(`${roomNumber}`);
    if (roomTarget === undefined) return [];

    const userList = Array.from(roomTarget.users.values());

    return userList;
  }

  /**
   * 방에 있는 유저 객체를 찾아서 return 해줌
   * @param {string} roomNumber
   * @param {string} userId
   * @returns user
   */
  getUser(roomNumber, userId) {
    const roomTarget = this.rooms.get(`${roomNumber}`);
    if (roomTarget === undefined) return false;

    const user = roomTarget.users.get(`${userId}`);

    return user;
  }

  /**
   * 모든 방에서 유저 정보를 찾아옴
   * @param {string} userId
   */
  findUser(userId) {
    const returnObject = {
      room: undefined,
      user: undefined,
    };

    this.rooms.forEach((room) => {
      const user = room.users.get(`${userId}`);
      if (user) {
        returnObject.room = room;
        returnObject.user = user;
      }
    });

    return returnObject;
  }

  getUserNameList(roomNumber) {
    const userList = this.getUserList(`${roomNumber}`);
    const userNameList = userList.map((user) => user.name);

    return userNameList;
  }
}

module.exports = Room;
