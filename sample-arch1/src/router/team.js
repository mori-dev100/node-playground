import express from "express";
import teamService from "../application-service/teamService";

const router = express.Router();

router.get("/teams", async (req, res) => {
  const teams = await teamService.fetchAllUsers();

  res.json({ teams: teams.map((team) => team.toJson()) });
});

router.get("/team/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  const team = await teamService.fetchOneUser(teamId);

  res.json({ team: team.toJson() });
});

router.get('/test',async (req,res)=>{
  await teamService.tx()
  res.json({})
})

// router.get("/team/transaction", async (req, res) => {
//   await teamService.transactionSample();

//   res.json({ ok: "ok" });
// });

export default router;
