const Joi= require('joi');
const mongoose =require('mongoose'); 

const teamSchema= new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    points:{
        type: Number
    }
});

const Team= mongoose.model('teams',teamSchema);

function validateTeam(team){    
        const schema= {
        teamName: Joi.string().required(),
        points: Joi.string()
    };
    return Joi.validate(team, schema);
}

module.exports.Team= Team;
module.exports.validateTeam= validateTeam;