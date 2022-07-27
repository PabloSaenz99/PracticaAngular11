export class Tutorial {
    _id: string;
    title: string;
    description: string;
    published: boolean;
    images: Array<string>;

    constructor(){
      this._id = "";
      this.title = "";
      this.description ="";
      this.published = false;
      this.images = []
    }

    get id(){ return this._id; }
  }  