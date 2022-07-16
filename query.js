//1
// new Date("2020-10-15")
// ISODate("2020-10-15T00:00:00Z")
new Date("2020-10-31")
ISODate("2020-10-31T00:00:00Z")

db.topics.find({
    $and:[{topic_date:{$gte:ISODate("2020-10-15T00:00:00Z"),$lte:ISODate("2020-10-31T00:00:00Z")}},
    {"task.task_date":{$gte:ISODate("2020-10-15T00:00:00Z"),$lte:ISODate("2020-10-31T00:00:00Z")}}]
}).pretty()

//2
db.company_drives.find({
      drive_date:{$gte:ISODate("2020-10-15T00:00:00Z"),$lte:ISODate("2020-10-31T00:00:00Z")}
}).pretty()
//3
db.users.aggregate([{
    $lookup:{
        from:"company_drives",
        localField:"company_drives",
        foreignField: "company_id",
        as: "company_drives"
    }
},{$project:{name:true,_id:false,email:true,"company_drives.company":true}}]).pretty()

//4

db.users.aggregate([
    {
    $lookup:{
        from:"codekata",
        localField:"codekata_problems",
        foreignField: "q_id",
        as: " total_problems"
  }  },{ $project: {name:true,_id:false,"codekata.category":true,total_problems:{$cond:{if:{$isArray:"$codekata_problems"},then:{$size:"$codekata_problems"},else:"0"}}}}
])

//5
db.mentors.update({id:1},{$rename:{"mentee_list":"mentee_count"}})

db.mentors.find({
    mentee_count:{$gte:15}
}).pretty()

//6

//db.users.find($or :[{absent_on:{$exists:true,$ne:[]}},{ "submitted_task.submitted_date":1}])

//db.users.find({"submitted_task.submitted_date":{$gte:ISODate("2020-10-15T00:00:00Z"),$lte:ISODate("2020-10-31T00:00:00Z")}}).pretty()

db.users.find( { $or: [ { absent_on: { $exists: true, $ne: [] }}, { submitted_task: { $exists: true, $ne: [] }} ] } ).count() 



