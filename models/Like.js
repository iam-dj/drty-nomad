const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class StampLike extends Model {}

StampLike.init(
    {
        /** xref table, both FKs will auto generate from index.js **/
    },
    {
        sequelize,
    }
);

module.exports = StampLike;
