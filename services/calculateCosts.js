const costs = require("./../data/costs");

const calculateCosts = (currentLevel = 0, targetLevel = 0) => {
    const currentAccumulatedLevel = `${Number(currentLevel - 0.5)}`;
    const currentTargetLevel = `${Number(targetLevel - 0.5)}`;

    const currentLevelCost = costs.find((cost) => cost.level === currentAccumulatedLevel);
    const targetLevelCost = costs.find((cost) => cost.level === currentTargetLevel);

    return {
        candy: Number(targetLevelCost.candy - currentLevelCost.candy),
        stardust: Number(targetLevelCost.startdust - currentLevelCost.startdust),
    };
};

console.log(calculateCosts("15", "33.5"));
