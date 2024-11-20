import skill_model from "../models/Skills"

export const createSkill = (req, res) => {
  const name = req.body.name || "";
  skill_model
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
