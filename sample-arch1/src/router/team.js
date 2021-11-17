import express from "express";
import teamService from "../application-service/teamService";

const router = express.Router();

router.get("/teams", async (req, res) => {
  const teams = await teamService.fetchAllUsers();

  res.json({ teams: teams.map((team) => team.toJson()) });
});

router.get("/team/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  const { team, user } = await teamService.fetchOneUser(teamId);

  res.json({ team: team.toJson(), user: user.toJson() });
});

router.get("/transaction-sample", async (req, res) => {
  const data = await teamService.transactionSample();
  res.json({ ...data });
});

export default router;
