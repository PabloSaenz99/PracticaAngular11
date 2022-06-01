import { Tutorial } from "./tutorial.model";

export class User {
    _id: string;
    email: string;
    name: string;
    tutorials: Array<Tutorial>;
    
    
    constructor(){
      this._id = '';
      this.email = '';
      this.name = '';
      this.tutorials = [];
    }

    get id(){
      return this._id;
    }
  }  
