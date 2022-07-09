let CompressorSchema = require('../model/compressor.model');

const paginatedResults = async (req, res, next) => {
    try {
        const compressors = await CompressorSchema.find();
        // middleware function
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        // calculating the starting and ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        if (endIndex < compressors.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }
        results.results = compressors.slice(startIndex, endIndex);
        res.paginatedResults = results.results;
        next();
    } catch (error) {
        res.status(400).send(err);
    }

}

module.exports = paginatedResults;