const Discord = require('discord.js');
const { Weapon } = require('../classes/weapon.js');

//----------------------------------------------------------
const FistEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const fists = new Weapon(":punch:", "Fists", 0, 0, 0, 0, "Just your hands", false, FistEffect)
//----------------------------------------------------------
const BrokenBeanSwordEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const BrokenBeanSword = new Weapon(":crossed_swords:", "Broken Bean Sword", 3, 1, 0.5, 20, "A gift from your dad for your 11th birthday", false, BrokenBeanSwordEffect)
//----------------------------------------------------------
const ShieldEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const Shield = new Weapon(":shield:", "Shield", 2, 10, 3, 500, "Great for the defense", true, ShieldEffect)
//----------------------------------------------------------
const SwordOfTheLegendBeanHunterEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const SwordOfTheLegendBeanHunter = new Weapon(":trophy:", "Sword Of The Legend Bean Hunter", 500, 100, 50, 100000, "The almighty sword made by Dinosaur bones with gold dust and a drop of bean", false, SwordOfTheLegendBeanHunterEffect)
//----------------------------------------------------------
const BeanCutterEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const BeanCutter = new Weapon(":knife:", "Bean Cutter", 15, 5, 7, 2000, "A normal bean cutter", true, BeanCutterEffect)
//----------------------------------------------------------
const BeantransmogrifierRffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const Beantransmogrifier = new Weapon("none", "Bean transmogrifier", 100, 40, 50, 25000, "A bean ray that slowly turns the opponents body into beans overtime hence making the hurting the opponent overtime", true, BeantransmogrifierRffect)
//----------------------------------------------------------
const yoyoEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 
const yoyo = new Weapon(":yo_yo:", "yoyo", 8, 2, 5, 800, "Who doesn't like a good yoyo trick", true, yoyoEffect)
//----------------------------------------------------------
const SharpenedBeanCutterEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 
const SharpenedBeanCutter = new Weapon("none", "Sharpened Bean Cutter", 45, 10, 12, 5000, "An Upgrade For Bean Cutter", true, SharpenedBeanCutterEffect)
//----------------------------------------------------------
const BluntSwordEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

} 

const BluntSword = new Weapon("none", "Blunt Sword", 7, 2, 4, 500, "A Blunt Sword", true, BluntSwordEffect)
//----------------------------------------------------------
const WaterBalloonEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    let arrayIndex = -1;
    let realIndex = -1
    foundUser.inventory.forEach(item => {
        arrayIndex += 1
        if(item.name == "Water Balloon") {
            realIndex = arrayIndex
        }
    })
    let arrayIndex2 = -1
    let realIndex2 = -1
    foundUser.inventory.forEach(item => {
        arrayIndex2 += 1;
        if(item.name == "Fists") {
            realIndex2 = arrayIndex2
        }
    })
    foundUser.inventory.splice(realIndex, 1)
    let foundFists = foundUser.inventory.find(weapon => weapon.name == "Fists")
    if(foundUser.equipped.name == "Water Balloon") {
        foundUser.equipped = foundFists
    }
    if(foundUser.equipped2.name == "Water Balloon") {
        foundUser.equipped2 = foundFists
    }
    foundUser.inventory.splice(realIndex2, 1)
    foundUser.save()
}

const WaterBalloon = new Weapon(":balloon:", "Water Balloon", 2, -2, 1, 1, "Stop it hurts!", true, WaterBalloonEffect)
//----------------------------------------------------------
const TheSwordoftheSaintLikeBeanGodsEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const TheSwordoftheSaintLikeBeanGods = new Weapon(":angel:", "The Sword of the Saint Like Bean Gods", 400, 400, 100, 0, "Only those who are superior to others, consider themselves saint like, can hold this sword. Others will burn if come in direct contact", false,TheSwordoftheSaintLikeBeanGodsEffect)
//----------------------------------------------------------
const NormalSwordEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const NormalSword = new Weapon(":crossed_swords:", "Normal Sword", 5, 5, 1, 1000, "A Normal Sword", true, NormalSwordEffect)
//----------------------------------------------------------
const SharpenedSwordEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const SharpenedSword = new Weapon("none", "Sharpened Sword", 60, 15, 15, 10000, "A Sharp Sword That Can Kill Animals With One Hit", true, SharpenedSwordEffect)
//----------------------------------------------------------
const BeanRailGunEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const BeanRailGun = new Weapon("none", "Bean Rail Gun", 40, 5, 50, 0, "This rail gun was created by one of the many bean gods. This weapon can be found in one of the many chests found around the BEANIVERSE.", false, BeanRailGunEffect)
//----------------------------------------------------------
const MetalShieldEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const MetalShield = new Weapon(":shield:", "Metal Shield", 5, 30, 5, 2000, "Shield That Gives You A Good Amount Of Defense And Decrease The Enemy Damage By 5%", true, MetalShieldEffect)
//----------------------------------------------------------
const WoodenSpearEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const WoodenSpear = new Weapon(":wood:", "Wooden Spear", 10, 1, 20, 1000, "A Normal Spear With Insane Crit Damage", true,WoodenSpearEffect)
//----------------------------------------------------------
const BeanShooterEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const BeanShooter = new Weapon(":gun:", "Bean Shooter", 15, 5, 20, 3000, "Basic unupgradable shooter. Take a deep breath and fire away. Pelts enemies with beans", true, BeanShooterEffect)
//----------------------------------------------------------
const BeanPasterEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const BeanPaster = new Weapon("none", "Bean Paster", 20, 7, 25, 4000, "Splatter your opponents with bean paste. Damages your opponent and splatters them in place with bean paste (lose a turn)", true, BeanPasterEffect)
//----------------------------------------------------------
const IronShieldEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const IronShield = new Weapon(":shield:", "Iron Shield", 10, 70, 2, 7000, "Its The Same Like Metal Shield But With A Small Damage Boost And Defense", true,IronShieldEffect)
//----------------------------------------------------------
const LaserBeansEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const LaserBeans = new Weapon("none", "Laser Beans", 100, 40, 150, 30000, "Blast your foes with a laser of beans! This blaster shoots out laser beams, you guessed it, made of beans. These are no ordinary beans as they laser and slice your opponent to pieces.", true, LaserBeansEffect)
//----------------------------------------------------------
const BeanOFrierEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const BeanOFrier = new Weapon("none", "BeanOFrier", 30, 4, 13, 4200, "mmmmmm Fried beans", true, BeanOFrierEffect)
//----------------------------------------------------------
const KnightArmorEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const KnightArmor = new Weapon("none", "Knight Armor", 0, 100, 0, 30000, "The Armor Used By The Fallen Bean Knights From The Last Centuries Long", true, KnightArmorEffect)
//----------------------------------------------------------
const WoodenBowEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const WoodenBow = new Weapon(":bow_and_arrow:", "Wooden Bow", 20, 0, 10, 1000, "A Bow Made By mr bean", true, WoodenBowEffect)
//----------------------------------------------------------
const EnchantedBowEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const EnchantedBow = new Weapon(":bow_and_arrow:", "Enchanted Bow", 70, 20, 100, 60000, "This bow was enchanted by the BEAN GODS. It's purpose was to shred to traiter bean army using it's insane ctitical chance bonus.", true, EnchantedBowEffect)
//----------------------------------------------------------
const GodlyBowEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 
const GodlyBow = new Weapon(":bow_and_arrow:", "Godly Bow", 150, 50, 200, 100000, "This bow was designed by Bapollo, the Bean god of Bows. Within, it contains 4 strands of magical unicorn hair, 1 talon of the defeated Bean dragon - The fear of the peaks dragon, 1 plank of enchanted elivsh wood. All of this combined creates one of the most deadly bows in the beaniverse.", true, GodlyBowEffect)
//----------------------------------------------------------
const OriginalBeanBowOfTheEldersEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    
} 

const OriginalBeanBowOfTheElders = new Weapon(":bow_and_arrow:", "Original Bean Bow Of The GOD Elders", 500, 400, 800, 1000000, "This bow was the first bow to EVER be created. Created on the night when the 64 worlds of the beaniverse alligned, forged under the great lava of the deep, equipped with the most powerful magic known to EVERY SINGLE BEING. This bow is the ULITMATE WEAPON. This bow can only be obtained by defeating either of the creators at their highest point. OCEANHI & MR DRIP", false, OriginalBeanBowOfTheEldersEffect)
//----------------------------------------------------------
const DeathtouchEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    otherUser.health = 0;
    recievedMessage.channel.send(`Woah, that's a POWERFUL weapon! You one-shot killed your opponent with this epic Deathtouch sword.`)
}

const SwordOfDeathtouch = new Weapon(":crossed_swords: :skull:", "Deathtouch Sword", 1000, 300, 1000, 100000000, "This sword is the definition of death. It's blade is enchanted with DEATHTOUCH. If you wield this blade, then no matter whom you attack, they will die instantly, even if they have 1000 health and you do 1 damage. This sword is only obtainable by completeing the WHOLE story, and defeating the VERY, last, boss.", false, DeathtouchEffect)
//----------------------------------------------------------
// const OneThousandBeanKnivesEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
//     let randomKnives = Math.floor((Math.random() * 1000) + 1)
//     damageDealt += randomKnives
//     let Fists = foundUser.inventory.find(thing => thing.name == "Fists")
//     if(foundUser.equipped.name == "One Thousand Bean Knives") {
//         foundUser.inventory.push(foundUser.equipped)
//         let arrayIndex = -1
//         let realIndex = -1
//         foundUser.inventory.forEach(thing => {
//             arrayIndex += 1
//             if(thing.name == "Fists") {
//                 realIndex = arrayIndex
//             }
//         })
//         foundUser.inventory.splice(realIndex, 1)
        
//         foundUser.damage -= foundUser.equipped.dmgBoost;
//         foundUser.defense -= foundUser.equipped.defenseBoost;
//         foundUser.critical -= foundUser.equipped.critBoost;
//         foundUser.damage += Fists.dmgBoost;
//         foundUser.defense += Fists.defenseBoost;
//         foundUser.critical += Fists.critBoost;
//         if(foundUser.critical > 1000) {
//             foundUser.critical = 1000
//         }
//         foundUser.equipped = Fists
//     }
//     if(foundUser.equipped2.name == "One Thousand Bean Knives") {
//         foundUser.inventory.push(foundUser.equipped2)
//         let arrayIndex = -1
//         let realIndex = -1
//         foundUser.inventory.forEach(thing => {
//             arrayIndex += 1
//             if(thing.name == "Fists") {
//                 realIndex = arrayIndex
//             }
//         })
//         foundUser.inventory.splice(realIndex, 1)
        
//         foundUser.damage -= foundUser.equipped2.dmgBoost;
//         foundUser.defense -= foundUser.equipped2.defenseBoost;
//         foundUser.critical -= foundUser.equipped2.critBoost;
//         foundUser.damage += Fists.dmgBoost;
//         foundUser.defense += Fists.defenseBoost;
//         foundUser.critical += Fists.critBoost;
//         if(foundUser.critical > 1000) {
//             foundUser.critical = 1000
//         }
//         foundUser.equipped = Fists
//     }
// }

// const OneThousandBeanKnives = new Weapon(":dagger:", "One Thousand Bean Knives", 0, 0, 400, 250000, "This magical knife will dupilcate to the point where once you throw it, 1-1000 knives will instantly appear next to it, flying towards your opponent.", true, OneThousandBeanKnivesEffect)
//----------------------------------------------------------
const SwordOfTheWarBeanGodEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

}

const SwordOfTheWarBeanGod = new Weapon(":crossed_swords:", "Sword Of The War Bean God", 1000, 800, 1000, 5000000, "This sword once belonged to the bean god of war", false, SwordOfTheWarBeanGodEffect)
//----------------------------------------------------------
const DaggerEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

}

const Dagger = new Weapon(":knife:", "Dagger", 25, 5, 15, 1235, "Just a normal Dagger", true, DaggerEffect)
//----------------------------------------------------------
const DeadlyDaggerEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

}

const DeadlyDagger = new Weapon(":skull: :knife:", "Deadly Dagger", 200, 10, 175, 97835, "A dagger worthy of might bean assassins, capable of mighty warriors and monsters.", true, DeadlyDaggerEffect)
//----------------------------------------------------------
const MaceEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

}

const Mace = new Weapon("none", "Mace", 60, 10, 70, 12748, "A decent quality mace, A lot of Orges carry these.", true, MaceEffect)
//----------------------------------------------------------
const DragonScaleArmorEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {
    damageDealt /= 2
    recievedMessage.channel.send(`These scales are embedded with temporariry magic that has DECREASED the damage dealt to you in this strike by **50%**`)
}

const DragonScaleArmor = new Weapon(":dragon:", "Dragon Scale Armor", 0, 250, 0, 597485, "This armor is INSANELY rare, it is easier to aquire while defeating a dragon than to find it for sale.", true, DragonScaleArmorEffect)
//----------------------------------------------------------

const SteelMaceEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

}

const steelMace = new Weapon(":tools:", "Steel Mace", 79, 10, 80, 16493, "This mace is made of hardened steel in the deep dungeons of the bean dwarves, this is not a weapon that is easy to come by.", true, SteelMaceEffect)
//----------------------------------------------------------
const MightyMaceEffect = async function(recievedMessage, args, foundUser, otherUser, damageDealt) {

}

const MightyMace = new Weapon(":tools:", "Mighty Mace", 130, 30, 129, 24578, "Made for the dwarven sons themselves, forged in the lava of the hottest Volcanos, the power of the ancient gods embedded in it's fibers.", true, MightyMaceEffect)
//----------------------------------------------------------
let weaponsArray = [fists, BrokenBeanSword, Shield, steelMace, Dagger, Mace, MightyMace, DeadlyDagger, DragonScaleArmor, SwordOfTheLegendBeanHunter, SwordOfTheWarBeanGod, BeanCutter, Beantransmogrifier, yoyo, SharpenedBeanCutter, BluntSword, WaterBalloon, TheSwordoftheSaintLikeBeanGods, NormalSword, SharpenedSword, BeanRailGun, MetalShield, WoodenSpear, BeanShooter, BeanPaster, IronShield, LaserBeans, BeanOFrier, KnightArmor, WoodenBow, EnchantedBow, GodlyBow, OriginalBeanBowOfTheElders, SwordOfDeathtouch]

module.exports.weaponsArray = weaponsArray