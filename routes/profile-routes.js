const router=require('express').Router();
const authCheck=(req,res,next) => {
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
};
router.get('/',authCheck(),(req,res) => {
    const info=req.user.username;
    res.render('profile',{
        info:info
    });
});
module.exports=router;