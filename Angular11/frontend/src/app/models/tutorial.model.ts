export class Tutorial {
    _id: string;
    title: string;
    description: string;
    published: boolean;

    constructor(){
      this._id = "";
      this.title = "";
      this.description ="";
      this.published = false;
    }

    get id(){ return this._id; }
  }  