export class Tutorial {
    _id: string;
    creatorUserId: string;
    title: string;
    description: string;
    published: boolean;
    images: Array<string>;

    constructor(){
      this._id = "";
      this.creatorUserId = "";
      this.title = "";
      this.description ="";
      this.published = false;
      this.images = []
    }

    get id(){ return this._id; }
  }  