addLayer("g", {
    name: "Gil", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Gil Points", // Name of prestige currency
    baseResource: "Gold", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 13)) mult = mult.times(upgradeEffect('g', 13))
        if (hasUpgrade('g', 14)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for Gils", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "FF I",
            description: "The begining of the legend!<br><br> Start producing 1 Gold.",
            cost: new Decimal(1),
        },
        12: {
            title: "FF II",
            description: "The legend continues!<br><br> Gain Gold based on Gils.",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"X"}, //add formating to the effect
        },
        13: {
            title: "FF IV",
            description: "Wait...where it's III?<br><br> Gold boost Gil gain.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.5)
            }
        },
        14: {
            title: "FF V",
            description: "Now you have Blue Magic!<br><br> Gain X2 gil.",
            cost: new Decimal(50),
        },
        15: {
            title: "FF VI",
            description: "The GOAT <br><br>Unlock New Layer.",
            cost: new Decimal(100),
        },

    },
    layerShown(){return true}
})
