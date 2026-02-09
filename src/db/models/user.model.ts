import {DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";
import { Plans } from "../../constants.js";

const User = sequelize.define('user',{
    user_name:{
        type:DataTypes.STRING,
        validate:{
           len:{
            args:[3,50],
            msg:'Minimum length for name is 3 characters & Max is 50 chars.'
           }
        }
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    plan:{
        type:DataTypes.ENUM(...Object.values(Plans)),
        defaultValue:Plans.free
    },
    avatar_url:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isActivated:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{paranoid:true})
export default User;