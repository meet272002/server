import mongoose from "mongoose";
import Questions from '../models/Question.js';

export const postAnswer = async (req,res) => {
    const {id : _id} = req.params; //params = id passed from the domain name
    const {noOfAnswers,answerBody,userAnswered,userId} = req.body;
   
    
    if(!mongoose.Types.ObjectId.isValid(_id))//for validating the id
    {
        return res.status(404).send("question unavalable....");
    }

    updateNoOfQuestions(_id,noOfAnswers);
        // finding record by id and updating it
        try{
            const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet: {'answer':[{answerBody,userAnswered,userId }]}}) 
            
            res.status(200).json(updatedQuestion)
            
        }catch(error){
            res.status(400).json(error);
        }
}

export const deleteAnswer = async(req,res) => {
    const {id:_id} = req.params;
    const {answerId,noOfAnswers} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id))//for validating the id
    {
        return res.status(404).send("question unavalable....");
    }
    if(!mongoose.Types.ObjectId.isValid(answerId))//for validating the id
    {
        return res.status(404).send("answer unavalable....");
    }
    
    updateNoOfQuestions(_id,noOfAnswers);
    try {
        await Questions.updateOne(
            {_id},
            {$pull : {'answer':{_id: answerId}}}
        )
        res.status(200).json({message:'Successfully Deleted...'})
    } catch (error) {
        res.status(405).json(error)
    }
}

const updateNoOfQuestions = async (_id,noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id,{$set: { 'noOfAnswers' : noOfAnswers }})//set will directly replace the value but add to set will update the array
    } catch (error) {
        console.log(error)
    }
}