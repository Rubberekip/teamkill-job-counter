const { getCount, setCount } = require('../controllers/jop.controller');

module.exports = {
    increaseCount: async function (){
        let count = await getCount();
        if(count == -1){
            console.error("COUNT IS NOT FOUND IN DATABASE");
            return 1;
        }
        count = count + 1;

        await setCount(count);
    }
}