import jobType from "../models/jobType";

export const createJobType = (req, res) => {
  const name = req.body.name || "";
  jobType
    .create({ name })
    .then((v) => {
      res.status(200).json({
        success: true,
        data: v,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        data: error.message,
      });
    });
//   res.status(200).json({
//               success:false,
//               data:req.body
//           })
};

export const GetJobType =(req,res)=>{
  const name = req.body.name || "";

  jobType
    .find({name:{ $regex:name , $options: 'i' }})
    .then((v) => {
      res.status(200).json({
        success: true,
        data: v,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        data: error.message,
      });
    });



}




// jobType
//   .find({ name: { $regex: `^${name}`, $options: 'i' } }) // Matches starting with input
//   .then((v) => {
//     console.log('Query Results:', v);
//     res.status(200).json({
//       success: true,
//       data: v,
//     });
//   })
//   .catch((error) => {
//     console.error('Query Error:', error);
//     res.status(500).json({
//       success: false,
//       data: error.message,
//     });
//   });
// };