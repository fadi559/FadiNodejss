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
