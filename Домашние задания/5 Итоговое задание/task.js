class Weapon{
    constructor(name, attack, durability, range){
        this.name = name;
        this.attack = attack;
        this.durability = durability;
        this.maxDurability = durability;
        this.range = range;
    }

    takeDamage(damage){
        if(this.durability - damage >= 0){
            this.durability = this.durability - damage;
        }else{
            this.durability = 0;
        }
    }

    getDamage(){
        if(this.durability >= this.maxDurability * 0.3){
            return this.attack;
        }else if(this.durability == 0){
            return 0;
        }else{
            return this.attack / 2;
        }
    }

    isBroken(){
        if(this.durability == 0){
            return true;
        }else{
            return false;
        }
    }
}

class Arm extends Weapon{
    constructor(name = 'Рука', attack = 1, durability = Infinity, range = 1){
        super(name, attack, durability, range);
    }
}

class Bow extends Weapon{
    constructor(name = 'Лук', attack = 10, durability = 200, range = 3){
        super(name, attack, durability, range);
    }
}

class Sword extends Weapon{
    constructor(name = 'Меч', attack = 25, durability = 500, range = 1){
        super(name, attack, durability, range);
    }
}

class Knife extends Weapon{
    constructor(name = 'Нож', attack = 5, durability = 300, range = 1){
        super(name, attack, durability, range);
    }
}

class Staff extends Weapon{
    constructor(name = 'Посох', attack = 8, durability = 300, range = 2){
        super(name, attack, durability, range);
    }
}

class LongBow extends Bow{
    constructor(){
        super('Длинный лук', 15, range = 4);
    }
}

class Axe extends Sword{
    constructor(){
        super('Секира', 17, 800);
    }
}

class StormStaff extends Staff{
    constructor(){
        super('Посох бури', 10, range = 3);
    }
}


class Player{
    constructor(position, name){
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
    }

    getLuck(){
        let randomNumber = Math.floor(Math.random() * 101)
        return (randomNumber + this.luck) / 100
    }

    getDamage(distance){
        if(distance > this.weapon.range){
            return 0;
        }

        return (this.attack + this.weapon.getDamage()) * this.getLuck() / distance;
    }

    takeDamage(damage){
        if(this.life - damage < 0){
            this.life = 0;
        }else{
            this.life = this.life - damage;
        }
    }

    isDead(){
        if(this.life == 0){

            console.log(this.name + ' пал...');
            return true;
        }
        
        return false;
    }

    moveLeft(distance){
        if(distance > this.speed){
            distance = this.speed;
        }

        this.position = this.position - distance;
    }

    moveRight(distance){
        if(distance > this.speed){
            distance = this.speed;
        }

        this.position = this.position + distance;
    }

    move(distance){
        if(distance > 0){
            this.moveRight(Math.abs(distance));
        }else{
            this.moveLeft(Math.abs(distance));
        }
    }

    isAttackBlocked(){
        if(this.getLuck() > (100 - this.luck)/100){
            return true;
        }
        return false;
    }

    dodged(){
        if(this.getLuck() > (100 - this.agility - this.speed * 3)/100){
            return true;
        }
        return false;
    }

    takeAttack(damage){
        if(this.isAttackBlocked()){
            console.log(this.name + ' блокирует удар!');
            this.weapon.takeDamage(damage);
        }else if(this.dodged()){
            console.log(this.name + ' увернулся!');
            return;
        }else{
            console.log(this.name + ' был ранен...');
            this.takeDamage(damage);
        }
    }

    checkWeapon(){
        if(this.weapon.isBroken()){
            if(this.weapon.name != 'Нож'){
                this.weapon = new Knife();
            }else{
                this.weapon = new Arm();
            }
        }
    }

    tryAttack(enemy){
        let distance = Math.abs(this.position - enemy.position);
        if(distance == 0){
            distance = 0.8;
        }
        
        if(this.weapon.range < distance){
            console.log(this.name + ' не может ударить ' + enemy.name);
            return;
        }

        this.weapon.takeDamage(this.getLuck() * 10);

        if(this.position - enemy.position == 0){
            enemy.moveRight(1);
            console.log(this.name + ' наносит удар по ' + enemy.name);
            enemy.takeAttack(this.getDamage(distance) * 2);
            return;
        }

        console.log(this.name + ' наносит удар по ' + enemy.name);

        enemy.takeAttack(this.getDamage(distance));
    }

    chooseEnemy(players){
        
        let enemy;

        for(let player of players){
            if (player != this){
                enemy = player;
                break;
            }
        }

        for(let player of players){
            if(player.life < enemy.life & player != this){
                enemy = player;
            }
        }

        return enemy;
    }

    moveToEnemy(enemy){
        let distance = Math.abs(this.position - enemy.position);
        if(enemy.position > this.position){
            if(distance >= this.speed){
                this.moveRight(this.speed);
            }else{
                this.moveRight(distance);
            }
        }else if(enemy.position < this.position){
            if(distance >= this.speed){
                this.moveLeft(this.speed);
            }else{
                this.moveLeft(distance);
            }
        }
    }

    turn(players){
        console.log("Ход " + this.name);
        let enemy = this.chooseEnemy(players);
        console.log(this.name + ' хочет атаковать ' + enemy.name);
        this.moveToEnemy(enemy);
        console.log(this.name + ' движется к ' + enemy.name);
        this.tryAttack(enemy);
    }
}

class Warrior extends Player{
    constructor(position, name){
        super(position, name);
        this.life = 120;
        this.maxLife = 120;
        this.speed = 2;
        this.attack = 10;
        this.description = 'Воин';
        this.weapon = new Sword();
    }

    takeDamage(damage){
        if(this.life < this.maxLife * 0.5 & this.getLuck() > 0.8 & this.magic != 0){
            if(this.magic - damage < 0){
                this.magic = 0;
            }else{
                this.magic = this.magic - damage; 
            }
        }else{
            super.takeDamage(damage);
        }

    }
}

class Archer extends Player{
    constructor(position, name){
        super(position, name);
        this.life = 80;
        this.magic = 35;
        this.attack = 5;
        this.agility = 10;
        this.description = 'Лучник';
        this.weapon = new Bow();
    }

    getDamage(distance){
        return (this.attack + this.weapon.getDamage()) * this.getLuck()
         * distance / this.weapon.range;
    }
}


class Mage extends Player{
    constructor(position, name){
        super(position, name);
        this.life = 70;
        this.magic = 100;
        this.maxMagic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
    }

    takeDamage(damage){
        if(this.magic > this.maxMagic * 0.5){
            damage = damage / 2;
            this.magic = this.magic - 12;
        }

        super.takeDamage(damage);
    }
}


class Dwarf extends Warrior{
    constructor(position, name){
        super(position, name);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.hit = 0;
    }

    takeDamage(damage){
        this.hit++;
        if(this.hit == 6){
            this.hit = 0;
            if(this.getLuck() > 0.5){
                this.damage / 2;
            }
        }

        super.takeDamage(damage);
    }
}

class Crossbowman extends Archer{
    constructor(position, name){
        super(position, name);
        this.life = 85;
        this.attack = 8;
        this.agility = 20;
        this.luck = 15;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
    }
}

class Demiurge extends Mage{
    constructor(position, name){
        super(position, name);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 12;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
    }

    getDamage(distance){
        if(this.magic > 0 & this.getLuck() > 0.6){
            return super.getDamage(distance) * 1.5;
        }

        return super.getDamage(distance);
    }
}


function play(players){
    let idx = 0;
    while(players.length > 1){

        if(idx > players.length - 1){
            idx = 0
        }
        players[idx].turn(players);
        idx++;
        players = players.filter(player => !player.isDead());
    }

    console.log("Победитель: " + players[0].name);
 }

 let archer = new Archer(0, 'Леголас');
 let dwarf = new Dwarf(3, 'Гимли');

 players = [archer, dwarf];

 play(players);


