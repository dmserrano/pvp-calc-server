const costs = require("./../data/costs");

const calculateCosts = (currentLevel = "1.5", targetLevel = "40") => {
    const currentAccumulatedLevel = `${Number(currentLevel - 0.5)}`;
    const currentTargetLevel = `${Number(targetLevel - 0.5)}`;

    const currentLevelCost = costs.find((cost) => cost.level === currentAccumulatedLevel);
    const targetLevelCost = costs.find((cost) => cost.level === currentTargetLevel);

    return {
        candy: Number(targetLevelCost.candy - currentLevelCost.candy),
        stardust: Number(targetLevelCost.startdust - currentLevelCost.startdust),
    };
};

module.exports = {
    calculateCosts,
};
