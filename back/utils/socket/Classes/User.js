class User {
  /**
   * User객체의 생성자
   * @param {string} id key로 쓰일 유일한 값
   * @param {string} name 방에서 표시될 이름
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = User;
