class Weapon  {
    constructor(symbol, name, dmgBoost, defenseBoost, critBoost, price, description, buyable, effect) {
        this.symbol = symbol;
        this.name = name;
        this.dmgBoost = dmgBoost;
        this.defenseBoost = defenseBoost;
        this.critBoost = critBoost;
        this.price = price;
        this.description = description;
        this.buyable = buyable;
        this.effect = effect;
    }
}

module.exports.Weapon = Weapon;