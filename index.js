const express = require("express")
const router = express.Router();


const { JWT_SECRET } = require("../config");
const z = require("zod");
const { User, userDetails , userFinance} = require("../database/userDb");
const { Client } = require("../database/userDb");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/middleware");
////////////////////////////////
const signupBody = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
    })

router.post("/user/signup", async (req, res)=>{
    const { success } = signupBody.safeParse(req.body);
    if(!success){
            return req.status(411).json({message: "invalid inputs"});
    }
    const existingUser = await User.findOne({
    email : req.body.email
    })
    if(existingUser){
        return res.status(411).json({
            message : "Email already exist"
        })
    }
    const user = await User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET );
    res.status(200).json({
        message : "user created successfully",
        token : token
    })
})
/////////////////////////////////////////////////////
router.post("/client/signup", async (req, res, next)=>{
    const { success } = signupBody.safeParse(req.body);
    if(!success){
            return req.status(411).json({message: "invalid inputs"});
    }
    const existingUser = await Client.findOne({
    email : req.body.email
    })
    if(existingUser){
        return res.status(411).json({
            message : "Email already exist"
        })
    }
    const user = await Client.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.email,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET);
    res.status(200).json({
        message : "user created successfully",
        token : token
    })
})

const signinbody = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

router.post("/user/signin", async (req, res)=>{
    const { success } = signinbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "invalid inputs"
        })
    }
    const user = await User.findOne({
        email : req.body.email,
        password : req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)
        return res.status(200).json({
            message: "user signed in",
            token : token
        })
    } return res.status(411).json({
        message : "error while log in"
    })
})
router.post("/client/signin", async (req, res)=>{
    const { success } = signinbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "invalid inputs"
        })
    }
    const user = await Client.findOne({
        email : req.body.email,
        password : req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)
        return res.status(200).json({
            message: "user signed in",
            token : token
        })
    } return res.status(411).json({
        message : "error while log in"
    })
})

const userDetailsbody = z.object({
    name : z.string(),
    email : z.string().email(),
    designation : z.string(),
    summary : z.string(),
    charge : z.string(),
    projects : z.string()
})

router.post("/user/userprofile" , authMiddleware , async (req, res)=>{
    const { success } = userDetailsbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "invalid inputs" 
        })
    }
    const userId = req.userId;
    const userProfile = await userDetails.create({
        userId : userId,
        name : req.body.name,
        email : req.body.email,
        designation : req.body.designation,
        summary:req.body.summary,
        charge: req.body.charge,
        projects : req.body.charge
        
    })
    res.status(200).json({message: "finnnnnneeeeeee"})
})

router.get("/user/userprofile",authMiddleware, async(req, res, next)=>{
    const response = await userDetails.findOne({ userId : req.userId})
    if(response){
        return res.status(200).json(response)
    }
})

const userFinanceBody = z.object({
    name : z.string(),
    email : z.string().email(),
    phoneNumber : z.string(),
    why : z.string(),
    employment : z.string(),
    income : z.string(),
    expense : z.string(),
    other : z.string(),
    goals : z.string()
})


router.post("/user/finance", authMiddleware, async (req, res)=>{
    const { success } = userFinanceBody.safeParse({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        why: req.body.why,
        employment: req.body.employment,
        income: req.body.income,
        expense: req.body.expense,
        other: req.body.other,
        goals: req.body.goals
    })
    if(!success){
        return res.status(411).json({
            message : "invalid zod input"
        })
    }
    const userId = req.UserId;
    const user = await userFinance.create({
        userId: userId,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        why: req.body.why,
        employment: req.body.employment,
        income: req.body.income,
        expense: req.body.expense,
        other: req.body.other,
        goals: req.body.goals
    })
    if(user){
        return res.status(200).json({
            message : "fineeeeeeeeeee"})
    }else{
        return res.status(411).json({
            message : "error occured"
        })
    }
})

module.exports = router;