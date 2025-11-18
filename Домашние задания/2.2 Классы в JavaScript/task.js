class PrintEditionItem {

    constructor(name, releaseDate, pagesCount){
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null;
    }

    get state(){
        return this._state
    }

    set state(newValue){
        if (newValue < 0){
            this._state = 0;
        }else if (newValue > 100){
            this._state = 100;
        }else{
            this._state = newValue;
        }
    }


    fix(){
        if (this.state > 0){
            this.state *= 1.5;
        }
    }

}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount){
        super(name, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount){
        super(name, releaseDate, pagesCount);
        this.type = 'book';
        this.author = author;
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount){
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount){
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount){
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

class Library {
    constructor(name){
        this.name = name;
        this.books = [];
    }

    addBook(book){
        if(book instanceof PrintEditionItem){
            if(book.state > 30){
                this.books.push(book)
            }
        }
    }

    findBookBy(type, value){
        switch(type){
            case 'name':
                for (const book of this.books){
                    if (book.name == value){
                        return book
                    }
                }
                return null
                break;
            case 'author':
                for (const book of this.books){
                    if (book.author == value){
                        return book
                    }
                }
                return null
                break;
            case 'pagesCount':
                for (const book of this.books){
                    if (book.pagesCount == value){
                        return book
                    }
                }
                return null
                break;
            case 'releaseDate':
                for (const book of this.books){
                    if (book.releaseDate == value){
                        return book
                    }
                }
                return null
                break;

        }
    }

    giveBookByName(bookName){

        for(let i = 0; i < this.books.length; i++){
            if(this.books[i].name == bookName){
                const foundBook = this.books[i];
                this.books.splice(i, 1);
                return foundBook
            }
        }
        return null
    }
}