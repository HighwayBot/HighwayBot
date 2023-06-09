const config = require(`./../../../config/${require('./../../../settings.json').config}`);
    module.exports = async (bot) => {
    function quit(reason) {
        bot.quit(reason);
    }
    if (config.module.player.utility.safety.toggle === false) return;

    async function equipTotem() {
        let totem_count = 0;
        let botInvSlots = bot.inventory.slots;
        if (!botInvSlots || botInvSlots.length === 0) return;
        for (let i = 0; i < botInvSlots.length; i++) {
            if (!botInvSlots[i]) continue;
            if (botInvSlots[i].name !== `totem_of_undying`) continue;
            totem_count = i;
        }
        try {
            //risky, but it works
            await bot.equip(botInvSlots[totem_count], 'off-hand');
        } catch {
        }
    }

    bot.on('health', () => {
        if (bot.health < 10) return quit('low health');
        let hasTotem = bot.inventory.slots.filter(item => item?.name === 'totem_of_undying').length > 0;
        let availableOffhand = bot.inventory.slots[45]?.name === 'totem_of_undying';
        let offhandTotem = bot.inventory.slots.filter(i => i && i.slot === 45 && i.name === 'totem_of_undying').length > 0;

        if (!offhandTotem && !availableOffhand) try {
            bot.unequip('off-hand');
        } catch {
        }
        if (!offhandTotem && hasTotem) return equipTotem();
        if (offhandTotem) return equipTotem();

        function collect(player, entity) {
            let itemId = entity.metadata[entity.metadata.length - 1].blockId;
            if (itemId === 449) return equipTotem();
        }

        bot.on('playerCollect', collect);
    });

    function checkCrystal() {
        bot.nearestEntity((entity) => {
            if (entity.name === 'ender_crystal') quit('crystal');
        });
    }

    // No more crystal
    bot.on('spawn', () => checkCrystal());
    bot.on('move', () => checkCrystal());

};