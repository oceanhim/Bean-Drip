class Item {
    constructor(symbol, name, price, description, use, buyable) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.description = description;
        this.use = use;
        this.buyable = buyable;
    }
}

module.exports.Item = Item