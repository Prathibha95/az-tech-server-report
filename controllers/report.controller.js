const mongoose = require('mongoose');
const Report = mongoose.model('Report');

module.exports.addReport=function(req,res,next){

    var r = new Report();

    r.from=req.params.fId;
    r.to=req.params.tId;
    r.idea=req.params.iId;
    r.username=req.body.username;
    r.ideaname=req.body.ideaname;


    r.save(function(err,doc){
        if(!err){
            
            res.send({success:true});
        }
        else{
            return next(err);
        }
    });

};

//view requests
module.exports.reportView=function(req,res,next){
    const userId=req.params.uId;

    Report.find({to:userId})
        .then(result=>{
            if(result){
                res.json(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//set status
module.exports.status=function(req,res,next){
    const userId=req.params.uId;
    const reportId=req.params.rId;

    Report.updateOne({ to:userId, _id:reportId }, {
        $set:{
            status:req.body.status
            }
        })
        .then(result=>{
            if(result){
                res.send({success:true});
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//invested ideas of investor
module.exports.reportIdeas=function(req,res,next){
    const userId=req.params.uId;
    //const status=req.body.status;

    Report.find({ from:userId, status:'accepted' })
        .populate('idea')
        .select('idea')
        .then(result=>{
            if(result){
                res.json(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};

//check requested or not
module.exports.reportstatus=function(req,res,next){
    const userId=req.params.uId;
    const ideaId=req.params.iId;

    Request.find({from:userId, idea:ideaId})
        .then(result=>{
            if(result){
                res.send(result);
            }
        })
        .catch(error => {
            res.json({error: error});
            console.log(error);
        });
};


