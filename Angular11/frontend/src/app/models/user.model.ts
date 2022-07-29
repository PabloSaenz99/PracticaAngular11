import { Tutorial } from "./tutorial.model";

export class User {
    _id: string;
    email: string;
    name: string;
    nickName: string;
    password: string;
    birthday: Date;
    tutorials: Array<Tutorial>;
    
    
    constructor(){
      this._id = '';
      this.email = '';
      this.name = '';
      this.nickName = '';
      this.password = '';
      this.birthday = new Date();
      this.tutorials = [];
    }

    get id(){
      return this._id;
    }
  }  
