export class Book {
    id:number;
    title:string="";
    description:string="";
    author:string="";
    price:number = 0.0;
    imageUrl:string[]= [];
    releaseDate:Date=new Date();

    constructor(id:number=0, title:string="",price:number=0.0 ) {
        this.id =id;
        this.title=title;
        this.price=price;
    }
}