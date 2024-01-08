const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        givenName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            set(value) {
                if (value) {
                    const salt = bcrypt.genSaltSync(10)
                    const hash = bcrypt.hashSync(value, salt)
                    this.setDataValue('password', hash)
                }
            },
        },
    })
    User.prototype.compare = function (pass) {
        return bcrypt.compareSync(pass, this.password)
    }

    return User
}
