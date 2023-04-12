const executeQuery = async (queryFunc, data) => {
    try {
        const result = await queryFunc(data);
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error('Query execution failed');
    }
};

const getById = async (model, id) => {
    const queryFunc = async (id) => {
        const instance = await model.findByPk(id);
        if (!instance) {
            throw new Error(`${model.name} not found`);
        }
        return instance;
    };

    const result = await executeQuery(queryFunc, id);
    return result;
};

const updateById = async (model, id, data) => {
    const queryFunc = async (id, data) => {
        const result = await model.update(data, {
            where: { id },
        });
        if (result[0] === 0) {
            throw new Error(`${model.name} not found`);
        }
        return `${model.name} updated successfully`;
    };

    const result = await executeQuery(queryFunc, [id, data]);
    return result;
};

const deleteById = async (model, id) => {
    const queryFunc = async (id) => {
        const result = await model.destroy({
            where: { id },
        });
        if (result === 0) {
            throw new Error(`${model.name} not found`);
        }
        return `${model.name} deleted successfully`;
    };

    const result = await executeQuery(queryFunc, id);
    return result;
};

const getAll = async (model) => {
    const instances = await model.findAll();
    return instances;
};

const getOne = async (model, where) => {
    try {
        const result = await model.findOne({ where });
        return result;
    } catch (error) {
        throw error;
    }
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
    getById,
    updateById,
    deleteById,
    getAll,
    getOne,
    create
};
