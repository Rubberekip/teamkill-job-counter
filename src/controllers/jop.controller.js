const db = require("../database");
const Jop = db.jop

exports.initJop = async () => {
    await Jop.sync();
    const jop = await Jop.findByPk(1);
    if(!jop){
        await Jop.create({ id: 1, count: 0 });
    }
};

exports.getCount = async() => {
    const jop = await Jop.findByPk(1);
    return jop ? jop.count : -1;
}

exports.setCount = async (count) => {
    const jop = await Jop.findByPk(1);
    if(jop){
        console.log(`Set Count operation: old: ${jop.count}, new: ${count}`);
        jop.count = count;
        await jop.save();
    }
};

exports.resetCount = async () => {
    await exports.setCount(0);
}

