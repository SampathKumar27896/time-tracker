const paginator = async(model, conditions, selectFields, pagination) => {
        try {
                const count = await model.countDocuments(conditions);
                pagination.skip = (pagination.page * pagination.limit);
                const result = await model.find(conditions,selectFields,pagination).exec();
                return {data: result, limit: pagination.limit, page: pagination.page, count: count};
        } catch(error) {
                console.error(error);
                throw error;
        }
}
module.exports = {
        paginator
}