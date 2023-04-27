const getAll = async (model) => {
    const instances = await model.findAll();
    return instances;
};

const create = async (model, data) => {
    try {
        const createdInstance = await model.create(data);
        return createdInstance;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create instance");
    }
};

module.exports = {
    getAll,
    create
};
